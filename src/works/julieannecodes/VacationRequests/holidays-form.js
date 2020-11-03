import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { mediaQueries, formStyles } from '../utils/custom-styles';
import { dateFormatter } from '../utils/functions';

class HolidaysForm extends LitElement {
  static get styles() {
    return [formStyles, mediaQueries];
  }

  static get properties() {
    return {
      message: { type: String, attribute: false },
      validated: { type: Boolean, attribute: false },
      id: { type: Number },
    };
  }

  constructor() {
    super();
    this.message = '';
    this.validated = false;
    this.id = 0;
  }

  minDateInput(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date;
  }

  dateValidator(fi, ff) {
    const startDate = new Date(fi);
    const endDate = new Date(ff);

    return startDate < endDate;
  }

  sendData(startDate, endDate) {
    const currentDate = new Date();
    const obj = {
      id: this.id,
      applicationD: currentDate,
      startDate: new Date(startDate.value),
      endDate: new Date(endDate.value),
      status: 'Pendiente de aprobación',
      statusDate: currentDate,
    };
    this.id += 1;
    const event = new CustomEvent('send-dates', {
      detail: obj,
    });
    this.dispatchEvent(event);
    startDate.value = '';
    endDate.value = '';
  }

  onSubmit() {
    const startDate = this.shadowRoot.querySelector('#start');
    const endDate = this.shadowRoot.querySelector('#end');

    if (!this.dateValidator(startDate.value, endDate.value)) {
      this.message = 'Enter a valid date';
      this.validated = false;
      return false;
    } else {
      this.validated = true;
      this.sendData(startDate, endDate);
    }
    this.message = '';
  }

  render() {
    return html`
      <form onsubmit="return false">
        <div class="formWrap">
          <div class="startWrap">
            <label for="start" class="startLabel">Fecha inicio</label>
            <input type="date" class="input" id="start" min="${dateFormatter(this.minDateInput(7)).inputDate}" />
          </div>
          <div class="endWrap">
            <label for="end" class="endLabel">Fecha fin</label>
            <input type="date" id="end" class="input" min="${dateFormatter(this.minDateInput(8)).inputDate}" />
          </div>
          <button type="submit" class="submitButton" @click="${this.onSubmit}">Agregar</button>
        </div>
      </form>
      ${this.message !== '' ? html`<div class="alert-msg">${this.message}</div>` : nothing}
    `;
  }
}
window.customElements.define('holidays-form', HolidaysForm);
