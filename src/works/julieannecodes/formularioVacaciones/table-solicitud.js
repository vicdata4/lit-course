import { LitElement, html, css } from 'lit-element';
import { tableStyles } from '../utils/custom-styles';
import { nothing } from 'lit-html';
import { dateFormatter, orderItems } from '../utils/functions';

class TableSolicitud extends LitElement {
  static get styles() {
    return [
      tableStyles,
      css`
      .deleteB, .order {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }
      .order.rotated {transform: rotate(180deg);}
      .buttonWrap {
        width: 50%;
        margin: 0 auto;
      }`
    ];
  }

  static get properties() {
    return {
      arraySolicitudes: { type: Array },
      titulosTabla: { type: Array },
      sortedArray: { type: Array },
      orderType: { type: Array }
    };
  }

  constructor() {
    super();
    this.arraySolicitudes = [];
    this.sortedArray = [];
    this.titulosTabla = ['Fecha de solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de Estado', 'Eliminar'];
    this.orderType = ['currentDate', 'fechaInicio', 'fechaFin'];
  }

  order(e) {
    this.sortedArray = orderItems(this.arraySolicitudes, e.target.id);
    this.arraySolicitudes = [...this.sortedArray];
    if (e.target.value === 'asc') {
      e.target.value = 'desc';
      e.currentTarget.classList.add('rotated');
    } else {
      this.arraySolicitudes.reverse();
      e.target.value = 'asc';
      e.currentTarget.classList.remove('rotated');
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
                  <th>${items} ${items === 'Fecha de solicitud' ||
                      items === 'Fecha Inicio' ||
                      items === 'Fecha Fin' ? html`
                        <button class="order" id="${this.orderType[i]}" value="asc" @click="${this.order}">&#x25B2;</button>
                        ` : nothing}</th>
                  `)}
                </tr>
                  ${this.arraySolicitudes.map((item, i) => html`
                    <tr id="${i}">
                    <td>${dateFormatter(item.currentDate).solicitudDate}</td>
                    <td>${dateFormatter(item.fechaInicio).tableDate}</td>
                    <td>${dateFormatter(item.fechaFin).tableDate}</td>
                    <td>${item.estado}</td>
                    <td>${item.statusDate}</td>
                    <td><div class="buttonWrap"><button id="${i}" class="deleteB" @click="${() => this.deleteDate(i)}"><img src="/assets/images/trash2.png"></button></div></td>
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
