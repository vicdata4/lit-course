
import { LitElement, html } from 'lit-element';
import { permissions } from '../resources/permissions';
import { permissionsStyles } from '../styles/permissionsStyles';

class PermissionsComponent extends LitElement {
  static get styles() {
    return [
      permissionsStyles
    ];
  }

  static get properties() {
    return {
      list: { type: Array },
      numberOfPages: { type: Number },
      currentPage: { type: Number },
      listPermissions: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = permissions;
    this.currentPage = 0;
  }

  formatDate(date) {
    const formattedDate = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + date.getFullYear();
    return formattedDate;
  }

  navigation(e) {
    const step = e.target.id;
    switch (step) {
      case 'first':
        this.currentPage = 0;
        this.showTable(this.currentPage);
        break;
      case 'next':
        if (this.currentPage === this.numberOfPages - 1) {
          this.currentPage = this.numberOfPages - 1;
        } else {
          this.currentPage++;
        }
        this.showTable(this.currentPage * 10);
        break;
      case 'previous':
        if (this.currentPage > 0) {
          this.currentPage--;
        } else {
          this.currentPage = 0;
        }
        this.showTable(this.currentPage * 10);
        break;
      case 'last':
        this.currentPage = this.numberOfPages - 1;
        this.showTable(this.currentPage * 10);
        break;
    }
  }

  showTable(position) {
    const tableBody = this.shadowRoot.getElementById('items');
    const option = this.shadowRoot.getElementById('employeeSelect').value;
    const startDate = new Date(this.shadowRoot.getElementById('startDateInput').value);
    const endDate = new Date(this.shadowRoot.getElementById('endDateInput').value);

    let newListPermissions = [];

    if (option !== 'default') {
      if ((startDate.toString() !== 'Invalid Date' && endDate.toString() === 'Invalid Date') || (startDate.toString() === 'Invalid Date' && endDate.toString() !== 'Invalid Date')) {
        const formatStartDate = this.formatDate(startDate);
        const formatEndDate = this.formatDate(endDate);
        for (let i = 0; i < this.listPermissions.length; i++) {
          if (this.listPermissions[i].startDate === formatStartDate || this.listPermissions[i].endDate === formatEndDate) {
            newListPermissions.push(this.listPermissions[i]);
          }
        }
      } else if (startDate.toString() !== 'Invalid Date' && endDate.toString() !== 'Invalid Date') {
        const formatStartDate = this.formatDate(startDate);
        const formatEndDate = this.formatDate(endDate);
        for (let i = 0; i < this.listPermissions.length; i++) {
          if (this.listPermissions[i].startDate === formatStartDate && this.listPermissions[i].endDate === formatEndDate) {
            newListPermissions.push(this.listPermissions[i]);
          }
        }
      } else {
        newListPermissions = [...this.listPermissions.slice(position, position + 10)];
      }

      this.cleanTable(tableBody);

      for (let i = 0; i < newListPermissions.length; i++) {
        const row = document.createElement('TR');

        const cellDay = document.createElement('TD');
        cellDay.innerText = newListPermissions[i].startDate;
        row.appendChild(cellDay);

        const cellType = document.createElement('TD');
        cellType.innerText = newListPermissions[i].typeOfPermit;
        row.appendChild(cellType);

        const cellHours = document.createElement('TD');
        cellHours.innerText = newListPermissions[i].hours;
        row.appendChild(cellHours);

        tableBody.appendChild(row);
      }

      if (tableBody.hasChildNodes) {
        this.shadowRoot.getElementById('navigation').classList.remove('no-visible');
      }
    } else {
      this.cleanTable(tableBody);
    }
  }

  cleanTable(table) {
    while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
  }

  generateReport() {
    const option = this.shadowRoot.getElementById('employeeSelect').value;
    this.listPermissions = [...this.list.find(employee => employee.name === option).permissions];
    this.numberOfPages = Math.ceil(this.listPermissions.length / 10);
    console.log(this.numberOfPages);
    this.currentPage = 0;
    this.showTable(0);
  }

  render() {
    return html`
      <h3>Reporte de permisos detallado</h3>
      <div id='filters'>
        <div id='employee'>
          <label for='employeeSelect'>Empleado</label>
          <select id='employeeSelect'>
            <option value='default'></option>
            ${this.list.map(value => { return html`<option value='${value.name}'>${value.name}</option>`; })}
          </select>
        </div>
        <div id='startDate'>
          <label for='startDateInput'>Fecha de inicio</label>
          <input type='date' id='startDateInput'>
        </div>
        <div id='endDate'>
          <label for='endDateInput'>Fecha de fin</label>
          <input type='date' id='endDateInput'>
        </div>
      </div>
      <input type='button' value='Generar reporte' @click='${this.generateReport}'>
      <div id='pagination'>
        <div id='content'>
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Tipo de permiso</th>
                <th>Horas</th>
              </tr>
            </thead>
            <tbody id='items'></tbody>
          </table>
          <div id='navigation' class='no-visible'>
              <input type="button" id="first" value="primera" @click="${this.navigation}">
              <input type="button" id="next" value="siguiente"  @click="${this.navigation}">
              <input type="button" id="previous" value="anterior" @click="${this.navigation}">
              <input type="button" id="last" value="ultima" @click="${this.navigation}">
            </div>
        </div>
      </div>
    `;
  }
}

customElements.define('permissions-component', PermissionsComponent);
