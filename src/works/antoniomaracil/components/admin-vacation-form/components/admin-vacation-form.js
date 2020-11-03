/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { adminVacationStyles } from '../../../utils/custom-styles';
import { dateFormatter, orderedList } from '../../../utils/functions';

export class AdminVacationForm extends LitElement {
  static get styles() {
    return [adminVacationStyles];
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
      to: { type: Number, attribute: false },
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
    if (nPages === 0) {
      nPages = 1;
    }
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
    this.shadowRoot.querySelectorAll('.step').forEach((row) => {
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
    if (JSON.stringify(oldList) === JSON.stringify(newList)) {
      newList.reverse();
    }
    this.list = [...newList];
    this.showPage(0);
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <div id="prev" class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map(
          (x, i) => html` <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div> `,
        )}
        <div id="next" class="step" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        <p>Solicitud de vacaciones:</p>
        ${this.renderStepper()}

        <div class="order-box">
          <a class="order" @click="${() => this.orderList('name')}">Nombre <span>&#x25B2;</span></a>
          <a class="order" @click="${() => this.orderList('applicationDate')}"> Solicitud <span>&#x25B2;</span> </a>
          <a class="order" @click="${() => this.orderList('startDate')}">Inicio <span>&#x25B2;</span></a>
          <a class="order" @click="${() => this.orderList('endDate')}">Fin <span>&#x25B2;</span></a>
        </div>

        <div class="table-box">
          <table class="vacations">
            <thead>
              <tr>
                <th data-label="Nombre">
                  <a class="order" @click="${() => this.orderList('name')}">
                    Nombre del empleado
                    <span>&#x25B2;</span>
                  </a>
                </th>
                <th data-label="Fecha de solicitud">
                  <a class="order" @click="${() => this.orderList('applicationDate')}">
                    Fecha de solicitud
                    <span>&#x25B2;</span>
                  </a>
                </th>
                <th data-label="Fecha de inicio">
                  <a class="order" @click="${() => this.orderList('startDate')}">
                    Fecha de inicio
                    <span>&#x25B2;</span>
                  </a>
                </th>
                <th data-label="Fecha de fin">
                  <a class="order" @click="${() => this.orderList('endDate')}">
                    Fecha de fin
                    <span>&#x25B2;</span>
                  </a>
                </th>
                <th data-label="Estado">Estado de solicitud</th>
                <th data-label="Fecha de estado">Fecha de estado</th>
              </tr>
            </thead>
            ${this.list.slice(this.from, this.to).map(
              (item) => html`
                <tr>
                  <td data-label="Nombre">${item.name}</td>
                  <td data-label="Fecha de solicitud">${dateFormatter(item.applicationDate).default}</td>
                  <td data-label="Fecha de inicio">${dateFormatter(item.startDate).default}</td>
                  <td data-label="Fecha de fin">${dateFormatter(item.endDate).default}</td>
                  <td data-label="Estado">
                    <select id="sel-${item.id}" class="selectOptions">
                      <option value="0">Pendiente de aprobación</option>
                      <option value="1">Aprobado</option>
                      <option value="2">No aprobado</option>
                    </select>
                  </td>
                  <td data-label="Fecha de estado">
                    ${dateFormatter(item.statusDate).default + ' ' + dateFormatter(item.statusDate).hour}
                  </td>
                </tr>
              `,
            )}
          </table>
        </div>
        ${this.renderStepper()}
      </div>
    `;
  }
}
customElements.define('admin-vacation-form', AdminVacationForm);
