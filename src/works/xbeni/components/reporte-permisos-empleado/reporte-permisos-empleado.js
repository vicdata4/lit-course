import { LitElement, html } from 'lit-element';
import { RpeStyles } from '../../archivos_comunes/ac_reporte-permisos-empleado/styles';

class BeniReportePermisosEmpleado extends LitElement {
  constructor() {
    super();
    this.tituloReporte = 'Reporte de permisos detallado';
  }

  static get properties() {
    return {
      tituloReporte: { type: String }
    };
  }

  static get styles() {
    return [
      RpeStyles
    ];
  }

  render() {
    return html`
        <h1>FUNCIONA</h1>
    `;
  }
}

customElements.define('reporte-permisos-empleado', BeniReportePermisosEmpleado);
