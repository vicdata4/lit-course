import { LitElement, html } from 'lit-element';
import { anotherStyles, mediaQueries } from '../utils/custom-styles';
import { nothing } from 'lit-html';
import { dateFormatter, orderItems } from '../utils/functions';

class RequestsTable extends LitElement {
  static get styles() {
    return [anotherStyles, mediaQueries];
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
      <h3>Ordenar por:</h3>
      <div class="buttonsWrap">
        ${this.tableTitles.map((items, i) =>
          items === 'Fecha de solicitud' || items === 'Fecha Inicio' || items === 'Fecha Fin'
            ? html`
                <div class="order">
                  ${items}
                  <button class="icon" id="${this.orderType[i]}" value="asc" @click="${this.order}">&#x25B2;</button>
                </div>
              `
            : nothing,
        )}
      </div>
      ${this.requestsList.slice(this.fromT, this.toT).map(
        (item, i) => html`
          <div id="${item.id}" class="dataRows">
            <details class="detailsWrap">
              <summary class="summaryWrap">
                <span>Inicio: </span>${dateFormatter(item.startDate).tableDate} <span> Fin: </span>${dateFormatter(
                  item.endDate,
                ).tableDate}
              </summary>
              <div class="contents">
                <div><span>${this.tableTitles[0]}:</span>${dateFormatter(item.applicationD).solicitudDate}</div>
                <div><span>${this.tableTitles[1]}:</span>${dateFormatter(item.startDate).tableDate}</div>
                <div><span>${this.tableTitles[2]}:</span>${dateFormatter(item.endDate).tableDate}</div>
                <div><span>${this.tableTitles[3]}:</span>${item.status}</div>
                <div><span>${this.tableTitles[4]}:</span>${dateFormatter(item.statusDate).tableDate}</div>
              </div>
              <div class="buttonWrap">
                <button id="${i}" class="deleteB" @click="${() => this.deleteDate(item.id)}">
                  <img src="/assets/images/trash.png" />
                </button>
              </div>
            </details>
          </div>
        `,
      )}
    `;
  }

  render() {
    return html`${this.requestsList.length === 0 ? html`<h3>No hay solicitudes de vacaciones aún</h3>` : this.tableL()}`;
  }
}
window.customElements.define('requests-table', RequestsTable);
