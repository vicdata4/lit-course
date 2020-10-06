import { LitElement, html } from 'lit-element';
import { tableStyles } from '../utils/custom-styles';
import { dateFormatter } from '../utils/functions';
class AprobacionTable extends LitElement {
  static get styles() {
    return [tableStyles];
  }

  static get properties() {
    return {
      titulosTabla: { type: Array },
      solicitudes: { type: Array },
      estados: { type: Array },
      currentDate: { type: String },
      orderValue: { type: String }
    };
  }

  constructor() {
    super();
    this.titulosTabla = ['Nombre del empleado', 'Fecha de Solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de estado'];
    this.estados = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
    this.currentDate = new Date();
    this.orderValue = 'asc';
    this.solicitudes = [
      { nombre: 'Juan Cuesta',
        fSolicitud: new Date('2020/09/16'),
        fInicio: new Date('2020/12/15'),
        fFin: new Date('2020/01/12'),
        estado: 'Pendiente de aprobación',
        fechaEstado: new Date('2020/09/16')
      },
      {
        nombre: 'Mariano Rajoy',
        fSolicitud: new Date('2020/08/15'),
        fInicio: new Date('2020/09/11'),
        fFin: new Date('2020/09/22'),
        estado: 'Pendiente de aprobación',
        fechaEstado: new Date('2020/08/17')
      },
      {
        nombre: 'Pedro Sánchez',
        fSolicitud: new Date('2020/08/04'),
        fInicio: new Date('2020/10/15'),
        fFin: new Date('2020/12/12'),
        estado: 'Pendiente de aprobación',
        fechaEstado: new Date('2020/08/04')
      }

    ];
  }

  sendStatus(e) {
    const objId = e.target.id;
    const status = e.target.value;

    this.solicitudes[objId].estado = status;
    this.solicitudes[objId].fechaEstado = this.currentDate;
    this.solicitudes = [...this.solicitudes];
  }

  orderEmployees(i) {
    console.log(i);
  }

  async firstUpdated() {
    await new Promise((resolve) => setTimeout(resolve, 0));
    this.addEventListener('change', this.sendStatus);
  }

  render() {
    return html`
        <h1>Solicitud de vacaciones</h1>
        <table>
          <tr>
            ${this.titulosTabla.map((items, i) => html`
              <th>${items}<button id="${i}" value="asc" @click="${() => this.orderEmployees(i)}">x</button></th>
            `)}
          </tr>
          ${this.solicitudes.map((item, i) => html`
            <tr>
              <td>${item.nombre}</td>
              <td>${dateFormatter(item.fSolicitud).sCurrentDate}</td>
              <td>${dateFormatter(item.fInicio).sCurrentDate}</td>
              <td>${dateFormatter(item.fFin).sCurrentDate}</td>
              <td><select id="${i}" @change="${this.sendStatus}" >${this.estados.map(items => html`<option value=${items}>${items}</option>`)}</select></td>
              <td>${dateFormatter(item.fechaEstado).sCurrentDate}</td>
            </tr>
          `)}
        </table>
        `;
  }
}

window.customElements.define('aprobacion-table', AprobacionTable);
