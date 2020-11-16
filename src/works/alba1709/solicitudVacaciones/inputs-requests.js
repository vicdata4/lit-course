import { LitElement, html } from 'lit-element';
import { dateToday } from './utils/functions';
import { viewStyles } from './utils/t-styles';

export class InputsRequests extends LitElement {
  static get styles() {
    return [viewStyles];
  }

  sendData() {
    const inputFechaIni = this.shadowRoot.querySelector('#fechaIni');
    const inputFechaFin = this.shadowRoot.querySelector('#fechaFin');

    const fechaHoy = dateToday(new Date()).dToday;
    const hora = dateToday(new Date()).hour;
    const event = new CustomEvent('my-event', {
      detail: {
        infoFI: inputFechaIni.value,
        infoFF: inputFechaFin.value,
        fHoy: fechaHoy,
        hActual: hora,
        status: 'Pendiente de aprobación',
        statusDate: fechaHoy,
      },
    });
    this.dispatchEvent(event);
    inputFechaIni.value = '';
    inputFechaFin.value = '';
  }

  render() {
    return html`
      <div id="inputs">
        <div id="inputStart">
          <label id="lblI">Fecha Inicio </label>
          <input id="fechaIni" type="date" min="${dateToday(new Date()).dTomorrow}" />
        </div>
        <div id="inputEnd"><label id="lblF">Fecha Fin </label><input id="fechaFin" type="date" /></div>
        <button id="btnAgregar" @click="${this.sendData}">AGREGAR</button>
      </div>
    `;
  }
}
customElements.define('inputs-requests', InputsRequests);
