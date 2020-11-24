import { LitElement, html } from 'lit-element';
import { formPeticion } from '../utils/costum-css.js';
import { dateFormatter } from '../utils/functions';
import { dataCandidato, dataCliente } from '../utils/constants.js';

class FormPetition extends LitElement {
  static get styles() {
    return [formPeticion];
  }

  static get properties() {
    return {
      message: { type: String, attribute: false },
      alertMessage: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.message = '';
    this.id = '';
    this.titulo = '';
    this.descripcion = '';
    this.fecha = new Date();
    this.cliente = '';
    this.candidato = '';
    this.publicado = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('set-petition', async (e) => {
      this.id = e.detail.id;
      this.titulo = e.detail.titulo;
      this.descripcion = e.detail.descripcion;
      this.fecha = e.detail.fecha;
      this.cliente = e.detail.cliente;
      this.candidato = e.detail.candidato;
      this.publicado = e.detail.publicar;
      await this.requestUpdate();
    });
  }

  addPetition() {
    const inputTitulo = this.shadowRoot.querySelector('#peticionTitulo');
    const inputDescripcion = this.shadowRoot.querySelector('#peticionDescripcion');
    const inputPublicar = this.shadowRoot.querySelector('#peticionPublicar');
    const inputCliente = this.shadowRoot.querySelector('#cliPet');
    const inputCandidato = this.shadowRoot.querySelector('#candiPet');
    const inputId = this.shadowRoot.querySelector('#petId');

    if (inputTitulo.value.length > 0 && inputDescripcion.value.length > 0) {
      const event = new CustomEvent('add-petition', {
        detail: {
          id: new Date().valueOf(),
          titulo: inputTitulo.value,
          descripcion: inputDescripcion.value,
          fecha: new Date(),
          cliente: inputCliente.value,
          candidato: inputCandidato.value,
          publicar: inputPublicar.checked,
        },
        bubbles: true,
        composed: true,
      });

      this.dispatchEvent(event);

      inputTitulo.value = '';
      inputDescripcion.value = '';
      inputPublicar.checked = false;
      inputCliente.value = '';
      inputCandidato.value = '';
      inputId.value = '';
      this.message = '';
    } else {
      this.alertMessage = true;
      this.message = '¡Título y Descripción no debe estar vacío!';
    }
  }

  deletePetition(id) {
    if (id === '') {
      this.alertMessage = true;
      this.message = '¡Seleciona una petición!';
    } else {
      const event = new CustomEvent('delete-petition', {
        detail: {
          id: id,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);

      const inputTitulo = this.shadowRoot.querySelector('#peticionTitulo');
      const inputDescripcion = this.shadowRoot.querySelector('#peticionDescripcion');
      const inputPublicar = this.shadowRoot.querySelector('#peticionPublicar');
      const inputCliente = this.shadowRoot.querySelector('#cliPet');
      const inputCandidato = this.shadowRoot.querySelector('#candiPet');
      const inputId = this.shadowRoot.querySelector('#petId');

      inputTitulo.value = '';
      inputDescripcion.value = '';
      inputPublicar.checked = false;
      inputCliente.value = '';
      inputCandidato.value = '';
      inputId.value = '';
      this.id = '';
    }
  }

  updatePetition(id) {
    if (id === '') {
      this.alertMessage = true;
      this.message = '¡Seleciona una petición!';
    } else {
      const inputTitulo = this.shadowRoot.querySelector('#peticionTitulo');
      const inputDescripcion = this.shadowRoot.querySelector('#peticionDescripcion');
      const inputPublicar = this.shadowRoot.querySelector('#peticionPublicar');
      const inputCliente = this.shadowRoot.querySelector('#cliPet');
      const inputCandidato = this.shadowRoot.querySelector('#candiPet');
      const inputId = this.shadowRoot.querySelector('#petId');

      const event = new CustomEvent('update-petition', {
        detail: {
          id: id,
          titulo: inputTitulo.value,
          descripcion: inputDescripcion.value,
          fecha: new Date(),
          cliente: inputCliente.value,
          candidato: inputCandidato.value,
          publicar: inputPublicar.checked,
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);

      inputTitulo.value = '';
      inputDescripcion.value = '';
      inputPublicar.checked = false;
      inputCliente.value = '';
      inputCandidato.value = '';
      inputId.value = '';
      this.id = '';
    }
  }

  closeAlertMessage() {
    this.alertMessage = false;
  }

  render() {
    return html`
      <div class="form">
        <div class="heading">
          <h1>Editar la entrada</h1>
          <button id="addBtn" class="addBtn" @click="${() => this.addPetition()}">AÑADIR NUEVO</button>
        </div>
        <div class="petitionForm">
          <input type="hidden" id="petId" name="petId" value="${this.id}" />
          <div class="column-a1">
            <input
              id="peticionTitulo"
              name="peticionTitulo"
              placeholder="TÍTULO DE LA PETICIÓN"
              autocomplete="off"
              value="${this.titulo}"
            />
            <p type="Descripción de la petición" class="descrip"></p>
            <textarea id="peticionDescripcion" name="peticionDescripcion">${this.descripcion}</textarea>
            <br />
            <br />
            <div class="alertMessage ${this.alertMessage ? 'active' : ''}">
              <div class="message">
                <span class="closebtn" @click="${() => this.closeAlertMessage()}">&times;</span>${this.message}
              </div>
            </div>
          </div>
          <div class="column-a2">
            <div class="postPet">
              <p type="Publicar" class="postHead"></p>
              <p class="contentArea">Fecha de publicación: <b>${dateFormatter(this.fecha).dateHour}</b></p>
              <div class="postFoot">
                <div class="foot-left">
                  <a id="deleteBtn" class="deleteBtn" style="color: red" @click="${() => this.deletePetition(this.id)}"
                    >Mover a la papelera</a
                  >
                </div>
                <div class="foot-right">
                  <button id="updateBtn" class="updateBtn" @click="${() => this.updatePetition(this.id)}">
                    ACTUALIZAR
                  </button>
                </div>
              </div>
            </div>
            <div class="postPet">
              <p type="Cliente de la petición" class="postHead"></p>
              <div class="contentArea">
                <select name="cliente" id="cliPet">
                  <option value="${this.cliente}">${this.cliente}</option>
                  ${dataCliente.map((data) => html`<option value="${data.nombre}">${data.nombre}</option> `)}
                </select>
              </div>
            </div>
            <div class="postPet">
              <p type="Asignar candidato" class="postHead"></p>
              <div class="contentArea">
                <select name="candidato" id="candiPet">
                  <option value="${this.candidato}">${this.candidato}</option>
                  ${dataCandidato.map((data) => html`<option value="${data.nombre}">${data.nombre}</option> `)}
                </select>
              </div>
            </div>
            <div class="checkbox">
              ${this.publicado
                ? html`<input id="peticionPublicar" type="checkbox" checked />`
                : html`<input id="peticionPublicar" type="checkbox" />`}
              <label for="c1" style="font-weight: bold">PUBLICAR</label>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('form-petition', FormPetition);
