import { LitElement, html } from 'lit-element';

class BeniReportePermisosEmpleado extends LitElement {
  constructor() {
    super();
  }

  static get properties() {
    return {
    };
  }

  static get styles() {
    return [
    ];
  }

  render() {
    return html`
        <h1>FUNCIONA</h1>
    `;
  }
}

customElements.define('reporte-permisos-empleado', BeniReportePermisosEmpleado);
