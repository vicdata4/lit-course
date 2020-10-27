import { LitElement, html } from 'lit-element';
import { peticiones } from './peticiones';
import { listaPeticionesCSS } from './styles/peticionesCSS';
import '../jhumekes/descripcion-peticiones';

export class VisualizacionPeticiones extends LitElement {
  static get styles() {
    return [listaPeticionesCSS];
  }

  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();
    this.data = peticiones;
    // const params = new URLSearchParams(window.location.search);
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
            ${this.data.map((peticiones) => {
              return html`<tr>
                <td><a href="/descripcion-peticiones?id=${peticiones.id}">${peticiones.Titulo}</a></td>
                <td>${peticiones.FechaPublicacion}</td>
              </tr>`;
            })}
          </tbody>
        </table>
      </section>
    `;
  }
}
customElements.define('visualizacion-peticiones', VisualizacionPeticiones);
