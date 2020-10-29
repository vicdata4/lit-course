import { LitElement, html, css } from 'lit-element';

export class InputsSolicitud extends LitElement {
  static get styles() {
    return [
      css`
        #btnAgregar {
          border: 1px solid black;
          border-radius: 3px;
          padding: 6px 10px 6px 10px;
          color: black;
          background-color: white;
          margin-left: 15px;
          box-shadow: 3px 3px black;
          font-family: 'Open Sans', sans-serif;
        }
        #btnAgregar:hover {
          background-color: #e8e7e7;
          border: 1px solid black;
          color: black;
          cursor: pointer;
        }
        #lblI,
        #lblF {
          font-family: 'Open Sans', sans-serif;
          margin-right: 15px;
        }
        #fechaIni {
          margin-right: 25px;
        }

        #inputStart,
        #inputEnd {
          display: inline-flex;
          margin-right: 15px;
          margin-bottom: 15px;
        }

        #fechaIni:hover,
        #fechaFin:hover {
          background-color: #e8e7e7;
        }
        #inputs {
          display: inline;
        }
      `,
    ];
  }

  sendData() {
    const inputFechaIni = this.shadowRoot.querySelector('#fechaIni');
    const inputFechaFin = this.shadowRoot.querySelector('#fechaFin');
    const d = new Date();
    let mes = (d.getMonth() + 1).toString();
    if (mes < 10) {
      mes = '0' + mes;
    }
    let dia = d.getDate();
    if (dia < 10) {
      dia = '0' + dia;
    }
    const fechaHoy = d.getFullYear() + '-' + mes + '-' + dia;
    let hour = d.getHours();
    let minutes = d.getMinutes();
    if (hour < 10) {
      hour = '0' + hour;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    const hora = hour + ':' + minutes;
    const event = new CustomEvent('my-event', {
      detail: {
        infoFI: inputFechaIni.value,
        infoFF: inputFechaFin.value,
        fHoy: fechaHoy,
        hActual: hora,
      },
    });
    this.dispatchEvent(event);
    inputFechaIni.value = '';
    inputFechaFin.value = '';
  }

  render() {
    return html`
      <div id="inputs">
        <div id="inputStart"><label id="lblI">Fecha Inicio </label><input id="fechaIni" type="date" /></div>
        <div id="inputEnd"><label id="lblF">Fecha Fin </label><input id="fechaFin" type="date" /></div>
        <button id="btnAgregar" @click="${this.sendData}">Agregar</button>
      </div>
    `;
  }
}
customElements.define('inputs-solicitud', InputsSolicitud);
