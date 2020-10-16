/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { formatDate, orderedList } from '../../../utils/functions';

export class AdminVacationForm extends LitElement {
  static get styles() {
    return css`
    .component-box{
      margin: 1rem;
      font-family: "Comic Sans MS", cursive, sans-serif;
    }
    .order {
      background-color: transparent;
      font-family: 'Muli', sans-serif;
      font-weight: bold;
      font-size: 0.7rem;
      border: none;
      cursor: pointer;
    }
    .table-box{
      border-top: solid 2px black;
      border-bottom: solid 2px black;
      margin-top: 1.5rem;
      overflow-x: auto;
    }
    table {
      border-collapse: collapse;
      font-size: 0.8rem;
      empty-cells: hide;
      width: 100%;
    }
    tr:nth-child(even) {
      background-color: #EEEEEE;
    }
    table th{
      border-left: solid 2px black;
      border-right: solid 2px black;
      background-color: #CCCCCC;
      font-size: 0.7rem;
      text-align: left;
    }
    table td{
      border-right: solid 2px black;
      border-left: solid 2px black;
    }
    td{
      height: 2rem;
    }
    span span{
      cursor: pointer;
    }
    .table-cntr{
      display: flex;
      justify-content: space-between;
    }

    .stepper {
      margin: 10px 0;
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

    .stepper, .step {
      user-select: none;
    }
    `;
  }

  static get properties() {
    return {
      id: { type: Number },
      nElements: { type: Number },
      list: { type: Array },
      stepper: { type: Array },
      arrOptions: { type: Array },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.list = [];
    this.table = [];
    this.nElements = 3;
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
    this.stepper = [];
    this.arrOptions = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
  }

  async firstUpdated() {
    this.table = new Array(this.nElements).fill({});
    this.updateStepper();
  }

  async updateStepper() {
    let nPages = Math.ceil(this.list.length / this.nElements);
    if (nPages === 0) { nPages = 1; };
    this.stepper = new Array(nPages).fill({});

    await this.updateComplete;
    this.setActiveStep(this.index);
    this.showPage(this.index);
  }

  showPage(index) {
    this.index = index;
    this.from = this.nElements * index;
    this.to = this.from + this.nElements;
    this.setActiveStep(index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach(row => {
      if (row.id === `_${index}`) {
        row.classList.add('active');
      } else {
        row.classList.remove('active');
      }
    });
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

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'list') {
        this.updateStepper();
      }
    });
  }

  sendData() {
    const event = new CustomEvent('update-array', {
      detail: {
        applications: this.list
      }
    });
    this.dispatchEvent(event);
  }

  changeStatus(id) {
    const select = this.shadowRoot.getElementById('sel-' + id).value;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        if (select === '0') { this.list[i].status = 'Pendiente de aprobación'; };
        if (select === '1') { this.list[i].status = 'Aprobado'; };
        if (select === '2') { this.list[i].status = 'No aprobado'; };
        this.list[i].statusDate = formatDate(new Date(), true);
      }
    }
    // this.sendData();
  }

  orderList(column) {
    const oldList = [...this.list];

    const newList = orderedList(this.list, column);
    if (JSON.stringify(oldList) === JSON.stringify((newList))) {
      newList.reverse();
    }
    this.list = [...newList];
    this.showPage(0);
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <div class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map((x, i) => html`
        <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div>
        `)}
        <div class="step" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <p>Solicitud de vacaciones:</p>
        ${this.renderStepper()}
        <div class="table-box">
          <table>
            <tr>
              <th><button class="order" @click="${() => this.orderList('name')}">Nombre del empleado
                  <span>&#9662;</span></button></th>
              <th><button class="order" @click="${() => this.orderList('applicationDate')}">Fecha de solicitud
                  <span>&#9662;</span></button></th>
              <th><button class="order" @click="${() => this.orderList('startDate')}">Fecha de inicio <span>&#9662;</span></button>
              </th>
              <th><button class="order" @click="${() => this.orderList('endDate')}">Fecha de fin <span>&#9662;</span></button>
              </th>
              <th>Estado de solicitud</th>
              <th>Fecha de estado</th>
            </tr>
            ${this.list.slice(this.from, this.to).map(item => html`
            <tr>
              <td>${item.name}</td>
              <td>${formatDate(item.applicationDate)}</td>
              <td>${formatDate(item.startDate)}</td>
              <td>${formatDate(item.endDate)}</td>
              <td>  
                <select id="sel-${item.id}"class="selectOptions" @change="${() => this.changeStatus(item.id)}">
                  <option value="0">Pendiente de aprobación</option>
                  <option value="1">Aprobado</option>
                  <option value="2">No aprobado</option>
                </select></td>
              <td>${formatDate(item.statusDate)}</td>
            </tr>
            `)}
          </table>
        </div>
      </div>
    `;
  }
}
customElements.define('admin-vacation-form', AdminVacationForm);
