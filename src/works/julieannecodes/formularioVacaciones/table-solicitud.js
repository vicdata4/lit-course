import { LitElement, html } from 'lit-element';
import { tableStyles } from '../../../utils/custom-styles';
import { dateFormatter, orderItems } from '../../../utils/functions';

class TableSolicitud extends LitElement {
  static get styles() {
    return [
      tableStyles
    ];
  }

  static get properties() {
    return {
      arraySolicitudes: { type: Array },
      titulosTabla: { type: Array },
      sortedArray: { type: Array },
      orderType: { type: Array },
      afterDelete: { type: Array }
    };
  }

  constructor() {
    super();
    this.arraySolicitudes = [];
    this.sortedArray = [];
    this.titulosTabla = ['Fecha de solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de Estado', 'Eliminar'];
    this.orderType = ['currentDate', 'fechaInicio', 'fechaFin'];
    this.afterDelete = [];
  }

  order(i) {
    this.sortedArray = orderItems(this.arraySolicitudes, this.orderType[i]);
    this.arraySolicitudes = [...this.sortedArray];
  }

  deleteDate(i) {
    this.arraySolicitudes.splice(i, 1);
    this.arraySolicitudes = [...this.arraySolicitudes];
    // this.arraySolicitudes = [...this.afterDelete];
    // console.log(this.arraySolicitudes);
    return this.arraySolicitudes;
  }

  tableL() {
    return html`
        <table>
                <tr>
                  ${this.titulosTabla.map((items, i) => html`
                  <th>${items}<button id="${i}" @click="${() => this.order(i)}">x</button></th>
                  `)}
                </tr>
                  ${this.arraySolicitudes.map((item, i) => html`
                    <tr id="${i}">
                    <td>${dateFormatter(item.currentDate).solicitudDate}</td>
                    <td>${dateFormatter(item.fechaInicio).tableDate}</td>
                    <td>${dateFormatter(item.fechaFin).tableDate}</td>
                    <td>${item.estado}</td>
                    <td>${item.statusDate}</td>
                    <td><button id="${i}" @click="${() => this.deleteDate(i)}">delete</button></td>
                    </tr>
                  `)}
              </table>
    `;
  }

  render() {
    return html`${this.arraySolicitudes.length === 0 ? html`<h3>No hay solicitudes de vacaciones aún</h3>` : this.tableL()}`;
  }
}
window.customElements.define('table-solicitud', TableSolicitud);
