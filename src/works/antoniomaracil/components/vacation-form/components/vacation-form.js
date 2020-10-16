/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { formatDate, getDate, checkDate } from './../../../utils/functions';
import { vacationStyles } from './../../../utils/custom-styles';

class VacationForm extends LitElement {
  static get styles() {
    return vacationStyles;
  }

  static get properties() {
    return {
      list: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      table: { type: Array, attribute: false },
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
    this.id = 0;
    this.table = [];
  }

  async firstUpdated() {
    this.updateStepper();
  }

  async updateStepper() {
    let nPages = Math.ceil(this.list.length / this.nElements);
    if (nPages === 0) { nPages = 1; };
    this.stepper = new Array(nPages).fill({});

    await this.updateComplete;
    this.index = this.stepper.length - 1;
    this.setActiveStep(this.index);
    this.showPage(this.index);
  }

  add() {
    this.actualDate = new Date();
    const start = getDate(this.shadowRoot.getElementById('start').value);
    const end = getDate(this.shadowRoot.getElementById('end').value);

    if (checkDate(start, end)) {
      this.vacation = {
        id: this.id,
        startDate: start,
        applicationDate: this.actualDate,
        endDate: end,
        status: 'Pendiente de aprobación',
        statusDate: this.actualDate
      };

      this.list.push(this.vacation);
      this.id++;
      this.updateStepper();
      this.sendData();
    }
  }

  removeRow(id) {
    let index = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        index = i;
        break;
      }
    }
    const newList = [...this.list];
    newList.splice(index, 1);
    this.list = [...newList];
    this.updateStepper();
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
    const oldList = [...this.list];
    const orderedList = this.list.sort((a, b) => {
      if (a[column] > b[column]) {
        return 1;
      } else if (a[column] < b[column]) {
        return -1;
      }
      return 0;
    });
    if (JSON.stringify(oldList) === JSON.stringify((orderedList))) {
      orderedList.reverse();
    }
    this.list = [...orderedList];
    this.showPage(0);
  }

  sendData() {
    const event = new CustomEvent('update-array', {
      detail: {
        applications: this.list
      }
    });
    this.dispatchEvent(event);
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
              <td>${formatDate(item.applicationDate)}</td>
              <td>${formatDate(item.startDate)}</td>
              <td>${formatDate(item.endDate)}</td>
              <td>${item.status}</td>
              <td>${formatDate(item.statusDate)}</td>
              <td><button @click="${() => this.removeRow(item.id)}">Eliminar</button></td>
            </tr>
            `)}
          </table>
        </div>
      </div>
    `;
  }
}

window.customElements.define('vacation-form', VacationForm);
