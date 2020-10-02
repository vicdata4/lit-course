import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { HOURS } from '../styles/styles';
import { employees } from '../emp';

class HoursComponent extends LitElement {

    static get styles() {
        return [
            HOURS
        ]
    }

    static get properties() {
        return {
            employees: { type: Array },
            proyects: { type: Array },
            years: { type: Array },
            hours: { type: Array }
        }
    }

    constructor() {
        super();
        this.employees = Object.keys(employees);
        this.proyects = ['Proyect 1', 'Proyect 2'];
        this.years = [2020, 2021, 2022];
        this.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.hours = [];
    }

    generateReport() {
        let emp = this.shadowRoot.getElementById('employees');
        let pro = this.shadowRoot.getElementById('proyects');
        let y = this.shadowRoot.getElementById('years');
        let employee = emp.options[emp.selectedIndex].text;
        let proyect = pro.options[pro.selectedIndex].text;
        let year = y.options[y.selectedIndex].text;
        let reset = this.shadowRoot.querySelectorAll('.data');

        if(employee != '' && proyect != '' && year != '') {

            console.log(true);
            
            let info = employees[employee][proyect][year];

            if(info != null) {

                console.log(info);
                let rows = this.shadowRoot.querySelectorAll('TR');

                /** Reset cells values **/
                
                for(let r = 0; r < reset.length; r++) {
                    reset[r].innerText = "";
                }
            

                for(let i = 0; i < info.length; i++) {
                    for(let r = 0; r < rows.length; r++) {
                        if(info[i].month == rows[r].getAttribute('id')) {
                            let row =  rows[r];
                            let cells = row.querySelectorAll('.data');
                            for(let c = 0; c < cells.length; c++) {
                                cells[c].innerText = info[i].hours[c];
                            }                    
                        }
                    }
                }

            } else {
                /** Reset cells values **/
                
                for(let r = 0; r < reset.length; r++) {
                    reset[r].innerText = "";
                }
            }
            

        } else {
            console.log(false);
            /** Reset cells values **/
            
            for(let r = 0; r < reset.length; r++) {
                reset[r].innerText = "";
            }
        }    
        
    }

    render() {
        return html`
        <div class="container">
            <main>
                <h3>Reporte de horas consolidadas</h3>
                <section>
                    <article>
                        <div>
                            <label>Empleado</label>
                            <select name="employees" id="employees" @change="${this.selected}">
                                <option value="#"></option>
                                ${
                                    this.employees.map(employee => {
                                        return html`
                                            <option value="${employee}">${employee}</option>
                                        `;
                                    })
                                   
                                }                                  
                            </select> 
                        </div>
                        <div>
                            <label>Proyecto</label>
                            <select name="proyects" id="proyects" @change="${this.selected}">
                                <option value="#"></option>
                                ${
                                    (this.proyects != null) ?
                                        this.proyects.map(proyect => {
                                            return html`
                                                <option value="${proyect}">${proyect}</option>
                                            `;
                                        }) : nothing
                                } 
                            </select> 
                        </div>
                        <div>
                            <label>Año</label>
                            <select name="years" id="years" @change="${this.selected}">
                                <option value="#"></option>
                                ${
                                    this.years.map(year => {
                                        return html`
                                            <option value="${year}">${year}</option>
                                        `;
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <button @click="${ this.generateReport }" id="generateReport">Generar reporte</button>
                        </div>
                    </article>
                    
                    <article>
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
                                ${
                                    this.months.map(month => {
                                        return html`
                                            <tr id="${month}">
                                                <td>${month}</td>
                                                <td class="data"></td>
                                                <td class="data"></td>
                                                <td class="data"></td>
                                                <td class="data"></td>
                                                <td class="data"></td>
                                                <td class="data"></td>
                                            </tr>
                                        `;
                                    })
                                }
                            </tbody>
                        </table>
                    </article>
                </section>
            </main>
        </div>
        `;
    }

}

customElements.define('hours-component', HoursComponent);
