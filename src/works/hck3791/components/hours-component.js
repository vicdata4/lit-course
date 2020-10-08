import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { hoursStyle } from '../styles/styles';
import { employees } from '../emp';

class HoursComponent extends LitElement {
  static get styles() {
    return [
      hoursStyle
    ];
  }

  static get properties() {
    return {
      months: { type: Array }
    };
  }

  constructor() {
    super();
    this.employees = Object.keys(employees);
    this.proyects = ['Proyect 1', 'Proyect 2'];
    this.years = [2020, 2021, 2022];
    this.monthsList = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.months = [];
  }

  generateReport() {
    const employee = this.shadowRoot.getElementById('employees').value;
    const proyect = this.shadowRoot.getElementById('proyects').value;
    const year = this.shadowRoot.getElementById('years').value;

    if (employee && proyect && year) {
      const data = employees[employee][proyect][year];
      if (data && data.length > 0) {
        this.months = [...data];
      } else {
        this.months = [];
        // eslint-disable-next-line no-alert
        alert('No se han encontrado registros');
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Rellena todos los campos');
    }
  }

  findMonth(month) {
    return this.months.find(x => x.month === month) || { month: {}, hours: [] };
  }

  render() {
    return html`
      <div class="hours-container">
          <section>
          <h3>Reporte de horas consolidadas</h3>
           <div>
              <label>Empleado</label>
              <select name="employees" id="employees" @change="${this.selected}">
                <option value=""></option>
                ${this.employees.map(employee => { return html`<option value="${employee}">${employee}</option>`; })}                                  
              </select> 
           </div>

           <div>
             <label>Proyecto</label>
               <select name="proyects" id="proyects" @change="${this.selected}">
                  <option value=""></option>
                  ${(this.proyects != null) ? this.proyects.map(proyect => { return html`<option value="${proyect}">${proyect}</option>`; }) : nothing} 
               </select>
           </div>

           <div>
             <label>Año</label>
             <select name="years" id="years" @change="${this.selected}">
               <option value=""></option>
               ${this.years.map(year => { return html`<option value="${year}">${year}</option>`; })}
             </select>
           </div>

            <div>
              <button @click="${this.generateReport}" id="generateReport">Generar reporte</button>
            </div>        

            <table>
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
              <tbody id="tbody"> 
              ${this.monthsList.map(month => html`
                  <tr id="${month}">
                    <td>${month}</td>
                    <td class="data">${this.findMonth(month).hours[0]}</td>
                    <td class="data">${this.findMonth(month).hours[1]}</td>
                    <td class="data">${this.findMonth(month).hours[2]}</td>
                    <td class="data">${this.findMonth(month).hours[3]}</td> 
                    <td class="data">${this.findMonth(month).hours[4]}</td>
                    <td class="data">${this.findMonth(month).hours[5]}</td>
                  </tr>
                `)}
              </tbody>
            </table>    
          </section>
        </div>
      `;
  }
}

customElements.define('hours-component', HoursComponent);
