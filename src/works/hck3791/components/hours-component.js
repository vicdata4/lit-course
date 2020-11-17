import { LitElement, html } from 'lit-element';
import { hoursStyles } from '../styles/hours-styles';

class HoursComponent extends LitElement {
  static get styles() {
    return [hoursStyles];
  }

  static get properties() {
    return {
      data: { type: Array },
      names: { type: Array },
      projectMonths: { type: Array },
      months: { type: Array },
      projects: { type: Array },
      years: { type: Array },
    };
  }

  constructor() {
    super();
    this.names = [];
    this.projectMonths = [];
  }

  firstUpdated() {
    // this.data.forEach((employee) => {
    //     this.names.push(employee.name);
    // });
    // this.requestUpdate();
  }

  generateReport() {
    const optionEmp = this.shadowRoot.getElementById('employees').value;
    const optionPro = this.shadowRoot.getElementById('projects').value;
    const optionYear = this.shadowRoot.getElementById('years').value;
    const filters = this.shadowRoot.querySelectorAll('select');

    if (optionEmp !== 'default' && optionPro !== 'default' && optionYear !== 'default') {
      const projects = this.data.find((obj) => obj.name === optionEmp).projects;
      const years = projects.find((obj) => obj.name === optionPro).years;
      const year = years.find((obj) => obj.year === parseInt(optionYear));

      if (year && year.months.length > 0) {
        this.projectMonths = [...year.months];
      } else {
        this.projectMonths = [];
        // eslint-disable-next-line no-alert
        alert('No se han encontrado registros');
        for (let i = 0; i < filters.length; i++) {
          filters[i].value = 'default';
        }
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Seleccione todos los campos');
      this.projectMonths = [];
      for (let i = 0; i < filters.length; i++) {
        filters[i].value = 'default';
      }
    }
  }

  findMonth(month) {
    return this.projectMonths.find((obj) => obj.month === month) || { month: {}, hours: [] };
  }

  render() {
    return html`
      <div id="container">
        <section>
          <h3>Reporte de horas consolidadas</h3>
          <div class="filters">
            <label>Empleado</label>
            <select name="employees" id="employees">
              <option value="default"></option>
              ${this.data.map((obj) => {
                return html`<option value="${obj.name}">${obj.name}</option>`;
              })}
            </select>
          </div>

          <div class="filters">
            <label>Proyecto</label>
            <select name="projects" id="projects">
              <option value="default"></option>
              ${this.projects.map((obj) => {
                return html`<option value="${obj}">${obj}</option>`;
              })}
            </select>
          </div>

          <div class="filters">
            <label>Año</label>
            <select name="years" id="years">
              <option value="default"></option>
              ${this.years.map((obj) => {
                return html`<option value="${obj}">${obj}</option>`;
              })}
            </select>
          </div>

          <div id="generateReport">
            <button @click="${this.generateReport}" id="generate">Generar reporte</button>
          </div>

          <table id="table">
            <thead>
              <tr>
                <th>Mes</th>
                <th>Horas trabajadas</th>
                <th>Horas de permisos</th>
                <th>Horas de intervenciones</th>
                <th>Jornadas trabajadas</th>
                <th>Jornadas de guardia</th>
                <th>Jornadas de vacaciones</th>
              </tr>
            </thead>
            <tbody>
              ${this.months.map(
                (month) => html`
                  <tr id="${month}">
                    <td>${month}</td>
                    <td>${this.findMonth(month).hours[0]}</td>
                    <td>${this.findMonth(month).hours[1]}</td>
                    <td>${this.findMonth(month).hours[2]}</td>
                    <td>${this.findMonth(month).hours[3]}</td>
                    <td>${this.findMonth(month).hours[4]}</td>
                    <td>${this.findMonth(month).hours[5]}</td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </section>
      </div>
    `;
  }
}

customElements.define('hours-component', HoursComponent);
