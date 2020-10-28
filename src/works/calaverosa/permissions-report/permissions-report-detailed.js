import { LitElement, html } from 'lit-element';
import { tableFormat, mediaQueriesPerReport } from '../utils/styles.js';
import { permissions } from '../utils/employees.js';

class PermissionsReportDetailed extends LitElement {
  static get styles() {
    return [tableFormat, mediaQueriesPerReport];
  }

  static get properties() {
    return {
      list: { type: Array },
      newList: { type: Array },
      numberOfPages: { type: Number },
      currentPage: { type: Number },
      listPermissions: { type: Array },
      listPermissionsEmp: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = permissions;
    this.newList = [];
    this.currentPage = 0;
  }

  sort(e) {
    const column = e.target.id;
    const order = [...this.listPermissions];
    const orderedList = order.sort((a, b) => {
      var orderColumn = a[column] > b[column] ? 1 : b[column] > a[column] ? -1 : 0;
      return orderColumn;
    });

    if (JSON.stringify(this.listPermissions) === JSON.stringify(orderedList)) {
      orderedList.reverse();
    }

    this.listPermissions = [...orderedList];
    this.showTable(0);
  }

  navigation(e) {
    const step = e.target.id;
    switch (step) {
      case 'next-btn':
        if (this.currentPage === this.numberOfPages - 1) {
          this.currentPage = this.numberOfPages - 1;
        } else {
          this.currentPage++;
        }
        this.showTable(this.currentPage * 10);
        break;
      case 'previous-btn':
        if (this.currentPage > 0) {
          this.currentPage--;
        } else {
          this.currentPage = 0;
        }
        this.showTable(this.currentPage * 10);
        break;
    }
  }

  formatDate(str) {
    return str.split('/').reverse().join('/');
  }

  showCalendarStart() {
    this.shadowRoot.getElementById('inputStartDate').focus();
  }

  showCalendarEnd() {
    this.shadowRoot.getElementById('inputEndDate').focus();
  }

  showTable(position) {
    const inputStartDate = new Date(this.shadowRoot.getElementById('inputStartDate').value);
    const inputEndDate = new Date(this.shadowRoot.getElementById('inputEndDate').value);
    this.newList = [];

    if (inputStartDate.toString() !== 'Invalid Date' && inputEndDate.toString() !== 'Invalid Date') {
      for (let i = 0; i < this.listPermissions.length; i++) {
        const formatStartDate = new Date(this.listPermissions[i].startDate);
        const formatEndDate = new Date(this.listPermissions[i].endDate);

        if (formatStartDate >= inputStartDate && formatEndDate <= inputEndDate) {
          this.newList.push(this.listPermissions[i]);
        }
      }
    } else if (inputStartDate.toString() !== 'Invalid Date' && inputEndDate.toString() === 'Invalid Date') {
      for (let i = 0; i < this.listPermissions.length; i++) {
        const formatStartDate = new Date(this.listPermissions[i].startDate);

        if (formatStartDate >= inputStartDate) {
          this.newList.push(this.listPermissions[i]);
        }
      }
    } else if (inputStartDate.toString() === 'Invalid Date' && inputEndDate.toString() !== 'Invalid Date') {
      for (let i = 0; i < this.listPermissions.length; i++) {
        const formatEndDate = new Date(this.listPermissions[i].endDate);

        if (formatEndDate <= inputEndDate) {
          this.newList.push(this.listPermissions[i]);
        }
      }
    } else if (inputStartDate.toString() === 'Invalid Date' && inputEndDate.toString() === 'Invalid Date') {
      this.newList = [...this.listPermissions.slice(position, position + 10)];
    }

    if (this.listPermissions.length > 9) {
      this.shadowRoot.getElementById('navigation').classList.remove('no-visible');
    }

    if (this.newList.length === 0) {
      this.shadowRoot.getElementById('navigation').classList.add('no-visible');
      // eslint-disable-next-line no-alert
      alert('No hay registros en esas fechas para ese empleado');
    }
  }

  generateReport() {
    const infoEmp = this.shadowRoot.getElementById('employees').value;

    if (infoEmp) {
      this.listPermissionsEmp = [...this.list.find((employee) => employee.name === infoEmp).permissions];
      this.listPermissions = this.listPermissionsEmp.filter((obj) => obj.type !== 'Vacaciones');
      this.numberOfPages = Math.ceil(this.listPermissions.length / 10);
      this.currentPage = 0;
      this.showTable(this.currentPage);
    } else {
      this.shadowRoot.getElementById('navigation').classList.add('no-visible');
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
          <img
            src="/assets/calaverosa/icons/calendar.png"
            class="calendar"
            alt="imagen calendario"
            @click="${this.showCalendarStart}"
          />
        </div>

        <div>
          <label>Fecha de fin:</label>
          <input id="inputEndDate" type="date" />
          <img
            src="/assets/calaverosa/icons/calendar.png"
            class="calendar"
            alt="imagen calendario"
            @click="${this.showCalendarEnd}"
          />
        </div>

        <div>
          <button @click="${this.generateReport}" id="generateReport">Generar reporte</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                Día
                <img src="/assets/calaverosa/icons/arrow.png" class="arrow-str" id="startDate" @click="${this.sort}" />
              </th>
              <th>
                Tipo de permiso
                <img src="/assets/calaverosa/icons/arrow.png" class="arrow-str" id="type" @click="${this.sort}" />
              </th>
              <th>Horas</th>
            </tr>
          </thead>
          <tbody id="tbody">
            ${this.newList
              .filter((obj) => obj.type !== 'Vacaciones')
              .map((permit) => {
                return html` <tr>
                  <td>${this.formatDate(permit.startDate)}</td>
                  <td>${permit.type}</td>
                  <td>${permit.hours}</td>
                </tr>`;
              })}
          </tbody>
        </table>

        <div id="navigation" class="no-visible">
          <input type="button" id="previous-btn" value="«" @click="${this.navigation}" />
          <input type="button" id="next-btn" value="»" @click="${this.navigation}" />
          <div id="nPages">${this.currentPage + 1}/${this.numberOfPages}</div>
        </div>
      </div>
    `;
  }
}
customElements.define('permissions-report-detailed', PermissionsReportDetailed);
