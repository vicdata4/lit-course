import { LitElement, html } from 'lit-element';
import { RpeStyles } from '../../archivos_comunes/ac_reportePe/styles';
import { loadEmpleadosRpe, getDatosReporteRpe } from '../../archivos_comunes/ac_reportePe/mocks';
import { CONSTANTS_RPE } from '../../archivos_comunes/ac_reportePe/constantes';
import {
  svgXBeniRpeOrderString,
  svgBeniRpeOrdenarInt,
  svgBeniRpeIconRight,
  svgBeniRpeIconLeft,
} from '../../archivos_comunes/ac_reportePe/svg_icons';
import { nothing } from 'lit-html';

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
      stepper: { type: Array, attribute: false },
    };
  }

  static get styles() {
    return [RpeStyles];
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
                      ${Object.keys(this.empleadosRpe).map(
                        (item) => html`
                          <option value="${this.empleadosRpe[item].id_empleado}">
                            ${this.empleadosRpe[item].nombre}
                          </option>
                        `,
                      )}
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
                  <button @click="${() =>
                    this.controlErroresRpe()}" id="" class="buttonGenerarReporte">GENERAR REPORTE</button>
                </div>

                <div class="divExitoRpe" id="${CONSTANTS_RPE.idExitoDatosRpe}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divBodyReporteGeneradoRpe">
${this.datosReporteRpe.length === 0 ? nothing : this.generarReporteRpe()}
      </div>
    </div>
    `;
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
                    <label id="${CONSTANTS_RPE.idOrdenarDiaRpe}" class="textoCampoOrdenar"></label>
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
                    <label id="${CONSTANTS_RPE.idOrdenarTipoPermisoRpe}" class="textoCampoOrdenar"></label>
                  </div>
                </div>
              </button>
            </div>
          </th>

          <th>Horas</th>
        </tr>

        ${this.datosReporteRpe.slice(this.from, this.to).map(
          (item) => html`
            <tr>
              <td>
                <label>
                  ${this.dateToFormatRequired(item.dia.getFullYear(), item.dia.getMonth(), item.dia.getDate())}
                </label>
              </td>
              <td>
                <label> ${this.cambiarFormatoTipoPermiso(item.tipoPermiso)} </label>
              </td>
              <td>
                <label> ${item.horas} </label>
              </td>
            </tr>
          `,
        )}
      </table>
      ${this.datosReporteRpe.length <= 10 ? nothing : html` <div class="divBodyStepper">${this.renderStepper()}</div> `}
    `;
  }

  dateToFormatRequired(year, month, day) {
    return `${day < 10 ? '0' : ''}${day}/${month + parseInt(1) < 10 ? '0' : ''}${month + parseInt(1)}/${year}`;
  }

  renderStepper() {
    return html`
      <button class="step" @click="${this.prev}">${svgBeniRpeIconLeft}</button>
      ${this.stepper.map(
        (x, i) => html`
          ${i === 0
            ? html`<button id="${`_${i}`}" class="step active" @click="${() => this.showPage(i)}">${i + 1}</button>`
            : html`<button id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</button>`}
        `,
      )}
      <button class="step" @click="${this.next}">${svgBeniRpeIconRight}</button>
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
    this.shadowRoot.querySelectorAll('.step').forEach((row) => {
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
    if (column === 'dia') {
      this.clearCamposOrdenar();
      this.shadowRoot.getElementById(CONSTANTS_RPE.idOrdenarDiaRpe).innerHTML = 'ASC';
    }
    if (column === 'tipoPermiso') {
      this.clearCamposOrdenar();
      this.shadowRoot.getElementById(CONSTANTS_RPE.idOrdenarTipoPermisoRpe).innerHTML = 'ASC';
    }

    const myList = [...this.datosReporteRpe];

    var orderedList;
    if (column !== 'dia') {
      orderedList = myList.sort((a, b) => {
        if (a[column].toLowerCase() < b[column].toLowerCase()) return -1;
        if (a[column].toLowerCase() > b[column].toLowerCase()) return 1;
        return 0;
      });
    } else {
      orderedList = myList.sort((a, b) => {
        if (a[column].getTime() < b[column].getTime()) return -1;
        if (a[column].getTime() > b[column].getTime()) return 1;
        return 0;
      });
    }

    if (JSON.stringify(this.datosReporteRpe) === JSON.stringify(orderedList)) {
      orderedList.reverse();
      if (column === 'dia') {
        this.clearCamposOrdenar();
        this.shadowRoot.getElementById(CONSTANTS_RPE.idOrdenarDiaRpe).innerHTML = 'DES';
      }
      if (column === 'tipoPermiso') {
        this.clearCamposOrdenar();
        this.shadowRoot.getElementById(CONSTANTS_RPE.idOrdenarTipoPermisoRpe).innerHTML = 'DES';
      }
    }

    this.datosReporteRpe = [...orderedList];
    this.showPage(0);
  }

  cambiarFormatoTipoPermiso(dato) {
    const resultado = dato[0].toUpperCase() + dato.slice(1);
    return resultado;
  }

  clearCamposOrdenar() {
    this.shadowRoot.getElementById(CONSTANTS_RPE.idOrdenarDiaRpe).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_RPE.idOrdenarTipoPermisoRpe).innerHTML = '';
  }

  controlErroresRpe() {
    var erroresDatosReporte = '';
    var fechaInicio = '';
    var fechaFin = '';

    /* CONTROL DE QUE SE HAYA SELECCIONADO UN EMPLEADO */
    var empleado = this.shadowRoot.getElementById(CONSTANTS_RPE.idSelectEmpleadosRpe);
    var empleadoSeleccionado = parseInt(empleado.options[empleado.selectedIndex].value);
    var empleadoSeleccionadoId = empleado.options[empleado.selectedIndex].value;
    var empleadoSeleccionadoNombre = empleado.options[empleado.selectedIndex].text;
    if (empleadoSeleccionado === -1) {
      erroresDatosReporte += 'Debes seleccionar un empleado<br>';
    }

    const inputControl = (date, mensaje) => {
      if (date !== '' && !regexDateFormat.test(date)) {
        erroresDatosReporte += mensaje;
      } else {
        fechaInicio = null;
      }
    };

    var regexDateFormat = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
    fechaInicio = this.shadowRoot.getElementById(CONSTANTS_RPE.idFechaInicioRpe).value;
    inputControl(fechaInicio, 'Debes introducir una fecha valida en [ Fecha de inicio ]<br>');

    fechaFin = this.shadowRoot.getElementById(CONSTANTS_RPE.idFechaFinRpe).value;
    if (fechaFin !== '') {
      if (!regexDateFormat.test(fechaFin)) {
        erroresDatosReporte += 'Debes introducir una fecha valida en [ Fecha de fin ]<br>';
      }
    } else {
      fechaFin = null;
    }

    if (fechaInicio !== null && fechaFin !== null) {
      const dateInicio = new Date(fechaInicio);
      const dateFin = new Date(fechaFin);
      if (dateInicio.getTime() > dateFin.getTime()) {
        erroresDatosReporte += 'La fecha de inicio no puede ser mayor que la fecha de fin<br>';
      }
      if (dateInicio.getTime() === dateFin.getTime()) {
        erroresDatosReporte += 'La fecha de inicio no puede ser igual a la fecha de fin<br>';
      }
    }

    const errorContainer = this.shadowRoot.getElementById(CONSTANTS_RPE.idPadreErroresFinalesRpe);
    const errorContainerContent = this.shadowRoot.getElementById(CONSTANTS_RPE.idErroresFinalesRpe);
    const succesContainer = this.shadowRoot.getElementById(CONSTANTS_RPE.idExitoDatosRpe);

    if (erroresDatosReporte !== '') {
      errorContainer.style.display = 'block';
      errorContainerContent.innerHTML = erroresDatosReporte;
    } else {
      errorContainer.style.display = 'none';
      errorContainerContent.innerHTML = '';

      // SHOW INFO REPORTE TO GENERATE
      var informeDatosExitoGenerarRpe = `<b>Reorte generado:</b><br>Empleado: ${empleadoSeleccionadoNombre}<br>Fecha de inicio: ${fechaInicio}<br>Fecha de fin: ${fechaFin}`;
      succesContainer.innerHTML = informeDatosExitoGenerarRpe;
      succesContainer.style.display = 'block';
      // AJAX REQUEST FOR DATES TO GENERATE
      this.datosReporteRpe = getDatosReporteRpe(empleadoSeleccionadoId, fechaInicio, fechaFin);
      const nPages = Math.ceil(this.datosReporteRpe.length / this.nElements);
      this.stepper = new Array(nPages).fill({});
      this.to = this.nElements;
    }
  }
}

customElements.define('reporte-pe', BeniReportePermisosEmpleado);
