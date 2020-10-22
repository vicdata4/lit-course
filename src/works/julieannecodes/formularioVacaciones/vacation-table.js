import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import '../../../components/common-header';
import { mediaQueries } from '../utils/custom-styles';
import { employeeList } from '../utils/employees';
import './form-vacaciones';
import './table-solicitud';
import './stepper';

class VacationTable extends LitElement {
  static get styles() {
    return [mediaQueries];
  }

  static get properties() {
    return {
      vacationData: { type: Array },
      errorMessage: { type: String },
      inArray: { type: Object },
      from: { type: Number },
      to: { type: Number },
      nEmployees: { type: Number }
    };
  }

  constructor() {
    super();
    this.vacationData = [...employeeList];
    this.errorMessage = '';
    this.inArray = new Date();
    this.from = 0;
    this.nEmployees = 5;
    this.to = this.nEmployees;
  }

  addVacation(e) {
    const recived = e.detail.dates.startDate;
    this.vacationData.length === 0 ? this.inArray : this.vacationData.map(
      item => { item.startDate.getTime() === recived.getTime() ? this.inArray = item.startDate : nothing; }
    );
    if (recived.getTime() === this.inArray.getTime()) {
      this.errorMessage = 'Date already exists';
    } else {
      this.vacationData = [e.detail.dates, ...this.vacationData];
      this.errorMessage = '';
    }
  }

  async deleteDate(e) {
    const arr = this.vacationData;
    arr.splice(e.detail.index, 1);
    this.vacationData = [...arr];

    if (this.from > 0 && this.vacationData.length === this.from) {
      this.from = this.from - this.nEmployees;
      this.to = this.to - this.nEmployees;
      const stepper = this.shadowRoot.querySelector('stepper-component');
      stepper.setActiveStep(this.from / this.nEmployees);
    }
  }

  getValues(e) {
    this.from = e.detail.values[0];
    this.to = e.detail.values[1];
  }

  render() {
    return html`
      <div class="container">
        <h1>Solicitud de vacaciones</h1>
        <form-vacation @send-dates="${this.addVacation}"></form-vacation>
        ${this.errorMessage !== '' ? html`<div class="alert-msg">${this.errorMessage}</div>` : nothing}

        ${this.vacationData.length >= this.nEmployees ? html`<stepper-component .listLength="${this.vacationData.length}" @interval-values="${this.getValues}"></stepper-component>` : nothing}
        <table-solicitud .requestsList="${this.vacationData}" .fromT="${this.from}" .toT="${this.to}" @delete-date="${this.deleteDate}"></table-solicitud>
      </div>  
    `;
  }
}

window.customElements.define('vacation-table', VacationTable);
