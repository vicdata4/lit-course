import { LitElement, html } from 'lit-element';
import { viewHoliday } from './utils/styles-admin-holidays';
import { employeeRequest } from './utils/functions';

export class TableAdmin extends LitElement {
  static get styles() {
    return [
      viewHoliday
    ];
  }

  static get properties() {
    return {
      adminTable: { type: Array },
      nElements: { type: Number },
      requests: { type: Array },
      status: { type: Array },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.adminTable = [];
    this.nElements = 10;
    this.requests = [...employeeRequest];
    this.status = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  render() {
    return html`
        <table id="tableAdmin">
            <tr>
              <th>Nombre del empleado</th>
              <th>Fecha de solicitud</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado de la solicitud</th>
              <th>Fecha de estado</th>
            </tr>
            ${this.requests.map(item => html`
            <tr>
              <td class="first">${item.name}</td>
              <td>${item.dRequest}</td>
              <td>${item.dStart}</td>
              <td>${item.dEnd}</td>
              <td>
                <select name="estado" id="estadoSoli" @change="${this.selected}">
                  <option value="">Pendiente de aprobación</option> 
                  <option value="">Aprobado</option>                              
                </select> 
              </td>
              <td>${item.dStatus}</td>
            </tr>`)}

        </table>
        `;
  }
}
customElements.define('table-admin', TableAdmin);