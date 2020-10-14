/* eslint-disable camelcase */
import { LitElement, html } from 'lit-element';
import { RpeStyles } from '../../archivos_comunes/ac_reporte-permisos-empleado/styles';
import { loadEmpleadosRpe } from '../../archivos_comunes/ac_reporte-permisos-empleado/mocks';
import { CONSTANTS_RPE } from '../../archivos_comunes/ac_reporte-permisos-empleado/constantes';

class BeniReportePermisosEmpleado extends LitElement {
  constructor() {
    super();
    this.tituloReporte = 'Reporte de permisos detallado';
    this.empleadosRpe = loadEmpleadosRpe();
  }

  static get properties() {
    return {
      tituloReporte: { type: String },
      empleadosRpe: { type: Object }
    };
  }

  static get styles() {
    return [
      RpeStyles
    ];
  }

  render() {
    return html`
      <div class="div_body_hceap">
        <div class="div_body_control_hceap">
          <div class="div_header_control_hceap">
            <label>${this.titulo_reporte}</label>
          </div>
    
          <div class="div_main_control_hceap">
            <div>
              <div class="div_flex_hceap">
                <div class="div_campos_hceap">
                  <label>Empleado:</label>
                </div>
                <div class="div_campos_datos">
                  <select name="empleados_hceap" id="${CONSTANTS_RPE.idSelectEmpleadosRpe}" class="select_hceap">
                    <option value="-1">Selecciona un empleado</option>
                      ${Object.keys(this.empleadosRpe).map(item => html`
                        <option value="${this.empleadosRpe[item].id_empleado}">
                          ${this.empleadosRpe[item].nombre}
                        </option>
                      `)}
                  </select>
                </div>
              </div>
    
              <div class="div_flex_hceap">
                <div class="div_campos_hceap">
                  <label>Proyecto:</label>
                </div>
                <div class="div_campos_datos">
                  <select name="proyectos_hceap" id="" class="select_hceap">
                  </select>
                </div>
              </div>

              <div class="div_flex_hceap">
                  <div class="div_campos_hceap">
                      <label>Año:</label>
                  </div>
                  <div class="div_campos_datos">
                      <select id="" class="select_hceap">
                          <option value="-1">Selecciona un año</option>
                      </select>
                  </div>
              </div>
    
              <div>
                <div class="div_errores_hceap" id="">
                  <div class="div_errores_header_hceap">
                    <label>Para poder generar un reporte debes corregir los siguientes errores:</label>
                  </div>
                  <div class="div_errores_contenido_hceap" id=""></div>
                </div>

                <div>
                  <button @click="${() => this.controlErroresRpe()}" id="" class="button_generar_reporte">GENERAR REPORTE</button>
                </div>

                <div class="div_exito_hceap" id=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  controlErroresRpe() {
    var errores_datos_reporte = '';

    if (errores_datos_reporte !== '') {
    } else {
    }
  }
}

customElements.define('reporte-permisos-empleado', BeniReportePermisosEmpleado);
