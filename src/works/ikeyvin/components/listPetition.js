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
  }

  showPetition(id) {
    this.listaPeticiones.map((peticion) => {
      if (peticion.id === id) {
        this.popupPetTitulo = peticion.titulo;
        this.popupPetDescripcion = peticion.descripcion;
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
                <h2>LISTA PETICIÓN</h2>
              </div>
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
        </section>
        
        <div id="myModal" class="modal ${this.popupOpen ? 'active' : ''}">
            <div class="modal-content">
                <span class="close" @click="${() => this.closePopupPetition()}">&times;</span>
                <h3 id="popupPetitionTitle">Petition</h3>
                <p>Titulo: </p>
                <input type="text" value="${this.popupPetTitulo}"></input>
                <br>
                <p>Descripcion: </p>
                <textarea>${this.popupPetDescripcion}</textarea>
            </div>
        </div>   
        `;
    }
  }
}

window.customElements.define('list-petition', ListPetition);
