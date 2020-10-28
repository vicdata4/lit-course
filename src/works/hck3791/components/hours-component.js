import { LitElement, html } from 'lit-element';
import { hoursStyles } from '../styles/hours-styles';

class HoursComponent extends LitElement {
  static get styles() {
    return [hoursStyles];
  }

  static get properties() {
    return {
      names: { type: Array },
      projects: { type: Array },
      years: { type: Array },
      projectMonths: { type: Array },
      months: { type: Array },
    };
  }

  constructor() {
    super();
    this.names = [];
    this.projects = [];
    this.years = [];
    this.projectMonths = [];
    this.months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
  }

  firstUpdated() {
    this.data.forEach((employee) => {
      this.names.push(employee.name);
    });
    this.requestUpdate();
  }

  selected(e) {
    let selection;

    if (e.target.id === 'employees') {
      selection = e.target.value;
      const employee = this.data.find((employee) => employee.name === selection);
      this.projects = employee ? [...employee.projects] : [];
    } else {
      selection = e.target.value;
      const project = this.projects.find((project) => project.name === selection);
      this.years = project ? [...project.years] : [];
    }
    this.requestUpdate();
  }

  generateReport() {
    const optionEmp = this.shadowRoot.getElementById('employees').value;
    const optionPro = this.shadowRoot.getElementById('projects').value;
    const optionYear = this.shadowRoot.getElementById('years').value;

    if (optionEmp !== 'default' && optionPro !== 'default' && optionYear !== 'default') {
      const projects = this.data.find((obj) => obj.name === optionEmp).projects;
      const years = projects.find((obj) => obj.name === optionPro).years;
      const year = years.find((obj) => obj.year === parseInt(optionYear));

      if (year && year.months.length > 0) {
        this.projectMonths = [...year.months];
      } else {
        this.projectMonths = [];
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Seleccione todos los campos');
      this.projectMonths = [];
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
            <select name="employees" id="employees" @change="${this.selected}">
              <option value="default"></option>
              ${this.names.map((obj) => {
                return html`<option value="${obj}">${obj}</option>`;
              })}
            </select>
          </div>

          <div class="filters">
            <label>Proyecto</label>
            <select name="projects" id="projects" @change="${this.selected}">
              <option value="default"></option>
              ${this.projects.map((obj) => {
                return html`<option value="${obj.name}">${obj.name}</option>`;
              })}
            </select>
          </div>

          <div class="filters">
            <label>Año</label>
            <select name="years" id="years">
              <option value="default"></option>
              ${this.years.map((obj) => {
                return html`<option value="${obj.year}">${obj.year}</option>`;
              })}
            </select>
          </div>

          <div id="generateReport">
            <button @click="${this.generateReport}" id="generateReport">Generar reporte</button>
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
