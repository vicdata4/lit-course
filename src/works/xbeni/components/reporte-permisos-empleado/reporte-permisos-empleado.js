import { LitElement, html } from 'lit-element';
import { RpeStyles } from '../../archivos_comunes/ac_reporte-permisos-empleado/styles';
import { loadEmpleadosRpe, getDatosReporteRpe } from '../../archivos_comunes/ac_reporte-permisos-empleado/mocks';
import { CONSTANTS_RPE } from '../../archivos_comunes/ac_reporte-permisos-empleado/constantes';
import { svgXBeniRpeOrderString, svgBeniRpeOrdenarInt } from '../../archivos_comunes/ac_reporte-permisos-empleado/svg_icons';

class BeniReportePermisosEmpleado extends LitElement {
  constructor() {
    super();
    this.tituloReporte = 'Reporte de permisos detallado';
    this.empleadosRpe = loadEmpleadosRpe();
    this.datosReporteRpe = [];
    this.index = 0;
    this.from = 0;
    this.nElements = 10;
    this.stepper = [];
  }

  static get properties() {
    return {
      tituloReporte: { type: String },
      empleadosRpe: { type: Object },
      datosReporteRpe: { type: Array },
      controlGenerarReporte: { type: Boolean, Attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false }

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
  this.datosReporteRpe.length === 0
    ? html``
    : this.generarReporteRpe()
}
      </div>
    </div>
    `;
  }

  renderStepper() {
    return html`
        <div class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map((x, i) => html`
${i === 0
    ? html`<div id="${`_${i}`}" class="step active" @click="${() => this.showPage(i)}">${i + 1}</div>`
    : html`<div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div>`
}
        `)}
        <div class="step" @click="${this.next}">&#x25B7;</div>
    `;
  }

  next() {
    if (this.index < this.stepper.length - 1) {
      this.showPage(this.index + 1);
    }
  }

  showPage(index) {
    this.index = index;
    this.from = this.nElements * index;
    this.to = this.from + this.nElements;
    this.setActiveStep(index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach(row => {
      if (row.id === `_${index}`) {
        row.classList.add('active');
      } else {
        row.classList.remove('active');
      }
    });
  }

  prev() {
    if (this.index > 0) {
      this.showPage(this.index - 1);
    }
  }

  orderList(column) {
    const myList = [...this.datosReporteRpe];

    var orderedList;
    if (column !== 'dia') {
      orderedList = myList.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });
    } else {
      orderedList = myList.sort((a, b) => {
        // FORMATO FECHA RECIBIDA DD/MM/YYYY
        var arrayDatosFechaA = a[column].split('/');
        var dateA = new Date(parseInt(arrayDatosFechaA[2]), (parseInt(arrayDatosFechaA[1]) - parseInt(1)), parseInt(arrayDatosFechaA[0]));

        var arrayDatosFechaB = b[column].split('/');
        var dateB = new Date(parseInt(arrayDatosFechaB[2]), (parseInt(arrayDatosFechaB[1]) - parseInt(1)), parseInt(arrayDatosFechaB[0]));

        if (dateA.getTime() < dateB.getTime()) return -1;
        if (dateA.getTime() > dateB.getTime()) return 1;
        return 0;
      });
    }

    if (JSON.stringify(this.datosReporteRpe) === JSON.stringify((orderedList))) {
      orderedList.reverse();
    }

    this.datosReporteRpe = [...orderedList];
    this.showPage(0);
  }

  generarReporteRpe() {
    return html`
      <table class="tableRpe">
        <tr>
          <th name="dia">
            <div class="divFlexThRpe">
              <div>
                <label>Día</label>
              </div>
              <button class="order"></button>
                <div @click=${() => this.orderList('dia')} class="campoOrdenar">
                  ${svgBeniRpeOrdenarInt}
                  <div class="divTextoCampoOrdenar">                    
                    <label id="" class="textoCampoOrdenar"></label>
                  </div>
                </div>
              </button>
            </div>
          </th>

          <th name="tipoPermiso">
            <div class="divFlexThRpe">
              <div>
                  <label>Tipo de permiso</label>
              </div>
              <button class="order"></button>
                <div @click=${() => this.orderList('tipoPermiso')} class="campoOrdenar">
                  ${svgXBeniRpeOrderString}
                  <div class="divTextoCampoOrdenar">                    
                    <label id="" class="textoCampoOrdenar"></label>
                  </div>
                </div>
              </button>
            </div>
          </th>

          <th>Horas</th>
        </tr>

        ${this.datosReporteRpe.slice(this.from, this.to).map(item => html`
          <tr>
            <td>
                <label>
                    ${item.dia}
                </label>
            </td>
            <td>
                <label>
                    ${item.tipoPermiso}
                </label>
            </td>
            <td>
                <label>
                    ${item.horas}
                </label>
            </td>
          </tr>
        `)}
      </table>
      ${this.datosReporteRpe.length <= 10
    ? html``
    : html`
      <div class="divBodyStepper">
        ${this.renderStepper()}
      </div>
    `}
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
      const nPages = Math.ceil(this.datosReporteRpe.length / this.nElements);
      this.stepper = new Array(nPages).fill({});
      this.to = this.nElements;
    }
  }
}

customElements.define('reporte-permisos-empleado', BeniReportePermisosEmpleado);
