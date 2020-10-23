import { LitElement, html } from 'lit-element';
import { mediaQueries, tableStyles } from '../utils/custom-styles';
import { nothing } from 'lit-html';
import { dateFormatter, orderItems } from '../utils/functions';

class RequestsTable extends LitElement {
  static get styles() {
    return [tableStyles, mediaQueries];
  }

  static get properties() {
    return {
      requestsList: { type: Array },
      tableTitles: { type: Array, attribute: false },
      sortedArray: { type: Array },
      orderType: { type: Array, attribute: false },
      fromT: { type: Number },
      toT: { type: Number },
      firstIndex: { type: Number },
    };
  }

  constructor() {
    super();
    this.requestsList = [];
    this.sortedArray = [];
    this.tableTitles = [
      'Fecha de solicitud',
      'Fecha Inicio',
      'Fecha Fin',
      'Estado de la solicitud',
      'Fecha de Estado',
      'Eliminar',
    ];
    this.orderType = ['currentDate', 'startDate', 'endDate'];
    this.firstIndex = 0;
    this.toT = 0;
    this.fromT = 0;
  }

  order(e) {
    this.sortedArray = orderItems(this.requestsList, e.target.id);
    this.requestsList = [...this.sortedArray];
    if (e.target.value === 'asc') {
      e.target.value = 'desc';
      e.currentTarget.classList.add('rotated');
    } else {
      this.requestsList = [...this.requestsList.reverse()];
      e.target.value = 'asc';
      e.currentTarget.classList.remove('rotated');
    }
  }

  deleteDate(i) {
    const event = new CustomEvent('delete-date', {
      detail: {
        index: i,
      },
    });
    this.dispatchEvent(event);
  }

  tableL() {
    return html`
      <div class="tableDiv">
        <table>
          <tr>
            ${this.tableTitles.map(
              (items, i) => html`<th>
                ${items}
                ${items === 'Fecha de solicitud' || items === 'Fecha Inicio' || items === 'Fecha Fin'
                  ? html` <button class="order" id="${this.orderType[i]}" value="asc" @click="${this.order}">
                      &#x25B2;
                    </button>`
                  : nothing}
              </th>`,
            )}
          </tr>
          ${this.requestsList.slice(this.fromT, this.toT).map(
            (item) => html`<tr>
              <td>${dateFormatter(item.currentDate).solicitudDate}</td>
              <td>${dateFormatter(item.startDate).tableDate}</td>
              <td>${dateFormatter(item.endDate).tableDate}</td>
              <td>${item.status}</td>
              <td>${dateFormatter(item.statusDate).tableDate}</td>
              <td>
                <div class="buttonWrap">
                  <button class="deleteB" @click="${() => this.deleteDate(item.id)}">
                    <img src="/assets/images/trash.png" />
                  </button>
                </div>
              </td>
            </tr>`,
          )}
        </table>
      </div>
    `;
  }

  render() {
    return html`${this.requestsList.length === 0 ? html`<h3>No hay solicitudes de vacaciones aún</h3>` : this.tableL()}`;
  }
}
window.customElements.define('requests-table', RequestsTable);
