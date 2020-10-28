import { LitElement, html } from 'lit-element';
import { viewStyles } from './utils/t-styles';
import { responsiveTable } from './utils/table-responsive';
export class TablaSolicitud extends LitElement {
  static get styles() {
    return [viewStyles, responsiveTable];
  }

  static get properties() {
    return {
      miTabla: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.miTabla = [];
    this.nElements = 10;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  async firstUpdated() {
    this.reloadTable();
  }

  async reloadTable() {
    const nPages = Math.ceil(this.miTabla.length / this.nElements);
    this.stepper = new Array(nPages).fill({});
    this.to = this.nElements;
    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach((row) => {
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
        index: i,
      },
    });
    this.dispatchEvent(event);
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <button class="step left" @click="${this.prev}">&#x25B7;</button>
        ${this.stepper.map(
          (x, i) => html` <button id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</button> `,
        )}
        <button class="step" @click="${this.next}">&#x25B7;</button>
      </div>
    `;
  }

  orderDates(column) {
    const myTable = [...this.miTabla];

    const ordermiTable = myTable.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    if (JSON.stringify(this.miTabla) === JSON.stringify(ordermiTable)) {
      ordermiTable.reverse();
    }

    this.miTabla = [...ordermiTable];
    this.showPage(0);
  }

  rotateButton(e) {
    const btn = e.currentTarget;

    if (!btn.classList.contains('rotate')) {
      btn.classList.add('rotate');
    } else {
      btn.classList.remove('rotate');
    }
  }

  orderAndRotate(e, column) {
    this.rotateButton(e);
    this.orderDates(column);
  }

  render() {
    return html`
      <table id="tablaSoli">
        <tr id="rowTitle">
          <th class="ord">
            Fecha de solicitud
            <span>
              <button class="btnOrder" @click="${(e) => this.orderAndRotate(e, 'fHoy')}">&#9662;</button>
            </span>
          </th>
          <th class="ord">
            Fecha Inicio
              <button class="btnOrder" @click="${(e) => this.orderAndRotate(e, 'infoFI')}">&#9662;</button>
            </span>
          </th>
          <th class="ord">
            Fecha Fin
            <span>
              <button class="btnOrder" @click="${(e) => this.orderAndRotate(e, 'infoFF')}">&#9662;</button>
            </span>
          </th>
          <th class="cell">Estado de la solicitud</th>
          <th class="cell">Fecha de estado</th>
          <th class="cell">Eliminar</th>
        </tr>

        ${this.miTabla.slice(this.from, this.to).map(
          (item) => html`
              <tr id="rowInfo">
                <td data-title="Fecha de solicitud: ">${item.fHoy.split('-').reverse().join('-')} ${item.hActual}</td>
                <td data-title="Fecha Inicio: ">${item.infoFI.split('-').reverse().join('-')}</td>
                <td data-title="Fecha Fin: ">${item.infoFF.split('-').reverse().join('-')}</td>
                <td data-title="Estado de la solicitud: ">Pendiente de aprobación</td>
                <td data-title="Fecha de estado: ">${item.fHoy.split('-').reverse().join('-')}</td>
                <td data-title="Eliminar: "> <button id="btnPapelera" @click="${() =>
                  this.deleteItem()}"><img id = "papelera" src="/assets/alba1709/papelera.png"></img></button></td>
              </tr>`,
        )}
      </table>
      ${this.renderStepper()}
    `;
  }
}
customElements.define('tabla-solicitud', TablaSolicitud);
