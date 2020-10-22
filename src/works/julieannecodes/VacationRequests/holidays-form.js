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
      message: { type: String, attribute: false }
    };
  }

  constructor() {
    super();
    this.message = '';
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
      currentDate: currentDate,
      startDate: new Date(startDate.value),
      endDate: new Date(endDate.value),
      status: 'Pendiente de aprobación',
      statusDate: currentDate
    };

    const event = new CustomEvent('send-dates', {
      detail: {
        dates: obj
      }
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
      return false;
    } else { this.sendData(startDate, endDate); }
    this.message = '';
  }

  render() {
    return html`
    <form onsubmit="return false">
      <div class="formWrap">
        <div class="startWrap">
          <label for="start" class="startLabel">Fecha inicio</label>
          <input type="date" id="start" min="${dateFormatter(this.minDateInput(7)).inputDate}">
        </div>
        <div class="endWrap">
          <label for="end" class="endLabel">Fecha fin</label>
          <input type="date" id="end" min="${dateFormatter(this.minDateInput(8)).inputDate}">
        </div>
        <button type="submit" @click="${this.onSubmit}">Agregar</button>
      </div>  
    </form>
    ${this.message !== '' ? html`<div class="alert-msg">${this.message}</div>` : nothing}
    `;
  }
}
window.customElements.define('holidays-form', HolidaysForm);
