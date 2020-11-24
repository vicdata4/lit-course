import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { dateFormatter } from '../utils/functions';
import './form-petition';
import { tablePeticion, modalPopup } from '../utils/costum-css';
import { getInfoPetitions } from '../utils/api/api-request.js';

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
    this.listaPeticiones = [];
    this.popupOpen = false;
    this.popupPetTitulo = '';
    this.popupPetDescripcion = '';
    this.popupPetFecha = '';
  }

  async firstUpdated() {
    await this.getList();
  }

  async getList() {
    const request = await getInfoPetitions();
    if (!request.error) {
      this.listaPeticiones = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  showPetition(id) {
    this.listaPeticiones.map((peticion) => {
      if (peticion.id === id) {
        this.popupPetTitulo = peticion.titulo;
        this.popupPetDescripcion = peticion.descripcion;
        this.popupPetFecha = dateFormatter(peticion.fecha).default;
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
                <th>Título</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${this.listaPeticiones.map(
                (peticion) =>
                  html` ${peticion.publicar
                    ? html`
                        <tr>
                          <td>
                            <a @click="${() => this.showPetition(peticion.id)}">${peticion.titulo.toUpperCase()}</a>
                          </td>
                          <td class="date">${dateFormatter(peticion.fecha).default}</td>
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
              <div>
                <span class="close" @click="${() => this.closePopupPetition()}">&times;</span>
              </div>
              <div class="row">
                <div class="col-25">
                  <label for="titulo">Título</label>
                </div>
                <div class="col-75">
                  <input type="text" id="modalTitulo" name="titulo" value="${this.popupPetTitulo}" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <label for="fecha">Fecha de publicación</label>
                </div>
                <div class="col-75">
                  <input type="text" id="modalFecha" name="fecha" value="${this.popupPetFecha}" readonly />
                </div>
              </div>
              <div class="row">
                <div class="col-25">
                  <label for="descripcion">Descripción</label>
                </div>
                <div class="col-75">
                  <textarea id="modalDescripcion" name="descripcion" style="height:200px" readonly>
${this.popupPetDescripcion}
                  </textarea
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else {
      return html`<section class="listaPeticiones">
        <table class="table-container">
          <thead>
            <tr>
              <th>TITULO</th>
              <th>FECHA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Empty</td>
              <td>Empty</td>
            </tr>
          </tbody>
        </table>
      </section>`;
    }
  }
}

window.customElements.define('list-petition', ListPetition);
