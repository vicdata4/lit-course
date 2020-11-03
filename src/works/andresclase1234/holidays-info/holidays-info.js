import { LitElement, html, css } from 'lit-element';

class HolidaysInfo extends LitElement {
  static get styles() {
    return css`
      table {
        border: 1px solid #e4e4e4;
        padding: 10px;
        margin-left: 5%;
        margin-right: 5%;
        width: 90%;
      }

      th {
        text-align: left;
      }

      .order {
        padding: 0;
        background-color: transparent;
        border: none;
        margin-bottom: 10px;
        cursor: pointer;
        text-align: left;
      }

      .stepper {
        margin: 10px 0;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
      }

      .stepper .step:hover {
        background-color: #f1f1f1;
      }

      .step {
        display: inline-block;
        padding: 5px;
        border: 1px solid #d8d7d7;
        width: 20px;
        height: auto;
        text-align: center;
        cursor: pointer;
      }

      .step.active {
        background-color: #535353 !important;
        color: white;
      }

      .step.left {
        transform: rotate(180deg);
      }

      .stepper,
      .step {
        user-select: none;
      }
    `;
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
            <th>
              <button class="order" @click="${() => this.orderList('holidayFrom')}">
                Dia de inicio de vacaciones <span>&#9662;</span>
              </button>
            </th>
            <th>
              <button class="order" @click="${() => this.orderList('holidayTo')}">
                Dia de fin de vacaciones <span>&#9662;</span>
              </button>
            </th>
            <td>Dias tomados</td>
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
