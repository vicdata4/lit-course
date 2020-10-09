import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { tableStyles, stepperStyles } from '../utils/custom-styles';
import { dateFormatter, orderItems } from '../utils/functions';
import { employeeList } from '../utils/employees';
class ApprovalTable extends LitElement {
  static get styles() {
    return [tableStyles, stepperStyles];
  }

  static get properties() {
    return {
      tableTitles: { type: Array },
      requests: { type: Array },
      sortedEmployees: { type: Array },
      statuses: { type: Array },
      currentDate: { type: String },
      orderValue: { type: String },
      orderType: { type: Array },
      nEmployees: { type: Number },
      steps: { type: Array },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.tableTitles = ['Nombre del empleado', 'Fecha de Solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de estado'];
    this.statuses = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
    this.currentDate = new Date();
    this.orderValue = 'asc';
    this.requests = [...employeeList];
    this.sortedEmployees = [];
    this.orderType = ['nombre', 'fSolicitud'];
    this.steps = [];
    this.nEmployees = 4;
    this.from = 0;
    this.to = this.nEmployees;
  }

  sendStatus(e) {
    const objId = e.target.id;
    const status = e.target.value;

    this.requests[objId].estado = status;
    this.requests[objId].fechaEstado = this.currentDate;
    this.requests = [...this.requests];
  }

  orderEmployees(e) {
    this.sortedEmployees = orderItems(this.requests, e.target.id);
    this.requests = [...this.sortedEmployees];
    console.log(this.requests);
    e.currentTarget.classList.add('rotated');
  }

  renderStepper() {
    return html`
    <div class="stepper">
      <button class="left">&#x25C0;</button>
      ${this.steps.map((step, i) => html`<button id="${i}" class="bSteps">${i + 1}</button>`)}
      <button class="right">&#x25BA;</button>
    </div>
    `;
  }

  async firstUpdated() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.addEventListener('change', this.sendStatus);

    const nPages = Math.ceil(this.requests.length / this.nEmployees);
    this.steps = new Array(nPages).fill({});
    this.to = this.nEmployees;
  }

  render() {
    return html`
      <div class="container">
        <h1>Solicitud de vacaciones</h1>
        ${this.renderStepper()}
        <table>
          <tr>
            ${this.tableTitles.map((items, i) => html`
              <th>${items} ${items === 'Nombre del empleado' ||
                  items === 'Fecha de Solicitud' ? html`
                  <button id="${this.orderType[i]}" class="btOrder" value="asc" @click="${this.orderEmployees}">&#x25B2;</button>` : nothing}</th>
            `)}
          </tr>
          ${this.requests.slice(this.from, this.to).map((item, i) => html`
            <tr>
              <td>${item.nombre}</td>
              <td>${dateFormatter(item.fSolicitud).sCurrentDate}</td>
              <td>${dateFormatter(item.fInicio).sCurrentDate}</td>
              <td>${dateFormatter(item.fFin).sCurrentDate}</td>
              <td>
                <select id="${i}" @change="${this.sendStatus}" >${this.statuses.map(items => html`
                  <option value=${items}>${items}</option>`)}
                </select>
              </td>
              <td>${dateFormatter(item.fechaEstado).sCurrentDate}</td>
            </tr>
          `)}
        </table>
      </div>
        `;
  }
}

window.customElements.define('approval-table', ApprovalTable);
