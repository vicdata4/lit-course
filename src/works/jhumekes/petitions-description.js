import { LitElement, html } from 'lit-element';
import { petitions } from './petitions';
import { petitionsCSS } from './styles/petitionsCSS';
export class PetitionsDescription extends LitElement {
  static get styles() {
    return [petitionsCSS];
  }

  static get properties() {
    return {
      // id: { type: Number },
      petitions: { type: Object },
    };
  }

  constructor() {
    super();
    this.petitions = petitions[1];
  }

  render() {
    return html`
      <div id="divdesc">
        <section>
          <div id="title">
            <h2 id="h2titulo">Título:${this.petitions ? this.petitions.Title : ''}</h2>
            <h2 id="h2date">Fecha de publicacion: ${this.petitions ? this.petitions.PublishDate : ''}</h2>
          </div>
          <div>
            <h2>Descripción:</h2>
            <div id="reqContainer">
              <p>Requisitos:</p>
              <p>${this.petitions ? this.petitions.Descripcion[0] : ''}</p>
              <p>Lugar de trabajo:${this.petitions ? this.petitions.Descripcion[1] : ''}</p>
              <p>Actividades:</p>
              <p>${this.petitions ? this.petitions.Descripcion[2] : ''}</p>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define('petitions-description', PetitionsDescription);
