import { LitElement, html } from 'lit-element';
import { RpeStyles } from '../../archivos_comunes/ac_reportePe/styles';
import { loadEmpleadosRpe, getDatosReporteRpe } from '../../archivos_comunes/ac_reportePe/mocks';
import {
  svgUpArrow,
  svgRpeIconRight,
  svgRpeIconLeft,
  svgRpeOrdenarInt,
  svgXRpeOrderString,
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
                  <select name="empleadosRpe" id='id_select_empleados_rpe' class="selectRpe">
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
                  <input type="date" id="id_start_date_rpe" class="inputFechasRpe"/>
                </div>
              </div>

              <div class="divFlexRpe">
                <div class="divCamposRpe">
                  <label>Fecha de fin:</label>
                </div>
                <div class="divCamposDatos">
                  <input type="date" id="id_end_date_rpe" class="inputFechasRpe"/>
                </div>
              </div>
    
              <div>
                <div class="divErroresRpe" id='id_fater_final_errors_rpe'>
                  <div class="divErroresHeaderRpe">
                    <label>Para poder generar un reporte debes corregir los siguientes errores:</label>
                  </div>
                  <div class="divErroresContenidoRpe" id='id_final_errors_rpe'></div>
                </div>

                <div>
                  <button @click="${() =>
                    this.controlErroresRpe()}" id="button_subit_pe" class="buttonGenerarReporte">Generar reporte</button>
                </div>

                <div class="divExitoRpe" id='id_succes_rpe'></div>
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
      <div class="div_body_order_responsive">
        <div class="header_order_text">
          <span>Campos de ordenacion</span>
        </div>
        <div class="div_flex_100">
          <button @click="${() => this.orderList('dia')}" class="col_order_responsive col_dia">
            <div class="div_flex_order">
              <div>
                <span>Dia</span>
              </div>
              <div class="col_svg">${svgRpeOrdenarInt}</div>
              <div class="col_show_order">${svgUpArrow}</div>
            </div>
          </button>
          <button @click="${() => this.orderList('tipoPermiso')}" class="col_order_responsive col_tipoPermiso">
            <div class="div_flex_order">
              <div>
                <span>Tipo de permiso</span>
              </div>
              <div class="col_svg">${svgXRpeOrderString}</div>
              <div class="col_show_order">${svgUpArrow}</div>
            </div>
          </button>
        </div>
      </div>
      <table class="tableRpe">
        <thead>
          <tr>
            <th name="dia" @click="${() => this.orderList('dia')}" class="col dia">
              <div class="divFlexThRpe">
                <div>
                  <label>Día</label>
                </div>
                <button class="order"></button>
                  <div class="campoOrdenar">
                    ${svgUpArrow}
                    <div class="divTextoCampoOrdenar">
                      <label id='id_order_day_rpe' class="textoCampoOrdenar"></label>
                    </div>
                  </div>
                </button>
              </div>
            </th>

            <th name="tipoPermiso"
              @click="${() => this.orderList('tipoPermiso')}" class="col tipoPermiso">
              <div class="divFlexThRpe">
                <div>
                  <label>Tipo de permiso</label>
                </div>
                <button class="order"></button>
                  <div class="campoOrdenar">
                  ${svgUpArrow}
                    <div class="divTextoCampoOrdenar">
                      <label id='id_order_tipo_permiso_rpe' class="textoCampoOrdenar"></label>
                    </div>
                  </div>
                </button>
              </div>
            </th>

            <th>Horas</th>
          </tr>
        </thead>

        ${this.datosReporteRpe.slice(this.from, this.to).map(
          (item) => html`
            <tr>
              <td data-label="Día">
                <label>
                  ${this.dateToFormatRequired(item.dia.getFullYear(), item.dia.getMonth(), item.dia.getDate())}
                </label>
              </td>
              <td data-label="Tipo de permiso">
                <label> ${this.cambiarFormatoTipoPermiso(item.tipoPermiso)} </label>
              </td>
              <td data-label="Horas">
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
      <button class="step" id="step_prev" @click="${this.prev}">${svgRpeIconLeft}</button>
      ${this.stepper.map(
        (x, i) => html`
          ${i === 0
            ? html`<button id="${`_${i}`}" class="step active" @click="${() => this.showPage(i)}">${i + 1}</button>`
            : html`<button id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</button>`}
        `,
      )}
      <button class="step" id="step_next" @click="${this.next}">${svgRpeIconRight}</button>
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

  selectColumn(column) {
    this.shadowRoot.querySelectorAll('.col').forEach((col) => {
      col.classList.remove('selected');
      col.classList.remove('orderDown');
    });
    this.shadowRoot.querySelectorAll('.col_order_responsive').forEach((col) => {
      col.classList.remove('selected');
      col.classList.remove('orderDown');
    });

    this.shadowRoot.querySelector(`.col_${column}`).classList.add('selected');
    this.shadowRoot.querySelector(`.${column}`).classList.add('selected');
  }

  orderList(column) {
    this.selectColumn(column);

    const myList = [...this.datosReporteRpe];
    let orderedList;
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
      this.shadowRoot.querySelector(`.${column}`).classList.add('orderDown');
      this.shadowRoot.querySelector(`.col_${column}`).classList.add('orderDown');
    }

    this.datosReporteRpe = [...orderedList];
    this.showPage(0);
  }

  cambiarFormatoTipoPermiso(dato) {
    const resultado = dato[0].toUpperCase() + dato.slice(1);
    return resultado;
  }

  controlErroresRpe() {
    let erroresDatosReporte = '';
    let fechaInicio = '';
    let fechaFin = '';

    /* CONTROL DE QUE SE HAYA SELECCIONADO UN EMPLEADO */
    const empleado = this.shadowRoot.getElementById('id_select_empleados_rpe');
    const empleadoSeleccionado = parseInt(empleado.options[empleado.selectedIndex].value);
    const empleadoSeleccionadoId = empleado.options[empleado.selectedIndex].value;
    const empleadoSeleccionadoNombre = empleado.options[empleado.selectedIndex].text;
    if (empleadoSeleccionado === -1) {
      erroresDatosReporte += 'Debes seleccionar un empleado<br>';
    }

    const inputControl = (date, mensaje) => {
      date !== '' && !regexDateFormat.test(date) ? (erroresDatosReporte += mensaje) : nothing;
      date === '' ? (fechaInicio = null) : nothing;
    };

    const regexDateFormat = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
    fechaInicio = this.shadowRoot.getElementById('id_start_date_rpe').value;
    inputControl(fechaInicio, 'Debes introducir una fecha valida en [ Fecha de inicio ]<br>');

    fechaFin = this.shadowRoot.getElementById('id_end_date_rpe').value;
    fechaFin !== '' && !regexDateFormat.test(fechaFin)
      ? (erroresDatosReporte += 'Debes introducir una fecha valida en [ Fecha de fin ]<br>')
      : nothing;
    fechaFin === '' ? (fechaFin = null) : nothing;

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

    const errorContainer = this.shadowRoot.getElementById('id_fater_final_errors_rpe');
    const errorContainerContent = this.shadowRoot.getElementById('id_final_errors_rpe');
    const succesContainer = this.shadowRoot.getElementById('id_succes_rpe');

    if (erroresDatosReporte !== '') {
      errorContainer.style.display = 'block';
      errorContainerContent.innerHTML = erroresDatosReporte;
    } else {
      errorContainer.style.display = 'none';
      errorContainerContent.innerHTML = '';

      // SHOW INFO REPORTE TO GENERATE
      const informeDatosExitoGenerarRpe = `<b>Reporte generado:</b><br>Empleado: ${empleadoSeleccionadoNombre}<br>Fecha de inicio: ${fechaInicio}<br>Fecha de fin: ${fechaFin}`;
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
