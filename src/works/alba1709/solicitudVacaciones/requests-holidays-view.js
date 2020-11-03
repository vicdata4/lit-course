/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../../../utils/custom-styles';
import './table-requests';
import './inputs-requests';

export class RequestsHolidays extends LitElement {
  static get styles() {
    return [
      commonStyles,
      css`
        h2 {
          font-family: 'Open Sans', sans-serif;
        }
      `,
    ];
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
    return {
      infoRequests: { type: Array },
    };
  }

  constructor() {
    super();
    this.infoRequests = [];
  }

  async addSolicitud(e) {
    // Fecha dentro de 1 año
    const fechaActual = e.detail.fHoy;
    const anoActual = parseInt(fechaActual.substr(0, 4));
    const twoYears = anoActual + 1;
    const dateTwoYears = fechaActual.replace(anoActual, twoYears);
    // Validación rango desde hoy hasta 1 año
    const rangoFechas =
      e.detail.infoFI <= e.detail.fHoy ||
      e.detail.infoFF <= e.detail.infoFI ||
      e.detail.infoFI > dateTwoYears ||
      e.detail.infoFF > dateTwoYears;
    // Validación fecha
    if (e.detail.infoFI === '' || e.detail.infoFF === '') {
      alert('Por favor introduzca fechas de inicio y fin');
      return false;
    } else if (rangoFechas) {
      alert(
        'El rango de fechas que debe introducir es a partir de hoy y hasta la fecha actual del año siguente (' +
          twoYears +
          ')',
      );
      return false;
    } else {
      this.infoRequests = [...[e.detail], ...this.infoRequests];

      const tabla = this.shadowRoot.querySelector('table-requests');
      await tabla.updateComplete;
      tabla.reloadTable();
    }
  }

  // Eliminar solicitud
  deleteSolicitud(e) {
    const array = this.infoRequests;
    array.splice(e.detail.index, 1);
    this.infoRequests = [...array];
  }

  render() {
    return html`
      <h2>Solicitud de vacaciones</h2>
      <inputs-requests @my-event="${this.addSolicitud}"></inputs-requests>
      <table-requests
        .tableRequests="${this.infoRequests}"
        .nElements="${10}"
        @delete-event="${this.deleteSolicitud}"
      ></table-requests>
    `;
  }
}
customElements.define('requests-holidays-view', RequestsHolidays);
