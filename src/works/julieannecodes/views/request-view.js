import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { addRequest, deleteRequest, getRequests } from '../utils/api/api-request';
import { mediaQueries } from '../utils/custom-styles';
import '../components/VacationRequests/holidays-form';
import '../components/VacationRequests/requests-table';
import '../components/stepper';
class RequestView extends LitElement {
  static get styles() {
    return [
      mediaQueries,
      css`
        h1 {
          font-weight: 400;
        },`,
    ];
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

  async firstUpdated() {
    await this.getData();
  }

  async getData() {
    const request = await getRequests();
    if (!request.error) {
      this.vacationData = [...request.requests];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  async addRequest(e) {
    const request = await addRequest(e.detail);
    if (!request.error && !request.exist) {
      await this.getData();
    } else {
      this.errorMessage = 'Date already exists';
    }
  }

  async deleteDate(e) {
    const request = await deleteRequest(e.detail);
    if (!request.error) await this.getData();

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
    return html`<h1>Solictud de vacaciones</h1>
      <holidays-form @send-dates="${this.addRequest}"></holidays-form>
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
      ></requests-table>`;
  }
}

window.customElements.define('request-view', RequestView);
