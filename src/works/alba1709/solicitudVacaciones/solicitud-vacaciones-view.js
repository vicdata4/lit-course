import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../../../utils/custom-styles';
import './tabla-solicitud';
import './inputs-solicitud';

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
    const fechaActual = e.detail.fHoy;
    const anoActual = parseInt(fechaActual.substr(0, 4));
    const twoYears = anoActual + 1;
    const dateTwoYears = fechaActual.replace(anoActual, twoYears);
    if (e.detail.infoFI === '' || e.detail.infoFF === '') {
      alert('Por favor introduzca fechas de inicio y fin');
      return false;
    } else if (e.detail.infoFI <= e.detail.fHoy || e.detail.infoFF <= e.detail.infoFI || e.detail.infoFI > dateTwoYears || e.detail.infoFF > dateTwoYears) {
      alert('El rango de fechas que debe introducir es a partir de hoy y hasta la fecha actual del año siguente (' + twoYears + ')');
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
            <h2>Solicitud de vacaciones</h2>
            <inputs-solicitud @my-event="${this.addSolicitud}"></inputs-solicitud>
            <tabla-solicitud .miTabla="${this.infoSolicitud}" @delete-event="${this.deleteSolicitud}"></tabla-solicitud>
           
        `;
  }
}
customElements.define('solicitud-vacaciones-view', SolicitudVacaciones);