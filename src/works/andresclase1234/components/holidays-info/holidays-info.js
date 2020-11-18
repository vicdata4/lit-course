import { LitElement, html } from 'lit-element';
import { holidaysStyle } from '../../utils/new-styles';

class HolidaysInfo extends LitElement {
  static get styles() {
    return [holidaysStyle];
  }

  static get properties() {
    return {
      list: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.nElements = 0;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  async firstUpdated() {
    const nPages = Math.ceil(this.list.length / this.nElements);
    this.stepper = new Array(nPages).fill({});
    this.to = this.nElements;

    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach((row) => {
      if (row.id === `_${index}`) {
        row.classList.add('active');
      } else {
        row.classList.remove('active');
      }
    });
  }

  showPage(index) {
    this.index = index;
    this.from = this.nElements * index;
    this.to = this.from + this.nElements;
    this.setActiveStep(index);
  }

  next() {
    if (this.index < this.stepper.length - 1) {
      this.showPage(this.index + 1);
    }
  }

  prev() {
    if (this.index > 0) {
      this.showPage(this.index - 1);
    }
  }

  orderList(column) {
    const myList = [...this.list];

    const orderedList = myList.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });

    if (JSON.stringify(this.list) === JSON.stringify(orderedList)) {
      orderedList.reverse();
    }

    this.list = [...orderedList];
    this.showPage(0);
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <div class="step left prev" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map(
          (x, i) => html` <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div> `,
        )}
        <div class="step next" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  getFormattedDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  render() {
    return html`
      <div class="container">
        ${this.renderStepper()}
        <table>
          <tr>
            <th class="tableHeader">
              <button class="order" @click="${() => this.orderList('holidayFrom')}">
                Dia de inicio de vacaciones <span>&#9662;</span>
              </button>
            </th>
            <th class="tableHeader">
              <button class="order" @click="${() => this.orderList('holidayTo')}">
                Dia de fin de vacaciones <span>&#9662;</span>
              </button>
            </th>
            <td class="tableHeader">Dias tomados</td>
          </tr>
          ${this.list.slice(this.from, this.to).map(
            (item) => html`
              <tr>
                <td>${this.getFormattedDate(item.holidayFrom)}</td>
                <td>${this.getFormattedDate(item.holidayTo)}</td>

                <td>${(item.holidayTo.getTime() - item.holidayFrom.getTime()) / 86400000}</td>
              </tr>
            `,
          )}
        </table>
      </div>
    `;
  }
}
customElements.define('holidays-info', HolidaysInfo);
