import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/solicitud-input';
import '../components/solicitud-list';
import '../components/common-header';

class SolicitudVacaciones extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      ListaDatos: { type: Array }
    };
  }

  constructor() {
    super();
    this.ListaDatos = [];
  }

  addArray(e) {
    this.ListaDatos = [...[e.detail.message], ...this.ListaDatos];
  }

  deleteArray(e) {
    const array = this.ListaDatos;
    array.splice(e.detail.index, 1);
    this.ListaDatos = [...array];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h1>Solicitud de Vacaciones</h1>
        <solicitud-input @my-event="${this.addArray}"></solicitud-input>
        <solicitud-list .list="${this.ListaDatos}" @delete-event="${this.deleteArray}"></solicitud-list>
      </section>
    `;
  }
}

window.customElements.define('solicitud-vacaciones', SolicitudVacaciones);
