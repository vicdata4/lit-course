import { LitElement, html, css } from 'lit-element';
import { tableStyles } from '../utils/custom-styles';
import { dateFormatter, orderItems } from '../utils/functions';

class TableSolicitud extends LitElement {
  static get styles() {
    return [
      tableStyles,
      css`
      td button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
      `
    ];
  }

  static get properties() {
    return {
      arraySolicitudes: { type: Array },
      titulosTabla: { type: Array },
      sortedArray: { type: Array },
      orderType: { type: Array },
      orderValue: { type: String }
    };
  }

  constructor() {
    super();
    this.arraySolicitudes = [];
    this.sortedArray = [];
    this.titulosTabla = ['Fecha de solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de Estado', 'Eliminar'];
    this.orderType = ['currentDate', 'fechaInicio', 'fechaFin'];
    this.afterDelete = [];
    this.orderValue = 'asc';
  }

  order(i) {
    this.sortedArray = orderItems(this.arraySolicitudes, this.orderType[i]);
    this.arraySolicitudes = [...this.sortedArray];
    if (this.orderValue === 'asc') {
      this.orderValue = 'desc';
    } else {
      this.arraySolicitudes.reverse();
      this.orderValue = 'asc';
    }
  }

  deleteDate(i) {
    const event = new CustomEvent('delete-date', {
      detail: {
        index: i
      }
    });
    this.dispatchEvent(event);
  }

  tableL() {
    return html`
        <table>
                <tr>
                  ${this.titulosTabla.map((items, i) => html`
                  <th>${items}<button id="${i}" value="${this.orderValue}" @click="${() => this.order(i)}">x</button></th>
                  `)}
                </tr>
                  ${this.arraySolicitudes.map((item, i) => html`
                    <tr id="${i}">
                    <td>${dateFormatter(item.currentDate).solicitudDate}</td>
                    <td>${dateFormatter(item.fechaInicio).tableDate}</td>
                    <td>${dateFormatter(item.fechaFin).tableDate}</td>
                    <td>${item.estado}</td>
                    <td>${item.statusDate}</td>
                    <td><button id="${i}" @click="${() => this.deleteDate(i)}"><img src="/assets/images/trash2.png"></button></td>
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
