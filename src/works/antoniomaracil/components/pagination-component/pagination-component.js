/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { formatDate, getDate } from './../../utils/functions';

class PaginationComponent extends LitElement {
  static get styles() {
    return css`
    .component-box{
      margin: 1rem;
      font-family: "Comic Sans MS", cursive, sans-serif;
    }
    .inp-controls{
      display:flex;
      align-items: center;
    }
    .inp-controls p{
      margin-right: 1rem;
    }
    .inp-controls input+p{
      margin-left: 1rem;
    }
    .inp-controls button{
      margin-right: 1.5rem;
      margin-left: 1.5rem;
    }
    .table-box{
      border-top: solid 2px black;
      border-bottom: solid 2px black;
      margin-top: 1.5rem;
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
      list: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      id: { type: Number, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.list = [];
    this.nElements = 3;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
    console.log(this.from);
    console.log(this.to);
  }

  async firstUpdated() {
    let nPages = Math.ceil(this.list.length / this.nElements);
    if (nPages === 0) { nPages = 1; }
    this.stepper = new Array(nPages).fill({});
    this.to = this.nElements;

    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  add() {
    this.actualDate = new Date();
    const start = getDate(this.shadowRoot.getElementById('start').value);
    const end = getDate(this.shadowRoot.getElementById('end').value);

    this.vacation = {
      id: this.id,
      applicationDate: formatDate(this.actualDate),
      startDate: formatDate(start),
      endDate: formatDate(end),
      status: 'Pendiente de aprobación',
      statusDate: formatDate(this.actualDate, true)
    };

    this.list.push(this.vacation);
    this.id++;
    this.firstUpdated();
    this.requestUpdate();
  }

  removeRow(e) {
    let index = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === e) {
        index = i;
        break;
      }
    }
    this.list.splice(index, 1);
    const nPages = Math.ceil(this.list.length / this.nElements);
    this.stepper = new Array(nPages).fill({});
    this.requestUpdate();
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
    const orderedList = this.list.slice(this.from, this.to).sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });

    if (JSON.stringify(this.list.slice(this.from, this.to)) === JSON.stringify((orderedList))) {
      orderedList.reverse();
    }

    const newList = [...this.list];
    let index = this.from;

    orderedList.forEach(orderedItem => {
      const element = this.list.find(item => item.id === orderedItem.id);
      newList[index] = element;
      index++;
    });

    this.list = [...newList];
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
      
        <div class="inp-box">
          <p>Solicitud de vacaciones:</p>
          <div class="inp-controls">
            <p>Fecha de inicio</p>
            <input id="start" type="date">
            <p>Fecha de final</p>
            <input id="end" type="date">
            <button @click="${this.add}">Agregar</button>
          </div>
        </div>
      
        ${this.renderStepper()}
        <div class="table-box">
          <table>
            <tr>
              <th><button class="order" @click="${() => this.orderList('applicationDate')}">Fecha de solicitud
                  <span>&#9662;</span></button></th>
              <th><button class="order" @click="${() => this.orderList('startDate')}">Fecha de inicio
                  <span>&#9662;</span></button></th>
              <th><button class="order" @click="${() => this.orderList('endDate')}">Fecha de fin <span>&#9662;</span></button>
              </th>
              <th>Estado de solicitud</th>
              <th>Fecha de solicitud</th>
              <th>Eliminar</th>
            </tr>
            ${this.list.slice(this.from, this.to).map(item => html`
            <tr>
              <td>${item.applicationDate}</td>
              <td>${item.startDate}</td>
              <td>${item.endDate}</td>
              <td>${item.status}</td>
              <td>${item.statusDate}</td>
              <td><button @click="${() => this.removeRow(item.id)}">Eliminar</button></td>
            </tr>
            `)}
          </table>
        </div>
      </div>
    `;
  }
}

window.customElements.define('pagination-component', PaginationComponent);
