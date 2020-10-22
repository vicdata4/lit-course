import { LitElement, html } from 'lit-element';
import { viewHoliday } from './utils/styles-admin-holidays';
import { getFormatterDate } from './utils/functions';
import { nothing } from 'lit-html';

export class TableAdmin extends LitElement {
  static get styles() {
    return [
      viewHoliday
    ];
  }

  static get properties() {
    return {
      adminTable: { type: Array },
      numEmp: { type: Number },
      status: { type: Array },
      currentDate: { type: String },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.adminTable = [];
    this.numEmp = 10;
    this.status = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
    this.currentDate = new Date();
    this.stepper = [];
    this.from = 0;
    this.to = this.numEmp;
    this.index = 0;
  }

  async firstUpdated() {
    const nPages = Math.ceil(this.adminTable.length / this.numEmp);
    this.stepper = new Array(nPages).fill({});
    this.to = this.numEmp;

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
    this.from = this.numEmp * index;
    this.to = this.from + this.numEmp;
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

  renderStepper() {
    return html`
      <div class="stepper">
        <div class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map((x, i) => html`
          <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div>
        `)}
        <div class="step" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  sendStat(e) {
    const id = parseInt(e.target.id);
    const status = e.target.value;
    const empFound = this.adminTable.find(item => item.id === id);
    empFound.status = status;
    empFound.dStatus = this.currentDate;
    this.adminTable = [...this.adminTable];
  }

  orderEmployees(column) {
    const myTable = [...this.adminTable];

    const orderedadminTable = myTable.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    if (JSON.stringify(this.adminTable) === JSON.stringify((orderedadminTable))) {
      orderedadminTable.reverse();
    }

    this.adminTable = [...orderedadminTable];
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
    this.orderEmployees(column);
  }

  render() {
    return html`
      <div id="idTable">
        <table id="tableAdmin">
            <tr>
              <th id="thName">
                Nombre del empleado
                <button class="btnOrder" value="asc" @click="${e => this.orderAndRotate(e, 'name')}">&#9662;</button>
              </th>
              <th id="thDRequest">
                Fecha de solicitud
                <button class="btnOrder" @click="${e => this.orderAndRotate(e, 'dRequest')}">&#9662;</button>    
              </th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado de la solicitud</th>
              <th>Fecha de estado</th>
            </tr>
            ${this.adminTable.slice(this.from, this.to).map(item => html`
            <tr>
              <td class="first">${item.name}</td>
              <td>${getFormatterDate(item.dRequest).defaultDate}</td>
              <td>${getFormatterDate(item.dStart).defaultDate}</td>
              <td>${getFormatterDate(item.dEnd).defaultDate}</td>
              <td>
                <select id="${item.id}" @change="${this.sendStat}" >
                  <option value="${item.status}">${item.status}</option>
                    ${this.status.map(st => html`
                    ${item.status.toUpperCase() !== st.toUpperCase() ? html`<option value="${st}">${st}</option>` : nothing}`)}
                </select> 
              </td>
              <td>${getFormatterDate(item.dStatus).defaultDate}</td>
            </tr>`)}

        </table>
      </div>
        ${this.renderStepper()}
        `;
  }
}
customElements.define('table-admin', TableAdmin);