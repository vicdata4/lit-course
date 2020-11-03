import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import './form-petition';
import { tablePeticion, modalPopup } from '../utils/costum-css';

class ListPetition extends LitElement {
  static get styles() {
    return [tablePeticion, modalPopup];
  }

  static get properties() {
    return {
      listaPeticiones: { type: Array },
      popupOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.listaPeticiones = JSON.parse(window.localStorage.getItem('list-peticion'));
    this.popupOpen = false;
    this.popupPetTitulo = '';
    this.popupPetDescripcion = '';
    this.popupPetFecha = '';
  }

  showPetition(id) {
    this.listaPeticiones.map((peticion) => {
      if (peticion.id === id) {
        this.popupPetTitulo = peticion.titulo;
        this.popupPetDescripcion = peticion.descripcion;
        this.popupPetFecha = peticion.fecha;
        this.popupOpen = true;
      }
    });
  }

  closePopupPetition() {
    this.popupOpen = false;
  }

  render() {
    if (this.listaPeticiones !== null) {
      return html`
        <section class="listaPeticiones">
          <table class="table-container">
            <thead>
              <tr>
                <th><h1>TITULO</h1></th>
                <th><h1>FECHA</h1></th>
              </tr>
            </thead>
            <tbody>
              ${this.listaPeticiones.map(
                (peticion) =>
                  html` ${peticion.publicar
                    ? html`
                        <tr>
                          <td>
                            <a @click="${() => this.showPetition(peticion.id)}">${peticion.titulo}</a>
                          </td>
                          <td>${peticion.fecha}</td>
                        </tr>
                      `
                    : nothing}`,
              )}
            </tbody>
          </table>
        </section>

        <div id="myModal" class="modal ${this.popupOpen ? 'active' : ''}">
          <div class="modal-content">
            <div class="container">
              <span class="close" @click="${() => this.closePopupPetition()}">&times;</span>
              <div class="row">
                <div class="col-25">
                  <label for="titulo">TÍTULO</label>
                </div>
                <div class="col-75">
                  <input type="text" name="titulo" value="${this.popupPetTitulo}" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <label for="fecha">FECHA DE PUBLICACIÓN</label>
                </div>
                <div class="col-75">
                  <input type="text" name="fecha" value="${this.popupPetFecha}" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <label for="descripcion">DESCRIPCIÓN</label>
                </div>
                <div class="col-75">
                  <textarea name="descripcion" style="height:200px" readonly>${this.popupPetDescripcion}</textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
}

window.customElements.define('list-petition', ListPetition);
