/* eslint-disable camelcase */
import { LitElement, html } from 'lit-element';
import { item012ReporteHceapStyles } from '../../archivos_comunes/ac_item012/styles';
import { CONSTANTS_ITEM012 } from '../../archivos_comunes/ac_item012/constants';
import { getDatosReporteMesesHceap, cargarEmpleadosHceap, getProyectosAsigandosEmpleado } from '../../archivos_comunes/ac_item012/moks';

class BeniReporteHceap extends LitElement {
  static get properties() {
    return {
      titulo_reporte: { type: String },
      empleados_hceap: { type: Object },
      reporte_meses_hceap: { type: Object },
      control_generar_reporte: { type: Boolean, attribute: false }
    };
  }

  constructor() {
    super();
    this.titulo_reporte = 'Reporte de horas consolidadas';
    this.empleados_hceap = cargarEmpleadosHceap();
    this.reporte_meses_hceap = null;
    this.control_generar_reporte = false;
  }

  compareNumbers(a, b) {
    return a - b;
  }

  // EXTRAER DATOS BASE DATOS CON REPORTE EXITO
  set_reporte_meses_hceap(id_empleado, proyecto, year) {
    var array_reporte_hceap = getDatosReporteMesesHceap(id_empleado, proyecto, year);

    // HACER CAMBIOS NECESARIOS EN LOS DATOS RECIBIDOS - DARLE EL FORMATO DESEADO EN CASO DE QUE VENGA MAL
    for (var i = 0; i < array_reporte_hceap.length; i++) {
      array_reporte_hceap[i].mes = array_reporte_hceap[i].mes.replace(/ /g, '');
      array_reporte_hceap[i].mes = array_reporte_hceap[i].mes.toLowerCase();
      array_reporte_hceap[i].mes = array_reporte_hceap[i].mes[0].toUpperCase() + array_reporte_hceap[i].mes.slice(1);

      // AÑADIR UN NUEVO ELEMENTO AL ARRAY - VALUE
      // Darle un valor a cada mes para posteriormente poder ordenarlo en caso de que venga desordenado
      switch (array_reporte_hceap[i].mes) {
        case 'Enero':
          array_reporte_hceap[i].value = 0;
          break;
        case 'Febrero':
          array_reporte_hceap[i].value = 1;
          break;
        case 'Marzo':
          array_reporte_hceap[i].value = 2;
          break;
        case 'Abril':
          array_reporte_hceap[i].value = 3;
          break;
        case 'Mayo':
          array_reporte_hceap[i].value = 4;
          break;
        case 'Junio':
          array_reporte_hceap[i].value = 5;
          break;
        case 'Julio':
          array_reporte_hceap[i].value = 6;
          break;
        case 'Agosto':
          array_reporte_hceap[i].value = 7;
          break;
        case 'Septiembre':
          array_reporte_hceap[i].value = 8;
          break;
        case 'Octubre':
          array_reporte_hceap[i].value = 9;
          break;
        case 'Noviembre':
          array_reporte_hceap[i].value = 10;
          break;
        case 'Diciembre':
          array_reporte_hceap[i].value = 11;
          break;
        default:
          array_reporte_hceap[i].value = 12;
      }
    }

    // ORDENAR ARRAY OBJETOS RECIBIDO POR MESES EN CASO DE QUE ESTE DESORDENADO
    array_reporte_hceap.sort(function(a, b) {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });

    this.array_reporte_hceap = array_reporte_hceap;
  }

  static get styles() {
    return [
      item012ReporteHceapStyles
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
                                    <select @change=${() => this.cargar_proyectos()} name="empleados_hceap"
                                        id="${CONSTANTS_ITEM012.id_select_empleados}"
                                        class="select_hceap">
                                        <option value="-1">Selecciona un empleado</option>
            
                                        ${Object.keys(this.empleados_hceap).map(item =>
    html`
                                                <option value="${this.empleados_hceap[item].id_empleado}">
                                                    ${this.empleados_hceap[item].nombre}
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
                                    <select name="proyectos_hceap" id="${CONSTANTS_ITEM012.id_select_proyectos}" class="select_hceap">
                                    </select>
                                </div>
                            </div>
                            <div class="div_flex_hceap">
                                <div class="div_campos_hceap">
                                    <label>Año:</label>
                                </div>
                                <div class="div_campos_datos">
                                    <select id="${CONSTANTS_ITEM012.id_select_year}" class="select_hceap">
                                        <option value="-1">Selecciona un año</option>
                                    </select>
                                </div>
                            </div>
            
                            <div>
                                <div class="div_errores_hceap" id="${CONSTANTS_ITEM012.id_div_errores}">
                                    <div class="div_errores_header_hceap">
                                        <label>Para poder generar un reporte debes corregir los siguientes errores:</label>
                                    </div>
                                    <div class="div_errores_contenido_hceap" id="${CONSTANTS_ITEM012.id_div_contenido_errores}"></div>
                                </div>
            
                                <div>
                                    <button @click="${() => this.control_errores_datos_reporte()}"
                                        id="${CONSTANTS_ITEM012.id_button_generar_reporte}" class="button_generar_reporte">GENERAR
                                        REPORTE</button>
                                </div>
            
                                <div class="div_exito_hceap" id="${CONSTANTS_ITEM012.id_div_exito_hceap}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="div_body_reporte_generado_hceap">
${
  this.control_generar_reporte === false
    ? html``
    : this.generarReporteHceap()
}
                </div>
            </div>
        `;
  }

  generarReporteHceap() {
    return html`
                <table class="table_hceap">
                    <tr>
                    <th>Mes</th>
                    <th>Horas trabajadas</th>
                    <th>Horas de permisos</th>
                    <th>Horas de intervenciones</th>
                    <th>Jornadas Trabajadas</th>
                    <th>Jornadas de Guardia</th>
                    <th>Jornadas de vacaciones</th>
                    </tr>

                ${Object.keys(this.array_reporte_hceap).map(item =>
    html`
                    <tr>
                    <td>
                        <label>
                            ${this.array_reporte_hceap[item].mes}
                        </label>
                    </td>
                    <td>
                        <label>
                            ${this.array_reporte_hceap[item].horas_trabajadas}
                        </label>
                    </td>
                    <td>
                        <label>
                            ${this.array_reporte_hceap[item].horas_permiso}
                        </label>
                    </td>
                    <td>
                        <label>
                            ${this.array_reporte_hceap[item].horas_intervenciones}
                        </label>
                    </td>
                    <td>
                        <label>
                            ${this.array_reporte_hceap[item].jornadas_trabajadas}
                        </label>
                    </td>
                    <td>
                        <label>
                            ${this.array_reporte_hceap[item].jornadas_guardia}
                        </label>
                    </td>
                    <td>
                        <label>
                            ${this.array_reporte_hceap[item].jornadas_vacaciones}
                        </label>
                    </td>
                    </tr>
                    
                `)}
                </table>
        `;
  }

  firstUpdated() {
    /* CARGAR AÑOS DEL SELECT */
    this.cargar_años_select();
  }

  control_errores_datos_reporte() {
    var errores_datos_reporte = '';

    /* CONTROL DE QUE SE HAYA SELECCIONADO UN EMPLEADO */
    var empleado = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_empleados);
    var empleado_seleccionado = parseInt(empleado.options[empleado.selectedIndex].value);
    var empleado_seleccionado_id = empleado.options[empleado.selectedIndex].value;
    if (empleado_seleccionado === -1) {
      errores_datos_reporte += 'Debes seleccionar un empleado<br>';
    }

    /* CONTROL DE QUE SE HAYA SELECCIONADO UN PROYECTO O UN EMPLEADO PREVIAMENTE */
    var proyecto = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_proyectos);
    if (proyecto.length !== 0) {
      var proyecto_seleccionado = proyecto.options[proyecto.selectedIndex].value;
      if (proyecto_seleccionado === 'Selecciona un proyecto') {
        errores_datos_reporte += 'Debes seleccionar un proyecto<br>';
      }
    } else {
      errores_datos_reporte += 'Tienes que selecionar un empleado para poder seleccionar un proyecto<br>';
    }

    /* CONTROL DE QUE SE HAYA SELECCIONADO UN AÑO */
    var year = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_year);
    var year_seleccionado = year.options[year.selectedIndex].value;
    if (parseInt(year_seleccionado) === -1) {
      errores_datos_reporte += 'Debes seleccionar un año';
    }

    if (errores_datos_reporte !== '') {
      // INSERTAR ERRORES ENCONTRADOS EN DIV ERRORES
      this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_div_contenido_errores).innerHTML = errores_datos_reporte;
      this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_div_errores).style.display = 'block';
    } else {
      this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_div_errores).style.display = 'none';
      this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_div_contenido_errores).textContent = '';

      // MOSTRAR DIV EXITO CONSULTA
      this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_div_exito_hceap).style.display = 'block';
      this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_div_exito_hceap).textContent = '';
      var empleado_seleccionado_nombre = empleado.options[empleado.selectedIndex].textContent;
      // ELIMINAR ESPACIOS EN BLANCO PRINCIPIO Y FINAL DEL OPTION EMPLEADO
      var empleado_seleccionado_nombre_tratado = empleado_seleccionado_nombre.replace(/^\s+|\s+$/g, '');

      var content_div_errores = '<b>Reporte generado:</b><br>Empleado: ' + empleado_seleccionado_nombre_tratado + '<br>Proyecto: ' + proyecto_seleccionado + '<br>Año: ' + year_seleccionado;
      this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_div_exito_hceap).innerHTML = content_div_errores;

      var id_empleado = empleado_seleccionado_id;
      this.set_reporte_meses_hceap(id_empleado, proyecto, year);
      // CONTROLADOR EN EL RENDER PRINCIPAL
      this.control_generar_reporte = true;
    }
  }

  /* FUNCION QUE GENERA LOS AÑOS DEL SELECT HASTA EL AÑO ACTUAL */
  cargar_años_select() {
    var select_year = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_year);

    var myDate = new Date();
    var year = myDate.getFullYear();

    for (var i = year; i > 2008; i--) {
      var option = document.createElement('option');
      option.text = i;
      option.value = i;
      select_year.add(option);
    }
  }

  cargar_proyectos() {
    /* OBTENER EL ID DEL EMPLEADO SELECCIONADO PARA CONSULTA AJAX */
    var empleados = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_empleados);
    var id_empleado_seleccionado = empleados.options[empleados.selectedIndex].value;

    /* SI LA OPCION SELECCIONADA ES DIFERENTE A LA PRIMERA */
    if (parseInt(id_empleado_seleccionado) !== -1) {
      /* HACER CONSULTA AJAX QUE PREGUNTE POR LOS PROYECTOS EN LOS QUE ESTUVO ASIGNADO EL ID DEL EMPLEADO */
      var proyectos_empleado = getProyectosAsigandosEmpleado(id_empleado_seleccionado);
      proyectos_empleado.sort();

      /* ELIMINAR TODOS LOS HIJOS DEL SELECT PROYECTOS */
      var select_eliminar = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_proyectos);
      while (select_eliminar.firstChild) {
        select_eliminar.removeChild(select_eliminar.firstChild);
      }

      /* INSERTAR OPCIONES EXTRAIDAS MEDIANTE AJAX */
      var select = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_proyectos);
      /* DEFINIR LA PRIMERA OPCION DEL SELECCION */
      var firs_option = document.createElement('option');
      firs_option.innerHTML = 'Selecciona un proyecto';
      select.appendChild(firs_option);
      for (var i = 0; i < proyectos_empleado.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = proyectos_empleado[i];
        select.appendChild(option);
      }
    } else {
      /* ELIMINAR TODOS LOS HIJOS DEL SELECT PROYECTOS */
      var list = this.shadowRoot.getElementById(CONSTANTS_ITEM012.id_select_proyectos);
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
    }
  }
}

customElements.define('reporte-horas-consolidadas-empleado-year-proyecto', BeniReporteHceap);
