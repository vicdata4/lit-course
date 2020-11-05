import { LitElement, html } from 'lit-element';
import { requestTableS, mediaQueries } from '../utils/custom-styles';
import { nothing } from 'lit-html';
import { material } from '../../../utils/fonts';
import { dateFormatter, orderItems } from '../utils/functions';

class RequestsTable extends LitElement {
  static get styles() {
    return [requestTableS, mediaQueries, material];
  }

  static get properties() {
    return {
      requestsList: { type: Array },
      tableTitles: { type: Array, attribute: false },
      sortedArray: { type: Array },
      orderType: { type: Array, attribute: false },
      fromT: { type: Number },
      toT: { type: Number },
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
    return this.requestsList;
  }

  deleteDate(id) {
    const event = new CustomEvent('delete-date', {
      detail: id,
    });
    this.dispatchEvent(event);
  }

  tableL() {
    return html`
      <div class="responsiveTable">
        <h3>Ordenar por:</h3>
        ${this.tableTitles.map((items, i) =>
          items === 'Fecha de solicitud' || items === 'Fecha Inicio' || items === 'Fecha Fin'
            ? html`
                <div class="order">
                  ${items}
                  <button class="icon material-icons" id="${this.orderType[i]}" value="asc" @click="${this.order}">
                    keyboard_arrow_up
                  </button>
                </div>
              `
            : nothing,
        )}
        ${this.requestsList.slice(this.fromT, this.toT).map(
          (item) => html`
            <div id="${item.id}" class="dataRows">
              <details class="detailsWrap">
                <summary class="summaryWrap">
                  <span>Inicio: </span>
                  <span>${dateFormatter(item.startDate).tableDate}</span>
                  <span> Fin:</span>
                  <span>${dateFormatter(item.endDate).tableDate}</span>
                  <span class="material-icons add-icon">add</span>
                </summary>
                <table class="mobileTable">
                  <tr>
                    <td>${this.tableTitles[0]}</td>
                    <td>${dateFormatter(item.applicationD).requestDate}</td>
                  </tr>
                  <tr>
                    <td>${this.tableTitles[1]}</td>
                    <td>${dateFormatter(item.startDate).tableDate}</td>
                  </tr>
                  <tr>
                    <td>${this.tableTitles[2]}</td>
                    <td>${dateFormatter(item.endDate).tableDate}</td>
                  </tr>
                  <tr>
                    <td>${this.tableTitles[3]}</td>
                    <td>${item.status}</td>
                  </tr>
                  <tr>
                    <td>${this.tableTitles[4]}</td>
                    <td>${dateFormatter(item.statusDate).tableDate}</td>
                  </tr>
                </table>
                <div class="buttonWrap">
                  <button class="deleteB" @click="${() => this.deleteDate(item.id)}">
                    <span class="material-icons">delete_outline</span>
                  </button>
                </div>
              </details>
            </div>
          `,
        )}
      </div>
      <table class="desktopTable">
        <tr>
          ${this.tableTitles.map(
            (items, i) => html`<th>
              ${items}
              ${items === 'Fecha de solicitud' || items === 'Fecha Inicio' || items === 'Fecha Fin'
                ? html` <button
                    class="icon material-icons"
                    id="${this.orderType[i]}"
                    value="asc"
                    @click="${this.order}"
                  >
                    keyboard_arrow_up
                  </button>`
                : nothing}
            </th>`,
          )}
        </tr>
        ${this.requestsList.slice(this.fromT, this.toT).map(
          (item, i) => html`<tr>
            <td>${dateFormatter(item.applicationD).requestDate}</td>
            <td>${dateFormatter(item.startDate).tableDate}</td>
            <td>${dateFormatter(item.endDate).tableDate}</td>
            <td>${item.status}</td>
            <td>${dateFormatter(item.statusDate).tableDate}</td>
            <td>
              <button id="${i}" class="deleteB" @click="${() => this.deleteDate(item.id)}">
                <span class="material-icons">delete_outline</span>
              </button>
            </td>
          </tr>`,
        )}
      </table>
    `;
  }

  render() {
    return html`${this.requestsList.length === 0 ? html`<h3>No hay solicitudes de vacaciones aún</h3>` : this.tableL()}`;
  }
}
window.customElements.define('requests-table', RequestsTable);
