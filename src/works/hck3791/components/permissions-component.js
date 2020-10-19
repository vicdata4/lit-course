/* eslint-disable brace-style */
import { LitElement, html } from 'lit-element';
import { permissions } from '../resources/permissions';
import { permissionsStyles } from '../styles/permissionsStyles';
import { nothing } from 'lit-html';

class PermissionsComponent extends LitElement {
  static get styles() {
    return [
      permissionsStyles
    ];
  }

  static get properties() {
    return {
      list: { type: Array },
      newList: { type: Array },
      numberOfPages: { type: Number },
      currentPage: { type: Number },
      listPermissions: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = permissions;
    this.newList = [];
    this.currentPage = 0;
  }

  sort(e) {
    const column = e.currentTarget.id;
    const toOrder = [...this.listPermissions];
    const orderedList = toOrder.sort((a, b) => {
      if (a[column] > b[column]) return 1;
      if (b[column] > a[column]) return -1;
      return 0;
    });

    if (JSON.stringify(this.listPermissions) === JSON.stringify(orderedList)) {
      orderedList.reverse();
    }

    this.listPermissions = [...orderedList];
    this.showTable(0);
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
    const startDate = new Date(this.shadowRoot.getElementById('startDateInput').value);
    const endDate = new Date(this.shadowRoot.getElementById('endDateInput').value);
    this.newList = [];

    if ((startDate.toString() !== 'Invalid Date' && endDate.toString() === 'Invalid Date') || (startDate.toString() === 'Invalid Date' && endDate.toString() !== 'Invalid Date')) {
      const formatStartDate = this.formatDate(startDate);
      const formatEndDate = this.formatDate(endDate);
      for (let i = 0; i < this.listPermissions.length; i++) {
        if (this.listPermissions[i].startDate === formatStartDate || this.listPermissions[i].endDate === formatEndDate) {
          this.newList.push(this.listPermissions[i]);
        }
      }
    } else if (startDate.toString() !== 'Invalid Date' && endDate.toString() !== 'Invalid Date') {
      const formatStartDate = this.formatDate(startDate);
      const formatEndDate = this.formatDate(endDate);
      for (let i = 0; i < this.listPermissions.length; i++) {
        if (this.listPermissions[i].startDate === formatStartDate && this.listPermissions[i].endDate === formatEndDate) {
          this.newList.push(this.listPermissions[i]);
        }
      }
    } else {
      this.newList = [...this.listPermissions.slice(position, position + 10)];
    }
  }

  generateReport() {
    const option = this.shadowRoot.getElementById('employeeSelect').value;
    if (option !== 'default') {
      this.listPermissions = [...this.list.find(employee => employee.name === option).permissions];
      this.numberOfPages = Math.ceil(this.listPermissions.length / 10);
      this.currentPage = 0;
      this.shadowRoot.getElementById('navigation').classList.remove('no-visible');
      this.showTable(this.currentPage);
    } else {
      this.newList = [];
      this.shadowRoot.getElementById('navigation').classList.add('no-visible');
    }
  }

  render() {
    return html`
    <div class='permissions-container'>
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
          <input type='date' id='startDateInput' class="custom-input">
        </div>
        <div id='endDate'>
          <label for='endDateInput'>Fecha de fin</label>
          <input type='date' id='endDateInput'>
        </div>
      </div>
      <input type='button' value='Generar reporte' id='generateReport' @click='${this.generateReport}'>
      <div id='pagination'>
        <div id='content'>
          <table>
            <thead>
              <tr>
                <th>
                  <div class='filter'>
                    <p>Día</p>
                    <div id='startDate' @click='${this.sort}'><span>&#129168;</span><span>&#129170;</span></div>
                  </div>
                </th>
                <th>
                  <div class='filter'>
                    <p>Tipo de permiso</p>
                    <div id='typeOfPermit' @click='${this.sort}'><span>&#129168;</span><span>&#129170;</span></div>
                  </div>
                </th>
                <th>
                  <p>Horas</p>
                </th>
              </tr>
            </thead>
            <tbody id='items'>
              ${this.newList.length > 0 ? this.newList.map(permit => { // eslint-disable-next-line indent
    return html`
              <tr>
                <td>${permit.startDate}</td>
                <td>${permit.typeOfPermit}</td>
                <td>${permit.hours}</td>
              </tr>`;
    }) : nothing}
            </tbody>
          </table>
          <div id='navigation' class='no-visible'>
            <div>
              <input type="button" id="first" value="&#129168;&#129168;" @click="${this.navigation}">
              <input type="button" id="previous" value="&#129168;" @click="${this.navigation}">
            </div>
            <div>
              <input type="button" id="next" value="&#129170;" @click="${this.navigation}">
              <input type="button" id="last" value="&#129170;&#129170;" @click="${this.navigation}">
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
}

customElements.define('permissions-component', PermissionsComponent);
