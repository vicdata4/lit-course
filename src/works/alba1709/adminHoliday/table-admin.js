import { LitElement, html } from 'lit-element';
import { viewHoliday } from './utils/styles-admin-holidays';
import { employeeRequest, getFormatterDate } from './utils/functions';

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

  rotateButton(e) {
    const btn = e.currentTarget;

    if (!btn.classList.contains('rotate')) {
      btn.classList.add('rotate');
    } else {
      btn.classList.remove('rotate');
    }
  }

  render() {
    return html`
        <table id="tableAdmin">
            <tr>
              <th>
                Nombre del empleado
                <button class = "btnOrder" @click="${() => this.orderDate('infoFF')}">   
                  <button class = "btnOrder" @click="${this.rotateButton}">&#9662;</button>
                </button> 
            </th>
              <th>
                Fecha de solicitud
                <button class = "btnOrder" @click="${() => this.orderDate('infoFF')}">
                    <button class = "btnOrder" @click="${this.rotateButton}">&#9662;</button>
                </button>    
            </th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado de la solicitud</th>
              <th>Fecha de estado</th>
            </tr>
            ${this.requests.map(item => html`
            <tr>
              <td class="first">${item.name}</td>
              <td>${getFormatterDate(item.dRequest).defaultDate}</td>
              <td>${getFormatterDate(item.dStart).defaultDate}</td>
              <td>${getFormatterDate(item.dEnd).defaultDate}</td>
              <td>
                <select name="estado" id="estadoSoli" @change="${this.selected}">
                  <option value="">Pendiente de aprobación</option> 
                  <option value="">Aprobado</option>                              
                </select> 
              </td>
              <td>${getFormatterDate(item.dStatus).defaultDate}</td>
            </tr>`)}

        </table>
        `;
  }
}
customElements.define('table-admin', TableAdmin);