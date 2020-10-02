import { LitElement, html, css } from 'lit-element';

export class InputsSolicitud extends LitElement {
  static get styles() {
    return [
      css`
            #btnAgregar {
                border: 1px solid #0b8882;
                border-radius: 3px;
                background-color: #0b8882;
                padding: 6px 10px 6px 10px;
                color: white;
                margin-left: 15px;
                box-shadow: 3px 3px black;
                font-family: cursive;
            }
            #btnAgregar:hover {
                background-color: #68b8bf;
                border: 1px solid #68b8bf;
                color: black;
                cursor: pointer;
            }
            #lblI, #lblF {
                font-family: cursive;
            }
            #fechaIni {
                margin-right: 25px;
            }
          `
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
    const iden = 0;
    const fechaHoy = d.getFullYear() + '-' + mes + '-' + dia;
    const event = new CustomEvent('my-event', {
      detail: {
        infoFI: inputFechaIni.value,
        infoFF: inputFechaFin.value,
        fHoy: fechaHoy,
        ide: iden
      }
    });
    this.dispatchEvent(event);
    inputFechaIni.value = '';
    inputFechaFin.value = '';
  }

  render() {
    return html`
          <label id="lblI">Fecha Inicio </label><input id="fechaIni" type="date">
          <label id="lblF">Fecha Fin </label><input id="fechaFin" type="date">
          <button id="btnAgregar" @click="${this.sendData}">Agregar</button>
        `;
  }
}
customElements.define('inputs-solicitud', InputsSolicitud);