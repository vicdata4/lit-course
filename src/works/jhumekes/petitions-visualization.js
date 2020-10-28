import { LitElement, html } from 'lit-element';
import { petitions } from './petitions';
import { petitionsListCSS } from './styles/petitionsCSS';
// import './descripcion-peticiones';

export class PetitionsVisualization extends LitElement {
  static get styles() {
    return [petitionsListCSS];
  }

  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = petitions;
  }

  render() {
    return html`
      <section>
        <h3>Lista de peticiones</h3>
        <table>
          <thead>
            <tr>
              <td>Título</td>
              <td>Fecha de Publicación</td>
            </tr>
          </thead>
          <tbody>
            ${this.data.map((petitions) => {
              return html`<tr>
                <td><label>${petitions.Title}</label></td>
                <td>${petitions.PublishDate}</td>
              </tr>`;
            })}
          </tbody>
        </table>
      </section>
    `;
  }
}
customElements.define('petitions-visualization', PetitionsVisualization);
