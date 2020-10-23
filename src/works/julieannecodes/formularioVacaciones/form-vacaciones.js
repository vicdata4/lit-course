import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { dateFormatter } from '../utils/functions';

class FormVacaciones extends LitElement {
  static get properties() {
    return {
      message: { type: String, attribute: false },
      minDate: { type: String },
    };
  }

  constructor() {
    super();
    this.message = '';
    this.minDate = dateFormatter(new Date()).inputDate;
  }

  dateTransformer(fi, ff) {
    const startDate = new Date(fi);
    const endDate = new Date(ff);

    return {
      fechaIni: startDate,
      fechaFin: endDate,
    };
  }

  dateValidator(fi, ff) {
    let aux = true;
    const fechaInicio = this.dateTransformer(fi, ff).fechaIni;
    const fechaFin = this.dateTransformer(fi, ff).fechaFin;

    fechaInicio < fechaFin ? aux : (aux = false);

    return aux;
  }

  sendData() {
    const fechaInicio = this.shadowRoot.querySelector('#inicio');
    const fechaFin = this.shadowRoot.querySelector('#fin');
    const currentDate = new Date();

    const obj = {
      currentDate: currentDate,
      fechaInicio: new Date(fechaInicio.value),
      fechaFin: new Date(fechaFin.value),
      estado: 'Pendiente de aprobación',
      statusDate: dateFormatter(currentDate).tableDate,
    };

    const event = new CustomEvent('send-dates', {
      detail: {
        fechas: obj,
      },
    });
    this.dispatchEvent(event);
    fechaInicio.value = '';
    fechaFin.value = '';
  }

  onSubmit() {
    const fechaInicio = this.shadowRoot.querySelector('#inicio');
    const fechaFin = this.shadowRoot.querySelector('#fin');

    if (!this.dateValidator(fechaInicio.value, fechaFin.value)) {
      this.message = 'Enter a valid date';
      return false;
    } else {
      this.sendData();
    }
    this.message = '';
  }

  render() {
    return html`
      <form onsubmit="return false">
        <label for="inicio">Fecha inicio</label>
        <input type="date" id="inicio" value="${this.minDate}" min="${this.minDate}" />
        <label for="fin">Fecha fin</label>
        <input type="date" id="fin" />
        <button type="submit" @click="${this.onSubmit}">Agregar</button>
      </form>
      ${this.message !== '' ? html`<div class="alert-msg">${this.message}</div>` : nothing}
    `;
  }
}
window.customElements.define('form-vacation', FormVacaciones);
