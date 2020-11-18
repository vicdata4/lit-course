/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
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
      options: { type: Array },
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
    this.options = [
      { value: 0, text: 'Pendiente de Aprobación' },
      { value: 1, text: 'Aprobado' },
      { value: 2, text: 'No Aprobado' },
    ];
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

  getEdition(index, id) {
    const original = this.list.find((x) => x._id === id);
    const row = this.shadowRoot.getElementById('row_' + index);
    const name = original.name;
    const applicationDate = original.applicationDate;
    const startDate = original.startDate;
    const endDate = original.endDate;
    const newStatus = parseInt(row.querySelector('select').value);
    const statusDate = original.statusDate;

    return {
      name,
      applicationDate,
      startDate,
      endDate,
      newStatus,
      statusDate,
    };
  }

  saveEdition(index, id) {
    const { name, applicationDate, startDate, endDate, newStatus, statusDate } = this.getEdition(index, id);

    const event = new CustomEvent('update-item', {
      detail: {
        body: {
          id,
          name: name,
          startDate: startDate,
          applicationDate: applicationDate,
          endDate: endDate,
          status: newStatus,
          statusDate: statusDate,
        },
        index,
      },
    });

    this.dispatchEvent(event);
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

  renderHeader() {
    return html`
      <tr>
        <th data-label="Nombre">
          <div class="order">
            <a @click="${() => this.orderList('name')}"> Nombre </a>
            <span>&#x25b4;</span>
          </div>
        </th>
        <th data-label="Fecha de solicitud">
          <div class="order">
            <a @click="${() => this.orderList('applicationDate')}"> Fecha solicitud </a>
            <span>&#x25b4;</span>
          </div>
        </th>
        <th data-label="Fecha de inicio">
          <div class="order">
            <a @click="${() => this.orderList('startDate')}"> Fecha inicio </a>
            <span>&#x25b4;</span>
          </div>
        </th>
        <th data-label="Fecha de fin">
          <div class="order">
            <a @click="${() => this.orderList('endDate')}"> Fecha fin </a>
            <span>&#x25b4;</span>
          </div>
        </th>
        <th data-label="Estado">Estado de solicitud</th>
        <th data-label="Fecha de estado">Fecha de estado</th>
      </tr>
    `;
  }

  render() {
    return html`
      <div class="container">
        <p>Solicitud de vacaciones:</p>
        ${this.renderStepper()}
        <div class="order-box">
          <a class="order" @click="${() => this.orderList('name')}">Nombre <span>&#x25b4;</span></a>
          <a class="order" @click="${() => this.orderList('applicationDate')}"> Solicitud <span>&#x25b4;</span> </a>
          <a class="order" @click="${() => this.orderList('startDate')}">Inicio <span>&#x25b4;</span></a>
          <a class="order" @click="${() => this.orderList('endDate')}">Fin <span>&#x25b4;</span></a>
        </div>
        <div class="table-box">
          <table class="vacations">
            <thead>
              ${this.renderHeader()}
            </thead>
            ${this.list.slice(this.from, this.to).map(
              (item, i) => html`
                <tr id="row_${i}">
                  <td class="name" data-label="Nombre">${item.name.toUpperCase()}</td>
                  <td class="grey-date" data-label="Fecha de solicitud">
                    ${dateFormatter(item.applicationDate).default}
                  </td>
                  <td class="black-date" data-label="Fecha de inicio">${dateFormatter(item.startDate).default}</td>
                  <td class="black-date" data-label="Fecha de fin">${dateFormatter(item.endDate).default}</td>
                  <td>
                    <select
                      someattr="${item.status}"
                      value="${item.status}"
                      id="sel-${item.id}"
                      class="selectOptions"
                      @change="${() => this.saveEdition(i, item._id)}"
                    >
                      ${this.options.map(
                        (option) => html`
                          <option
                            selected="${ifDefined(option.value === item.status ? 'true' : undefined)}"
                            value="${option.value}"
                          >
                            ${option.text}
                          </option>
                        `,
                      )}
                    </select>
                  </td>
                  <td class="grey-date" data-label="Fecha de estado">
                    ${dateFormatter(item.statusDate).default + ' ' + dateFormatter(item.statusDate).hour}
                  </td>
                </tr>
              `,
            )}
            <tfoot>
              ${this.renderHeader()}
            </tfoot>
          </table>
        </div>
        ${this.renderStepper()}
      </div>
    `;
  }
}
customElements.define('admin-vacation-form', AdminVacationForm);
