import { LitElement, html } from 'lit-element';
import { tableStyles } from '../utils/custom-styles';
class AprobacionTable extends LitElement {
  static get styles() {
    return [tableStyles];
  }

  static get properties() {
    return {
      titulosTabla: { type: Array },
      solicitudes: { type: Array },
      estados: { type: Array }
    };
  }

  constructor() {
    super();
    this.titulosTabla = ['Nombre del empleado', 'Fecha de Solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de estado'];
    this.estados = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
    this.solicitudes = [
      { nombre: 'Juan Cuesta',
        fSolicitud: '2020/09/16',
        fInicio: '2020/12/15',
        fFin: '2020/01/12',
        estado: 'Pendiente de aprobación',
        fechaEstado: '2020/09/16'
      },
      {
        nombre: 'Mariano Rajoy',
        fSolicitud: '2020/08/15',
        fInicio: '2020/09/11',
        fFin: '2020/09/22',
        estado: 'Pendiente de aprobación',
        fechaEstado: '2020/08/17'
      },
      {
        nombre: 'Pedro Sánchez',
        fSolicitud: '2020/08/04',
        fInicio: '2020/10/15',
        fFin: '2020/12/12',
        estado: 'Pendiente de aprobación',
        fechaEstado: '2020/08/04'
      }

    ];
  }

  sendStatus(e) {
    // console.log(e);
  }

  render() {
    return html`
        <h1>Solicitud de vacaciones</h1>
        <table>
          <tr>
            ${this.titulosTabla.map((items, i) => html`
              <th>${items}</th>
            `)}
          </tr>
          ${this.solicitudes.map(item => html`
            <tr>
              <td>${item.nombre}</td>
              <td>${item.fSolicitud}</td>
              <td>${item.fInicio}</td>
              <td>${item.fFin}</td>
              <td><select>${this.estados.map(items => html`<option value=${items} @click="${() => this.sendStatus(items)}">${items}</option>`)}</select></td>
              <td>${item.fechaEstado}</td>
            </tr>
          `)}
        </table>
        `;
  }
}

window.customElements.define('aprobacion-table', AprobacionTable);
