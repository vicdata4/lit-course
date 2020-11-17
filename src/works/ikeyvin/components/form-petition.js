import { LitElement, html } from 'lit-element';
import { formPeticion } from '../utils/costum-css.js';

class FormPetition extends LitElement {
  static get styles() {
    return [formPeticion];
  }

  static get properties() {
    return {
      listaPeticion: { type: Array },
      message: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.listaPeticion = [];
    this.message = '';
  }

  addPeticion() {
    let storedPeticion = JSON.parse(window.localStorage.getItem('list-peticion'));
    storedPeticion = storedPeticion === null ? [] : storedPeticion;

    const inputTitulo = this.shadowRoot.querySelector('#peticionTitulo');
    const inputDescripcion = this.shadowRoot.querySelector('#peticionDescripcion');
    const inputPublicar = this.shadowRoot.querySelector('#peticionPublicar');
    const inputCliente = this.shadowRoot.querySelector('#cliPet');
    const inputCandidato = this.shadowRoot.querySelector('#candiPet');

    if (inputTitulo.value.length > 0 && inputDescripcion.value.length > 0) {
      storedPeticion.push({
        id: new Date().valueOf(),
        titulo: inputTitulo.value,
        descripcion: inputDescripcion.value,
        fecha: new Date(),
        cliente: inputCliente.value,
        candidato: inputCandidato.value,
        publicar: inputPublicar.checked,
      });

      localStorage.setItem('list-peticion', JSON.stringify(storedPeticion));
      this.listaPeticion = [...[storedPeticion], ...this.listaPeticion];

      inputTitulo.value = '';
      inputDescripcion.value = '';
      inputPublicar.checked = false;
      inputCliente.value = '';
      inputCandidato.value = '';
      this.message = '';
    } else {
      this.message = 'TITULO y DESCRIPCIÓN no debe estar vacío!';
    }
  }

  render() {
    return html`
      <div class="form">
        <div class="heading">
          <h1>Editar la entrada</h1>
          <button @click="${() => this.addPeticion()}">AÑADIR NUEVO</button>
        </div>
        <div class="petitionForm">
          <div class="column-a1">
            <input id="peticionTitulo" name="peticionTitulo" placeholder="TÍTULO DE LA PETICIÓN" autocomplete="off" />
            <p type="Descripción de la petición" class="descrip"></p>
            <textarea id="peticionDescripcion" name="peticionDescripcion"></textarea>
            <br />
            <br />
            <p class="alertMessage">${this.message}</p>
          </div>
          <div class="column-a2">
            <div class="postPet">
              <p type="Publicar" class="postHead"></p>
              <p class="contentArea">Fecha de publicación:</p>
              <div class="postFoot">
                <div class="foot-left">
                  <a style="color: red">Mover a la papelera</a>
                </div>
                <div class="foot-right"><button class="updateBtn">ACTUALIZAR</button></div>
              </div>
            </div>
            <div class="postPet">
              <p type="Cliente de la petición" class="postHead"></p>
              <div class="contentArea">
                <select name="cliente" id="cliPet">
                  <option value=""></option>
                  <option value="Test 1">Test 1</option>
                </select>
              </div>
            </div>
            <div class="postPet">
              <p type="Asignar candidato" class="postHead"></p>
              <div class="contentArea">
                <select name="candidato" id="candiPet">
                  <option value=""></option>
                  <option value="Test 2">Test 2</option>
                </select>
              </div>
            </div>
            <div class="checkbox">
              <input id="peticionPublicar" type="checkbox" />
              <label for="c1" style="font-weight: bold">PUBLICAR</label>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('form-petition', FormPetition);
