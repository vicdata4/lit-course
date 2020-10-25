import { LitElement, html } from 'lit-element';
import { formPeticion } from '../utils/costum-css.js';

export default class FormPetition extends LitElement {
  static get styles() {
    return [formPeticion];
  }

  static get properties() {
    return {
      listaPeticion: { type: Array },
    };
  }

  constructor() {
    super();
    this.listaPeticion = [];
    this.addPeticion = this.addPeticion.bind(this);
  }

  addPeticion() {
    let storedPeticion = JSON.parse(window.localStorage.getItem('list-peticion'));
    storedPeticion = storedPeticion === null ? [] : storedPeticion;

    const inputTitulo = this.shadowRoot.querySelector('#peticionTitulo');
    const inputDescripcion = this.shadowRoot.querySelector('#peticionDescripcion');
    const inputPublicar = this.shadowRoot.querySelector('#peticionPublicar');
    const fechaPublicacion = new Date();

    if (inputTitulo.value.length > 0 && inputDescripcion.value.length > 0) {
      storedPeticion.push({
        id: new Date().valueOf(),
        titulo: inputTitulo.value,
        descripcion: inputDescripcion.value,
        fecha:
          fechaPublicacion.getDate() + '/' + (fechaPublicacion.getMonth() + 1) + '/' + fechaPublicacion.getFullYear(),
        publicar: inputPublicar.checked,
      });

      localStorage.setItem('list-peticion', JSON.stringify(storedPeticion));
      this.listaPeticion = [...[storedPeticion], ...this.listaPeticion];

      this.shadowRoot.querySelector('#peticionTitulo').value = '';
      this.shadowRoot.querySelector('#peticionDescripcion').value = '';
    }
  }

  render() {
    return html`
        <div class="form">
          <h2>ENVIAR PETICIÓN</h2>
          <p type="TITULO:"><input id="peticionTitulo" name="peticionTitulo" placeholder="Escribe el titulo.."></input></p>
          <p type="DESCRIPCIÓN:"><textarea id="peticionDescripcion" name="peticionDescripcion" placeholder="Escribe la descripción.."></textarea></p>
          <input id="peticionPublicar" type="checkbox">
          <label for="c1">PUBLICAR</label>
          <button @click="${() => this.addPeticion()}">ENVIAR</button>
        </div>
      `;
  }
}

window.customElements.define('form-petition', FormPetition);
