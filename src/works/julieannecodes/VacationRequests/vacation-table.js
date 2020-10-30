import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import '../../../components/common-header';
import { mediaQueries } from '../utils/custom-styles';
import './holidays-form';
import './requests-table';
import './stepper';

class VacationTable extends LitElement {
  static get styles() {
    return [mediaQueries];
  }

  static get properties() {
    return {
      vacationData: { type: Array },
      errorMessage: { type: String },
      from: { type: Number },
      to: { type: Number },
      nEmployees: { type: Number },
    };
  }

  constructor() {
    super();
    this.vacationData = [];
    this.errorMessage = '';
    this.from = 0;
    this.nEmployees = 4;
    this.to = this.nEmployees;
  }

  addVacation(e) {
    const recived = e.detail.startDate;
    const dateExist = this.vacationData.find((x) => x.startDate.getTime() === recived.getTime());
    if (!dateExist) {
      this.vacationData = [e.detail, ...this.vacationData];
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Date already exists';
    }
  }

  deleteDate(e) {
    const arr = this.vacationData;
    const toRemove = this.vacationData.find((item) => item.id === e.detail);
    const index = this.vacationData.indexOf(toRemove);
    this.vacationData.splice(index, 1);
    this.vacationData = [...arr];

    if (this.from > 0 && this.vacationData.length === this.from) {
      this.from = this.from - this.nEmployees;
      this.to = this.to - this.nEmployees;
      const stepper = this.shadowRoot.querySelector('stepper-component');
      stepper.setActiveStep(this.from / this.nEmployees);
    }
  }

  getValues(e) {
    this.from = e.detail[0];
    this.to = e.detail[1];
  }

  render() {
    return html`
      <div class="container">
        <h1>Solicitud de vacaciones</h1>
        <holidays-form @send-dates="${this.addVacation}"></holidays-form>
        ${this.errorMessage !== '' ? html`<div class="alert-msg">${this.errorMessage}</div>` : nothing}
        ${this.vacationData.length >= this.nEmployees
          ? html`<stepper-component
              .listLength="${this.vacationData.length}"
              @interval-values="${this.getValues}"
            ></stepper-component>`
          : nothing}
        <requests-table
          .requestsList="${this.vacationData}"
          .fromT="${this.from}"
          .toT="${this.to}"
          @delete-date="${this.deleteDate}"
        ></requests-table>
      </div>
    `;
  }
}

window.customElements.define('vacation-table', VacationTable);
