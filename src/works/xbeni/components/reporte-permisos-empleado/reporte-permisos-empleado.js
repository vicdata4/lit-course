import { LitElement, html } from 'lit-element';
import { RpeStyles } from '../../archivos_comunes/ac_reporte-permisos-empleado/styles';
import { loadEmpleadosRpe, getDatosReporteRpe } from '../../archivos_comunes/ac_reporte-permisos-empleado/mocks';
import { CONSTANTS_RPE } from '../../archivos_comunes/ac_reporte-permisos-empleado/constantes';

class BeniReportePermisosEmpleado extends LitElement {
  constructor() {
    super();
    this.tituloReporte = 'Reporte de permisos detallado';
    this.empleadosRpe = loadEmpleadosRpe();
    this.datosReporteRpe = null;
  }

  static get properties() {
    return {
      tituloReporte: { type: String },
      empleadosRpe: { type: Object },
      datosReporteRpe: { type: Object },
      controlGenerarReporte: { type: Boolean, Attribute: false }
    };
  }

  static get styles() {
    return [
      RpeStyles
    ];
  }

  render() {
    return html`
      <div class="divBodyRpe">
        <div class="divBodyControlRpe">
          <div class="divHeaderControlRpe">
            <label>${this.tituloReporte}</label>
          </div>
    
          <div class="divMainControlRpe">
            <div>
              <div class="divFlexRpe">
                <div class="divCamposRpe">
                  <label>Empleado:</label>
                </div>
                <div class="divCamposDatos">
                  <select name="empleadosRpe" id="${CONSTANTS_RPE.idSelectEmpleadosRpe}" class="selectRpe">
                    <option value="-1">Selecciona un empleado</option>
                      ${Object.keys(this.empleadosRpe).map(item => html`
                        <option value="${this.empleadosRpe[item].id_empleado}">
                          ${this.empleadosRpe[item].nombre}
                        </option>
                      `)}
                  </select>
                </div>
              </div>
    
              <div class="divFlexRpe">
                <div class="divCamposRpe">
                  <label>Fecha de inicio:</label>
                </div>
                <div class="divCamposDatos">
                  <input type="date" id="${CONSTANTS_RPE.idFechaInicioRpe}" class="inputFechasRpe"/>
                </div>
              </div>

              <div class="divFlexRpe">
                  <div class="divCamposRpe">
                      <label>Fecha de fin:</label>
                  </div>
                  <div class="divCamposDatos">
                      <input type="date" id="${CONSTANTS_RPE.idFechaFinRpe}" class="inputFechasRpe"/>
                  </div>
              </div>
    
              <div>
                <div class="divErroresRpe" id="${CONSTANTS_RPE.idPadreErroresFinalesRpe}">
                  <div class="divErroresHeaderRpe">
                    <label>Para poder generar un reporte debes corregir los siguientes errores:</label>
                  </div>
                  <div class="divErroresContenidoRpe" id="${CONSTANTS_RPE.idErroresFinalesRpe}"></div>
                </div>

                <div>
                  <button @click="${() => this.controlErroresRpe()}" id="" class="buttonGenerarReporte">GENERAR REPORTE</button>
                </div>

                <div class="divExitoRpe" id="${CONSTANTS_RPE.idExitoDatosRpe}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divBodyReporteGeneradoRpe">
${
  this.datosReporteRpe === null
    ? html``
    : this.generarReporteRpe()
}
      </div>
    </div>
    `;
  }

  generarReporteRpe() {
    return html`
      <table class="tableRpe">
        <tr>
          <th>Dia</th>
          <th>Tipo de permiso</th>
          <th>Horas</th>
        </tr>
        ${Object.keys(this.datosReporteRpe).map(item => html`
          <tr>
            <td>
                <label>
                    ${this.datosReporteRpe[item].dia}
                </label>
            </td>
            <td>
                <label>
                    ${this.datosReporteRpe[item].tipoPermiso}
                </label>
            </td>
            <td>
                <label>
                    ${this.datosReporteRpe[item].horas}
                </label>
            </td>
          </tr>
        `)}
      </table>
    `;
  }

  controlErroresRpe() {
    var erroresDatosReporte = '';

    /* CONTROL DE QUE SE HAYA SELECCIONADO UN EMPLEADO */
    var empleado = this.shadowRoot.getElementById(CONSTANTS_RPE.idSelectEmpleadosRpe);
    var empleadoSeleccionado = parseInt(empleado.options[empleado.selectedIndex].value);
    var empleadoSeleccionadoId = empleado.options[empleado.selectedIndex].value;
    var empleadoSeleccionadoNombre = empleado.options[empleado.selectedIndex].text;
    if (empleadoSeleccionado === -1) {
      erroresDatosReporte += 'Debes seleccionar un empleado<br>';
    }

    var regexDateFormat = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
    var fechaInicio = this.shadowRoot.getElementById(CONSTANTS_RPE.idFechaInicioRpe).value;
    if (!regexDateFormat.test(fechaInicio)) {
      erroresDatosReporte += 'Debes introducir una fecha valida en [ Fecha de inicio ]<br>';
    }
    var fechaFin = this.shadowRoot.getElementById(CONSTANTS_RPE.idFechaFinRpe).value;
    if (!regexDateFormat.test(fechaFin)) {
      erroresDatosReporte += 'Debes introducir una fecha valida en [ Fecha de fin ]<br>';
    }

    if (erroresDatosReporte !== '') {
      this.shadowRoot.getElementById(CONSTANTS_RPE.idPadreErroresFinalesRpe).style.display = 'block';
      this.shadowRoot.getElementById(CONSTANTS_RPE.idErroresFinalesRpe).innerHTML = erroresDatosReporte;
    } else {
      this.shadowRoot.getElementById(CONSTANTS_RPE.idPadreErroresFinalesRpe).style.display = 'none';
      this.shadowRoot.getElementById(CONSTANTS_RPE.idErroresFinalesRpe).innerHTML = '';

      var informeDatosExitoGenerarRpe = `<b>Reorte generado:</b><br>Empleado: ${empleadoSeleccionadoNombre}<br>Fecha de inicio: ${fechaInicio}<br>Fecha de fin: ${fechaFin}`;
      this.shadowRoot.getElementById(CONSTANTS_RPE.idExitoDatosRpe).innerHTML = informeDatosExitoGenerarRpe;
      this.shadowRoot.getElementById(CONSTANTS_RPE.idExitoDatosRpe).style.display = 'block';
      // AJAX REQUEST FOR DATES TO GENERATE
      this.datosReporteRpe = getDatosReporteRpe(empleadoSeleccionadoId, fechaInicio, fechaFin);
    }
  }
}

customElements.define('reporte-permisos-empleado', BeniReportePermisosEmpleado);
