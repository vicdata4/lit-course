import { LitElement, html } from 'lit-element';
import { tableFormat } from '../utils/styles.js';
import { permissions } from '../utils/employees.js';
import { nothing } from 'lit-html';

class PermissionsReportDetailed extends LitElement {
  static get properties() {
    return {
      list: { type: Array },
      newList: { type: Array },
      currentPage: { type: Number },
      listPermissions: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = permissions;
    this.newList = [];
    this.currentPage = 0;
  }

  static get styles() {
    return [tableFormat];
  }

  formatDate(date) {
    const formattedDate =
      (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
      '/' +
      (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
      '/' +
      date.getFullYear();
    return formattedDate;
  }

  showCalendarStart() {
    this.shadowRoot.getElementById('inputDateStart').focus();
  }

  showCalendarEnd() {
    this.shadowRoot.getElementById('inputDateEnd').focus();
  }

  showTable(position) {
    const startDate = new Date(this.shadowRoot.getElementById('inputStartDate').value);
    const endDate = new Date(this.shadowRoot.getElementById('inputEndDate').value);
    this.newList = [];

    const formatStartDate = this.formatDate(startDate);
    const formatEndDate = this.formatDate(endDate);

    for (let i = 0; i < this.listPermissions.length; i++) {
      if (this.listPermissions[i].startDate >= formatStartDate && this.listPermissions[i].endDate <= formatEndDate) {
        this.newList.push(this.listPermissions[i]);
      } else {
        this.newList = [...this.listPermissions.slice(position, position + 10)];
      }
    }

    if (this.newList.length === 0) {
      // eslint-disable-next-line no-alert
      alert('No hay registros en esas fechas para ese empleado');
    }
  }

  generateReport() {
    const opt = this.shadowRoot.getElementById('employees').value;

    if (opt) {
      this.listPermissions = [...this.list.find((employee) => employee.name === opt).permissions];
      this.currentPage = 0;
      this.showTable(this.currentPage);
    } else {
      // eslint-disable-next-line no-alert
      alert('Selecciona un empleado.');
    }
  }

  render() {
    return html`
      <div class="permissions-report-ctr">
        <h3>Reporte de Permisos Detallado</h3>

        <div>
          <label>Empleado:</label>
          <select name="employees" id="employees" @change="${this.selected}">
            <option value=""></option>
            ${this.list.map((value) => {
              return html`<option value="${value.name}">${value.name}</option>`;
            })}
          </select>
        </div>

        <div>
          <label>Fecha de inicio:</label>
          <input id="inputStartDate" type="date" />
          <img src="/assets/calaverosa/icons/calendar.png" alt="imagen calendario" @click="${this.showCalendarStart}" />
        </div>

        <div>
          <label>Fecha de fin:</label>
          <input id="inputEndDate" type="date" />
          <img src="/assets/calaverosa/icons/calendar.png" alt="imagen calendario" @click="${this.showCalendarEnd}" />
        </div>

        <div>
          <button @click="${this.generateReport}" id="generateReport">Generar reporte</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Tipo de permiso</th>
              <th>Horas</th>
            </tr>
          </thead>
          <tbody id="tbody">
            ${this.newList.length > 0
              ? this.newList.map((permit) => {
                  return html` <tr>
                    <td>${permit.startDate}</td>
                    <td>${permit.type}</td>
                    <td>${permit.hours}</td>
                  </tr>`;
                })
              : nothing}
          </tbody>
        </table>
      </div>
    `;
  }
}
customElements.define('permissions-report-detailed', PermissionsReportDetailed);
