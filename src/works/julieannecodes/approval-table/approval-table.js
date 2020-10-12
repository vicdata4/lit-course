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
      orderType: { type: Array },
      nEmployees: { type: Number },
      steps: { type: Array },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false },
      index: { type: Number }
    };
  }

  constructor() {
    super();
    this.tableTitles = ['Nombre del empleado', 'Fecha de Solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de estado'];
    this.statuses = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
    this.currentDate = new Date();
    this.requests = [...employeeList];
    this.sortedEmployees = [];
    this.orderType = ['name', 'applicationD'];
    this.steps = [];
    this.nEmployees = 4;
    this.from = 0;
    this.index = 0;
    this.to = this.nEmployees;
  }

  sendStatus(e) {
    const objId = parseInt(e.target.id);
    const status = e.target.value;
    const empFound = this.requests.find(item => item.id === objId);

    empFound.status = status;
    empFound.statusDate = this.currentDate;
    this.requests = [...this.requests];
  }

  orderEmployees(e) {
    this.sortedEmployees = orderItems(this.requests, e.target.id);
    this.requests = [...this.sortedEmployees];

    if (e.target.value === 'asc') {
      e.target.value = 'desc';
      e.currentTarget.classList.add('rotated');
    } else {
      this.requests.reverse();
      e.target.value = 'asc';
      e.currentTarget.classList.remove('rotated');
    }
    this.showPartOf(0);
  }

  showPartOf(index) {
    this.index = index;
    this.from = this.nEmployees * this.index;
    this.to = this.from + this.nEmployees;
  }

  prevOrNext(e) {
    if (e.target.id === 'leftB' && this.index > 0) {
      this.index -= 1;
    }
    if (e.target.id === 'rightB' && this.index < this.steps.length - 1) {
      this.index += 1;
    }
    this.showPartOf(this.index);
  }

  renderStepper() {
    return html`
    <div class="stepper">
      <button class="left" id="leftB" @click="${this.prevOrNext}">&#x25C0;</button>
      ${this.steps.map((step, i) => html`<button id="${i}" class="bSteps" @click="${() => this.showPartOf(i)}">${i + 1}</button>`)}
      <button class="right" id="rightB" @click="${this.prevOrNext}">&#x25BA;</button>
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
          ${this.requests.slice(this.from, this.to).map((empl, i) => html`
            <tr id="${empl.id}">
              <td>${empl.name}</td>
              <td>${dateFormatter(empl.applicationD).sCurrentDate}</td>
              <td>${dateFormatter(empl.startDate).sCurrentDate}</td>
              <td>${dateFormatter(empl.endingDate).sCurrentDate}</td>
              <td>
                <select id="${empl.id}" @change="${this.sendStatus}" >
               ${this.statuses.map(items => html`
                  <option value="${items}">${items}</option>`)}
                </select>
              </td>
              <td>${dateFormatter(empl.statusDate).sCurrentDate}</td>
            </tr>
          `)}
        </table>
      </div>
        `;
  }
}

window.customElements.define('approval-table', ApprovalTable);
