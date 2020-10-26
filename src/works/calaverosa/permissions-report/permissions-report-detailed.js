import { LitElement, html } from 'lit-element';
import { tableFormat } from '../utils/styles.js';
import { employees } from '../utils/employees.js';

class PermissionsReportDetailed extends LitElement {
  static get properties() {
    return {
      employees: { type: Array },
      dates: { type: Array },
      emp: { type: Object },
    };
  }

  constructor() {
    super();
    this.employees = employees;
    this.dates = [];
    this.emp = {};
  }

  static get styles() {
    return [tableFormat];
  }

  showCalendarStart() {
    this.shadowRoot.getElementById('inputDateStart').focus();
  }

  showCalendarEnd() {
    this.shadowRoot.getElementById('inputDateEnd').focus();
  }

  generateReport() {
    const employee = this.shadowRoot.getElementById('employees').value;

    if (employee) {
      const data = this.employees.find((item) => item.name === employee);

      this.emp = data || {};
      /* if (data.type.length > 0) {
        this.employee = data;
      } else {
        alert('No hay permisos reportados para este empleado.');
      } */
    } else {
      // eslint-disable-next-line no-alert
      alert('Error, selecciona empleado.');
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
            ${this.employees.map((employee) => {
              return html`<option value="${employee.name}">${employee.name}</option>`;
            })}
          </select>
        </div>

        <div>
          <label>Fecha de inicio:</label>
          <input id="inputDateStart" type="date" />
          <img src="/assets/calaverosa/icons/calendar.png" alt="imagen calendario" @click="${this.showCalendarStart}" />
        </div>

        <div>
          <label>Fecha de fin:</label>
          <input id="inputDateEnd" type="date" />
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
            <tr>
              <td>${this.emp.date}</td>
              <td>${this.emp.type}</td>
              <td>${this.emp.hours}</td>
            </tr>
            <tr>
              <td>${this.emp.date}</td>
              <td>${this.emp.type}</td>
              <td>${this.emp.hours}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }
}
customElements.define('permissions-report-detailed', PermissionsReportDetailed);
