import { LitElement, html } from 'lit-element';

class AprobacionTable extends LitElement {
  static get properties() {
    return {
      titulosTabla: { type: Array }
    };
  }

  constructor() {
    super();
    this.titulosTabla = ['Nombre del empleado', 'Fecha de Solicitud', 'Fecha Inicio', 'Fecha Fin', 'Estado de la solicitud', 'Fecha de estado'];
  }

  render() {
    return html`
        <h1>Solicitud de vacaciones</h1>
        `;
  }
}

window.customElements.define('aprobacion-table', AprobacionTable);
