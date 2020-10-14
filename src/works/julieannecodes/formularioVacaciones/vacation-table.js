import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import '../../../components/common-header';
import './form-vacaciones';
import './table-solicitud';

class VacationTable extends LitElement {
  static get properties() {
    return {
      vacationData: { type: Array },
      errorMessage: { type: String },
      inArray: { type: Object }
    };
  }

  constructor() {
    super();
    this.vacationData = [];
    this.errorMessage = '';
    this.inArray = new Date();
  }

  addVacation(e) {
    const recived = e.detail.dates.startDate;
    this.vacationData.length === 0 ? this.inArray : this.vacationData.map(
      item => { item.startDate.getTime() === recived.getTime() ? this.inArray = item.startDate : nothing; }
    );
    if (recived.getTime() === this.inArray.getTime()) {
      this.errorMessage = 'Date already exists';
    } else {
      this.vacationData = [...[e.detail.dates], ...this.vacationData];
      this.errorMessage = '';
    }
  }

  deleteDate(e) {
    const arr = this.vacationData;
    arr.splice(e.detail.index, 1);
    this.vacationData = [...arr];
  }

  renderStepper() {
    return html`aaaaaa`;
  }

  render() {
    return html`
        <h1>Solicitud de vacaciones</h1>
        <form-vacation @send-dates="${this.addVacation}"></form-vacation>
        ${this.errorMessage !== '' ? html`<div class="alert-msg">${this.errorMessage}</div>` : nothing}
        ${this.vacationData.length >= 5 ? this.renderStepper() : nothing}
        <table-solicitud .requestsList="${this.vacationData}" @delete-date="${this.deleteDate}"></table-solicitud>
        `;
  }
}

window.customElements.define('vacation-table', VacationTable);
