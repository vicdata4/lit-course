import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import './formPetition';
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
          <div class="container-table">
            <div class="table-title">
              <table class="table-fill">
                <thead>
                  <tr>
                    <th class="text-left">TITULO</th>
                    <th class="text-left">FECHA</th>
                  </tr>
                </thead>
                <tbody class="table-hover">
                  ${this.listaPeticiones.map(
                    (peticion) =>
                      html` ${peticion.publicar
                        ? html`
                            <tr>
                              <td class="text-left">
                                <a @click="${() => this.showPetition(peticion.id)}">${peticion.titulo}</a>
                              </td>
                              <td class="text-left">${peticion.fecha}</td>
                            </tr>
                          `
                        : nothing}`,
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div id="myModal" class="modal ${this.popupOpen ? 'active' : ''}">
          <div class="modal-content">
            <div class="modal-items">
              <span class="close" @click="${() => this.closePopupPetition()}">&times;</span>
              <br />
              <div class="modal-title">Título: ${this.popupPetTitulo}</div>
              <div class="modal-date">Fecha: ${this.popupPetFecha}</div>
              <br class="clearBoth" />
              <p>Descripcion:</p>
              <textarea readonly>${this.popupPetDescripcion}</textarea>
            </div>
          </div>
        </div>
      `;
    }
  }
}

window.customElements.define('list-petition', ListPetition);
