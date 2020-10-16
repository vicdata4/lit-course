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
              font-family: "Comic Sans MS", cursive, sans-serif;;
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

  async addSolicitud(e) {
    // Fecha dentro de 1 año
    const fechaActual = e.detail.fHoy;
    const anoActual = parseInt(fechaActual.substr(0, 4));
    const twoYears = anoActual + 1;
    const dateTwoYears = fechaActual.replace(anoActual, twoYears);
    // Validación rango desde hoy hasta 1 año
    const rangoFechas = e.detail.infoFI <= e.detail.fHoy || e.detail.infoFF <= e.detail.infoFI || e.detail.infoFI > dateTwoYears || e.detail.infoFF > dateTwoYears;
    // Validación fecha
    if (e.detail.infoFI === '' || e.detail.infoFF === '') {
      alert('Por favor introduzca fechas de inicio y fin');
      return false;
    } else if (rangoFechas) {
      alert('El rango de fechas que debe introducir es a partir de hoy y hasta la fecha actual del año siguente (' + twoYears + ')');
      return false;
    } else {
      this.infoSolicitud = [...[e.detail], ...this.infoSolicitud];

      const tabla = this.shadowRoot.querySelector('tabla-solicitud');
      await tabla.updateComplete;
      tabla.reloadTable();
    }
  }

  // Eliminar solicitud
  deleteSolicitud(e) {
    const array = this.infoSolicitud;
    array.splice(e.detail.index, 1);
    this.infoSolicitud = [...array];
  }

  render() {
    return html`
            <h2>Solicitud de vacaciones</h2>
            <inputs-solicitud @my-event="${this.addSolicitud}"></inputs-solicitud>
            <tabla-solicitud .miTabla="${this.infoSolicitud}" .nElements="${10}" @delete-event="${this.deleteSolicitud}"></tabla-solicitud>
           
        `;
  }
}
customElements.define('solicitud-vacaciones-view', SolicitudVacaciones);