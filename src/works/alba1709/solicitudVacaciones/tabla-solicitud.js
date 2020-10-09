import { LitElement, html } from 'lit-element';
import { getDate } from './utils/functions';
import { viewStyles } from './utils/t-styles';

export class TablaSolicitud extends LitElement {
  static get styles() {
    return [
      viewStyles
    ];
  }

  static get properties() {
    return {
      miTabla: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.miTabla = [];
    this.nElements = 3;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  async firstUpdated() {
    const nPages = Math.ceil(this.miTabla.length / this.nElements);
    this.stepper = new Array(nPages).fill({});
    this.to = this.nElements;
    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach(row => {
      if (row.id === `_${index}`) {
        row.classList.add('active');
      } else {
        row.classList.remove('active');
      }
    });
  }

  showPage(index) {
    this.index = index;
    this.from = this.nElements * index;
    this.to = this.from + this.nElements;
    this.setActiveStep(index);
  }

  next() {
    if (this.index < this.stepper.length - 1) {
      this.showPage(this.index + 1);
    }
  }

  prev() {
    if (this.index > 0) {
      this.showPage(this.index - 1);
    }
  }

  deleteItem(i) {
    const event = new CustomEvent('delete-event', {
      detail: {
        index: i
      }
    });
    this.dispatchEvent(event);
  }

  orderDate(col, order) {
    const orderedList = this.miTabla.sort((a, b) => {
      if (
        getDate(a[col], true).getTime() >
        getDate(b[col], true).getTime()
      ) {
        return 1;
      } else if (
        getDate(a[col], true).getTime() <
        getDate(b[col], true).getTime()) {
        return -1;
      }
      return 0;
    });
    this.miTabla = order === 'asc' ? [...orderedList] : [...orderedList.reverse()];
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <button class="step left" @click="${this.prev}">&#x25B7;</button>
        ${this.stepper.map((x, i) => html`
          <button id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</button>
        `)}
        <button class="step" @click="${this.next}">&#x25B7;</button>
      </div>
    `;
  }

  render() {
    return html`
    ${this.renderStepper()}
          <table id="tablaSoli">
              <tr>
                <th>Fecha de solicitud
                  <span>
                    <button class = "btnOrder" @click="${() => this.orderDate('fHoy', 'asc')}">&#9652;</button>
                    <button class = "btnOrder" @click="${() => this.orderDate('fHoy', 'desc')}">&#9662;</button>
                  </span>
                </th>
                <th>Fecha Inicio
                  <span>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFI', 'asc')}">&#9652;</button>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFI', 'desc')}">&#9662;</button>
                  </span>
                </th>
                <th>Fecha Fin
                  <span>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFF', 'asc')}">&#9652;</button>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFF', 'desc')}">&#9662;</button>
                  </span>
                </th>
                <th>Estado de la solicitud</th>
                <th>Fecha de estado</th>
                <th>Eliminar</th>
              </tr>
          
    ${this.miTabla.slice(this.from, this.to).map(item => html`
              <tr>
                <td class="first">${item.fHoy.split('-').reverse().join('-')} ${item.hActual}</td>
                <td>${item.infoFI.split('-').reverse().join('-')}</td>
                <td>${item.infoFF.split('-').reverse().join('-')}</td>
                <td>Pendiente de aprobación</td>
                <td>${item.fHoy.split('-').reverse().join('-')}</td>
                <td> <button id="btnPapelera" @click="${() => this.deleteItem()}"><img id = "papelera" src="/assets/alba1709/papelera.png"></img></button></td>
              </tr>`)}

          </table>
        
        `;
  }
}
customElements.define('tabla-solicitud', TablaSolicitud);
