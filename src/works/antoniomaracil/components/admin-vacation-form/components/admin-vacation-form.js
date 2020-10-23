/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { formatDate, orderedList } from '../../../utils/functions';
import './admin-vacation-list';

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
    
    
    table.vacations{
      width: 100%;
    }
    table.vacations thead, th {
      border: none;
      clip: rect(0, 0, 0, 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    /*
    table.vacations tr{
      border-bottom: 3px solid; 
    }
   
    table.vacations td {
      border-bottom: 1px solid #ddd;
      display: block;
      text-align: right;
      padding: 10px;
     }
    tr:nth-child(even) {
      background-color: #EEEEEE;
    }
    table.vacations td:before{
      content: attr(data-label);
      float: left;
      color: #273b47;
      font-weight: bold;
      font-size: 1em;
      padding: 1px 5px;
    }
    */
    select{
      width: 50%;
      padding: 5px 3px;
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

    @media (min-width: 768px) {
      .table-box{
        border-top: solid 2px black;
        border-bottom: solid 2px black;
        margin-top: 1.5rem;
        overflow-x: auto;
      }
      table.vacations {
        border-collapse: collapse;
        font-size: 0.8rem;
        empty-cells: hide;
        width: 100%;
      }
      tr:nth-child(even) {
        background-color: #EEEEEE;
      }
      table.vacations th{
        border-left: solid 2px black;
        border-right: solid 2px black;
        background-color: #CCCCCC;
        font-size: 0.7rem;
        text-align: left;
      }
      table.vacations td{
        border-right: solid 2px black;
        border-left: solid 2px black;
      }
      td{
        height: 2rem;
      }
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
    this.nElements = 3;
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
    this.stepper = [];
    this.arrOptions = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
  }

  async firstUpdated() {
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
          <table class="vacations">
            <tr>
              <th data-label="Nombre">
                <button class="order" @click="${() => this.orderList('name')}">Nombre del empleado
                  <span>&#9662;</span>
                </button>
              </th>
              <th data-label="Fecha de solicitud">
                <button class="order" @click="${() => this.orderList('applicationDate')}">Fecha de solicitud
                  <span>&#9662;</span>
                </button>
              </th>
              <th data-label="Fecha de inicio">
                <button class="order" @click="${() => this.orderList('startDate')}">Fecha de inicio 
                  <span>&#9662;</span>
                </button>
              </th>
              <th data-label="Fecha de fin">
                <button class="order" @click="${() => this.orderList('endDate')}">Fecha de fin 
                  <span>&#9662;</span>
                </button>
              </th>
              <th data-label="Estado">Estado de solicitud</th>
              <th data-label="Fecha de estado">Fecha de estado</th>
            </tr>
            ${this.list.slice(this.from, this.to).map(item => html`
            <tr>
              <td data-label="Nombre">${item.name}</td>
              <td data-label="Fecha de solicitud">${formatDate(item.applicationDate)}</td>
              <td data-label="Fecha de inicio">${formatDate(item.startDate)}</td>
              <td data-label="Fecha de fin">${formatDate(item.endDate)}</td>
              <td data-label="Estado">  
                <select id="sel-${item.id}"class="selectOptions">
                  <option value="0">Pendiente de aprobación</option>
                  <option value="1">Aprobado</option>
                  <option value="2">No aprobado</option>
                </select></td>
              <td data-label="Fecha de estado">${formatDate(item.statusDate)}</td>
            </tr>
            `)}
          </table>
        </div>
      </div>
    `;
  }
}
customElements.define('admin-vacation-form', AdminVacationForm);
