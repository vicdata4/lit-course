import { LitElement, html } from 'lit-element';
import { viewStyles } from './utils/t-styles';
import { responsiveTable } from './utils/table-responsive';
import { dateToday } from './utils/functions';
import { material } from './utils/fonts';
export class TableRequests extends LitElement {
  static get styles() {
    return [material, viewStyles, responsiveTable];
  }

  static get properties() {
    return {
      tableRequests: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.tableRequests = [];
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
    const nPages = Math.ceil(this.tableRequests.length / this.nElements);
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
        <button class="step left prev" @click="${this.prev}">&#x25B7;</button>
        ${this.stepper.map(
          (x, i) => html` <button id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</button> `,
        )}
        <button class="step next" @click="${this.next}">&#x25B7;</button>
      </div>
    `;
  }

  orderDates(column) {
    const myTable = [...this.tableRequests];

    const orderTable = myTable.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    if (JSON.stringify(this.tableRequests) === JSON.stringify(orderTable)) {
      orderTable.reverse();
    }

    this.tableRequests = [...orderTable];
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
    ${this.renderStepper()}
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

        ${this.tableRequests.slice(this.from, this.to).map(
          (item, i) => html` <tr id="rowInfo">
            <td data-title="Fecha de solicitud: ">${dateToday(item.fHoy).defaultDate} ${item.hActual}</td>
            <td data-title="Fecha Inicio: ">${dateToday(item.infoFI).defaultDate}</td>
            <td data-title="Fecha Fin: ">${dateToday(item.infoFF).defaultDate}</td>
            <td data-title="Estado de la solicitud: ">${item.status}</td>
            <td data-title="Fecha de estado: ">${dateToday(item.statusDate).defaultDate}</td>
            <td data-title="Eliminar: ">
              <button id="btnPapelera" @click="${() => this.deleteItem(i)}">
                <span id="papelera" class="material-icons">delete</span>
              </button>
            </td>
          </tr>`,
        )}
      </table>
      ${this.renderStepper()}
    `;
  }
}
customElements.define('table-requests', TableRequests);
