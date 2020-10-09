import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import '../../../components/common-header';
import './form-vacaciones';
import './table-solicitud';

class VacationTable extends LitElement {
  static get properties() {
    return {
      vacationData: { type: Array },
      errorMessage: { type: String }
    };
  }

  constructor() {
    super();
    this.vacationData = [];
    this.errorMessage = '';
  }

  addVacation(e) {
    const recived = e.detail.fechas.fechaInicio;
    let inArray = new Date();
    this.vacationData.length === 0 ? inArray : this.vacationData.map(
      item => { item.fechaInicio.getTime() === recived.getTime() ? inArray = item.fechaInicio : nothing; }
    );
    if (recived.getTime() === inArray.getTime()) {
      this.errorMessage = 'Date already exists';
    } else {
      this.vacationData = [...[e.detail.fechas], ...this.vacationData];
      this.errorMessage = '';
    }
  }

  deleteDate(e) {
    const arr = this.vacationData;
    arr.splice(e.detail.index, 1);
    this.vacationData = [...arr];
  }

  render() {
    return html`
        <h1>Solicitud de vacaciones</h1>
        <form-vacation @send-dates="${this.addVacation}"></form-vacation>
        ${this.errorMessage !== '' ? html`<div class="alert-msg">${this.errorMessage}</div>` : nothing}
        <table-solicitud .arraySolicitudes="${this.vacationData}" @delete-date="${this.deleteDate}"></table-solicitud>
        `;
  }
}

window.customElements.define('vacation-table', VacationTable);
