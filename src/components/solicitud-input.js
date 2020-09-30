import { LitElement, html } from 'lit-element';

class SolicitudInput extends LitElement {
  sendData() {
    const inputValue = this.shadowRoot.querySelector('#message');
    const event = new CustomEvent('my-event', {
      detail: {
        message: inputValue.value
      }
    });
    this.dispatchEvent(event);
    inputValue.value = '';
  }

  render() {
    return html`
    <head>
        <!-- iconos: fontawesone -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
       <!-- Bootstrap CSS -->
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    </head>
    <div>
      <div class="contFechas">
        <label for="fechaInicio" >Fecha Inicio</label>
        <div class="exmp-wrp">
          <div class="btn-wrp">
            <input type="date" class="btn-clck" id="fechaIni" name="fechaIni" min='${this.anio}-${this.mes}-${this.dia}' max="${this.anio}-12-31" @blur="${this.calculaFin}" >
          </div>
          <button class="bton"><i class="far fa-calendar-alt fa-2x"></i></button>
        </div>
      </div>
      <div class="contFechas">
        <label for="fechaFin" >Fecha Fin</label>
        <div class="exmp-wrp">
          <div class="btn-wrp">
            <input type="date" class="btn-clck" id="fechaFin" @blur="${this.calculaDias}" >
          </div>
          <button class="bton"><i class="far fa-calendar-alt fa-2x"></i></button>
        </div>
      </div>
      <button id="guardar" class="btn btn-info" @click="${this.guardarDatos}" >Agregar</button>
    </div>`;
  }
}

window.customElements.define('solicitud-input', SolicitudInput);