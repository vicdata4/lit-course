import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/common-header';
import '../components/tabla-solicitud';
import '../components/inputs-solicitud';

export class SolicitudVacaciones extends LitElement {
  static get styles() {
    return [
      commonStyles,
      css`
            h2 {
              font-family: cursive;
            }
          `
    ];
  }

  /**
     * Object describing property-related metadata used by Polymer features
     */
  static get properties() {
    return {
      infoSolicitud: { type: Array }
    };
  }

  constructor() {
    super();
    this.infoSolicitud = [];
  }

  addSolicitud(e) {
    if (e.detail.infoFI === '' || e.detail.infoFF === '') {
      alert('Por favor introduzca fechas de inicio y fin');
      return false;
    } else if (e.detail.infoFI <= e.detail.fHoy || e.detail.infoFF <= e.detail.infoFI) {
      alert('Introduzca fecha a partir de hoy, por favor');
      return false;
    } else {
      this.infoSolicitud = [...[e.detail], ...this.infoSolicitud];
    }
  }

  deleteSolicitud(e) {
    const array = this.infoSolicitud;
    array.splice(e.detail.index, 1);
    this.infoSolicitud = [...array];
  }

  render() {
    return html`
            <common-header></common-header>
            <section class="container">
            <h2>Solicitud de vacaciones</h2>
            <inputs-solicitud @my-event="${this.addSolicitud}"></inputs-solicitud>
            <tabla-solicitud .miTabla="${this.infoSolicitud}" @delete-event="${this.deleteSolicitud}"></tabla-solicitud>
            </section>
        `;
  }
}
customElements.define('solicitud-vacaciones-view', SolicitudVacaciones);