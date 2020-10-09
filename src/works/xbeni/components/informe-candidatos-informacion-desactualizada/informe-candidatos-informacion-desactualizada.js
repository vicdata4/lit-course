/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import { LitElement, html } from 'lit-element';
import { item002ListaCipaStyles } from '../../archivos_comunes/ac_item002/styles';
import { CONSTANTS_ITEM002 } from '../../archivos_comunes/ac_item002/constantes';
import { svgBeniX, svgBeniOrdenarString, svgBeniOrdenarOther, svgBeniOrdenarInt, svgBeniCircleRed, svgBeniCircleYellow } from '../../archivos_comunes/ac_item002/svc_icons';
import { cargarInformacionCandidatosCipa } from '../../archivos_comunes/ac_item002/mocks';

export class BeniListaCipa extends LitElement {
  constructor() {
    super();
    // datos_cipa > ES DONDE SE CARGAN LOS DATOS PARA QUE EL OBJETO FUNCIONE CORRECTAMENTE | EXTRAERLOS CON AJAX DE LA BASE DATOS*/
    this.datos_cipa = cargarInformacionCandidatosCipa();
  }

  static get properties() {
    return {
      datos_cipa: { type: Object }
    };
  }

  static get styles() {
    return [
      item002ListaCipaStyles
    ];
  }

  render() {
    return html`
            <div class="div_slot_top">
                <!-- CONTENIDO EXTERNO AL COMPONENTE TOP -->
                <slot name="top">
                </slot>
            </div>
            <div class="div_slot_defaul">
                <!-- CONTENIDO EXTERNO AL COMPONENTE DEFAULT -->
                <slot>
                </slot> 
            </div>
            <div id="${CONSTANTS_ITEM002.div_body_abrir_cipa}" class="div_body_abrir_cipa">
                <div class="div_button_abrir_cipa">
                    <button @click="${this.hidden_body_abrir_cipa}" class="button_abrir_cipa" >Abrir lista de candidatos con información pendiente a actualizar </button>
                </div>
            </div>
            <div id="${CONSTANTS_ITEM002.div_body_cipa}"  class="div_body_cipa">
                <div class="div_header_cipa">
                    <div class="div_titulo_cipa">
                        <!-- EL TITULO FORMULARIO SE PUEDE MODIFICAR SEGUN SE DESEE -->
                        <label class="titulo_header_cipa">${CONSTANTS_ITEM002.titulo_formulario}</label>
                    </div>
                    <div class="div_header_controles_cipa">
                        <div @click="${this.hidden_body_cipa}" class="div_x_header_cipa">
                            ${svgBeniX}
                        </div>
                    </div>
                </div>
                <div class="div_main_cipa">
                    <!--  COMIENZO TABLA -->
                    <table id="${CONSTANTS_ITEM002.table_id}" class="tabla_cipa">
                        <!--  HEADER TABLA -->
                        <tr>
                            <th scope="row">
                                <div class="div_flex_th_cipa">
                                    <div>
                                        <label>Nombre</label>
                                    </div>
                                    <div @click=${() => this.ordenar_tabla_string_cipa(0, 'str')} class="campo_ordenar">
                                        ${svgBeniOrdenarString}
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${CONSTANTS_ITEM002.label_ordenar_nombre_id}" class="texto_campo_ordenar"></label>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="row">
                                <div class="div_flex_th_cipa">
                                    <div>
                                        <label>Correo electronico</label>
                                    </div>
                                    <div @click=${() => this.ordenar_tabla_string_cipa(1, 'str')} class="campo_ordenar">
                                        ${svgBeniOrdenarString}
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${CONSTANTS_ITEM002.label_ordenar_correo_id}" class="texto_campo_ordenar"></label>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="row">
                                <label>Telefono</label>
                            </th>
                            <th scope="row">
                                <div class="div_flex_th_cipa">
                                    <div>
                                        <label>Perfil</label>
                                    </div>
                                    <div @click=${() => this.ordenar_tabla_string_cipa(3, 'str')} class="campo_ordenar">
                                        ${svgBeniOrdenarString}
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${CONSTANTS_ITEM002.label_ordenar_perfil_id}" class="texto_campo_ordenar"></label>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="row">
                                <div class="div_flex_th_cipa">
                                    <div>
                                        <label>En plantilla</label>
                                    </div>
                                    <div @click=${() => this.ordenar_tabla_string_cipa(4, 'str')} class="campo_ordenar">
                                        ${svgBeniOrdenarOther}
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${CONSTANTS_ITEM002.label_ordenar_plantilla_id}" class="texto_campo_ordenar"></label>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="row">
                                <div class="div_flex_th_cipa">
                                    <div>
                                        <label>Fecha de ultima actualizacion de datos</label>
                                    </div>
                                    <div @click=${() => this.ordenar_tabla_string_cipa_fecha(5, 'fecha')} class="campo_ordenar">
                                        ${svgBeniOrdenarInt}
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${CONSTANTS_ITEM002.label_ordenar_fua_id}" class="texto_campo_ordenar"></label>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="row">
                                <div class="div_flex_th_cipa">
                                    <div>
                                        <label>Fecha de vencimiento</label>
                                    </div>
                                    <div @click=${() => this.ordenar_tabla_string_cipa_fecha(6, 'fecha')} class="campo_ordenar">
                                        ${svgBeniOrdenarInt}
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${CONSTANTS_ITEM002.label_ordenar_fv_id}" class="texto_campo_ordenar"></label>
                                        </div>
                                    </div>
                                </div>
                            </th>
                            <th scope="row">Semaforo</th>
                        </tr>

                        <!--  MAIN TABLA -->
            
                        <!-- EXTRAER DATOS DEL OBJETO POR CADA NIVEL -->
                        <!--  COMIENZO MAIN TR -->
                        ${Object.keys(this.datos_cipa).map(item =>
    html`
                        <tr>
                            <td>
                                <label class="label_nombre_candidato_cipa" @click=${() => this.dirigir_url_editar_candidato(this.datos_cipa[item].nombre)}>
                                    ${this.cambiar_formato_nombre(this.datos_cipa[item].nombre)}
                                </label>
                            </td>
                            <td>
                                <label>
                                    ${this.cambiar_formato_correo(this.datos_cipa[item].email)}
                                </label>
                            </td>
                            <td>
                                <label>
                                    ${this.datos_cipa[item].telefono}
                                </label>
                            </td>
                            <td>
                                <label>
                                    ${this.cambiar_formato_perfil(this.datos_cipa[item].perfil)}
                                </label>
                            </td>
                            <td>
                                <div class="checkbox">
                                    ${this.datos_cipa[item].en_plantilla
    ? html`<input checked disabled id="checkbox1_${item}" type="checkbox" value="1" />
                                        <label for="checkbox1_${item}"></label>`
    : html`<input disabled id="checkbox1_${item}" type="checkbox" value="1" />
                                        <label for="checkbox1_${item}"></label>`
}
                                </div>
                            </td>
                            <td>
                                <label>
                                    ${this.datos_cipa[item].fecha_ultima_actualizacion}
                                </label>
                            </td>
                            <td>
                                <label>
                                    ${this.calcular_fecha_vencimiento(this.datos_cipa[item].fecha_ultima_actualizacion)}
                                </label>
                            </td>
                            <td>
                                <div class="div_semaforo">
${this.calcular_diferencia_fecha_semaforo(this.calcular_fecha_vencimiento(this.datos_cipa[item].fecha_ultima_actualizacion)) === 'rojo'
    ? html`${svgBeniCircleRed}`
    : html` ${this.calcular_diferencia_fecha_semaforo(this.calcular_fecha_vencimiento(this.datos_cipa[item].fecha_ultima_actualizacion)) === 'amarillo'
      ? html`${svgBeniCircleYellow}`
      : html``}
`}
                                </div>
                            </td>
                        </tr>
                        `)}
                    </table>
                </div>
            </div>
            <div class="div_slot_bottom">
                <!-- CONTENIDO EXTERNO SLOT BOTTOM -->
               <slot name="bottom">
               </slot>
            </div>
        `;
  }

  hidden_body_cipa() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.div_body_cipa).style.display = 'none';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.div_body_abrir_cipa).style.display = 'block';
  }

  hidden_body_abrir_cipa() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.div_body_cipa).style.display = 'block';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.div_body_abrir_cipa).style.display = 'none';
  }

  dirigir_url_editar_candidato(id_candidato_a_editar) {
    /* CUANDO SE INTRODUCA EN PRODUCCION EDITAR ESTA FUNCION PARA QUE REDIRIGA A EDITAR PERFIL DEL CANDIDATO CON ESTE NOMBRE O PASAR OTRO PARAMETRO DESDE LA BASE DE DATOS CON SU RESPECTIVO ID: EXTRAERLO DE LA FUNCION QUE CARGA POR DEFECTO EL CONSTRUCTOR RESULTADOS BASE DATOS JSON */
    // eslint-disable-next-line no-console
    console.log('URL: REDIRIGIR URL - EDITAR CANDIDATO [ ' + id_candidato_a_editar + ' ]');
  }

  /* CAMBIAR FORMATO PERFIL */
  cambiar_formato_perfil(perfil) {
    let resultado = perfil[0].toUpperCase() + perfil.slice(1);
    return resultado;
  }

  /* CAMBIAR FORMATO EMAIL - TODO MINUSCULAS */
  cambiar_formato_correo(email) {
    let resultado = email.toLowerCase();
    return resultado;
  }

  /* CAMBIAR FORMATO NOMBRE RECIBIDO - 1 MAYUSCULA - RESTO MINUSCULA */
  cambiar_formato_nombre(nombre) {
    let dato = nombre.toLowerCase();
    let array_datos = dato.split(' ');
    let resultado = '';

    for (let i = 0; i < array_datos.length; i++) {
      if (i === array_datos.length - 1) {
        resultado += array_datos[i][0].toUpperCase() + array_datos[i].slice(1);
      } else {
        resultado += array_datos[i][0].toUpperCase() + array_datos[i].slice(1) + ' ';
      }
    }
    return resultado;
  }

  /* ATENCION HAY 2 FUNCIONES SIMILARES TENER CUIDADO CON CUAL SE EDITARA - UNIR LAS DOS FUNCIONES EN 1 CUANDO SE PUEDA */
  /* FUNCION MODIFICADA PARA QUE ORDENE FECHAS - EXTENSION DE ORDENAR STRING E INT */
  ordenar_tabla_string_cipa_fecha(n, type) {
    let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let switchcount = 0;
    /* EXTRAER EL NODO PADRE DE LA TABLA */
    table = this.shadowRoot.getElementById(CONSTANTS_ITEM002.table_id);
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* INDICAR EL ORDEN QUE HAY SELECCIONADO EN EL DIV > LABEL ORDENAR */
    if (n === 5) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_fua_id).innerHTML = 'ASC';
    }
    if (n === 6) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_fv_id).innerHTML = 'ASC';
    }
    /* Make a loop that will continue until no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare, one from current row and one from the next: */
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];

        /* EXTRAER 1 LABEL DEL TD, EXTRAER ESPACIOS EN BLANCO DEL CONTENIDO LABEL */
        let x_new = x.getElementsByTagName('label')[0].innerHTML.replace(/ /g, '');
        /* EXTRAER DATOS FECHA POR SEPARADO */
        let array_datos_fecha_x = x_new.split('/');
        /* DECLARAR FECHA CON EL FORMATO CORRECTO */
        let date_x = new Date(array_datos_fecha_x[2], (parseInt(array_datos_fecha_x[1]) + parseInt('1')), array_datos_fecha_x[0]);

        let y_new = y.getElementsByTagName('label')[0].innerHTML.replace(/ /g, '');
        /* EXTRAER DATOS FECHA POR SEPARADO */
        let array_datos_fecha_y = y_new.split('/');
        /* DECLARAR FECHA CON EL FORMATO CORRECTO */
        let date_y = new Date(array_datos_fecha_y[2], (parseInt(array_datos_fecha_y[1]) + parseInt('1')), array_datos_fecha_y[0]);
        x_new = date_x.getTime();
        y_new = date_y.getTime();

        /* check if the two rows should switch place, based on the direction, asc or desc: */
        if (dir === 'asc') {
          if (type === 'fecha' && parseFloat(x_new) > parseFloat(y_new)) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (type === 'fecha' && parseFloat(x_new) < parseFloat(y_new)) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
        if (switchcount === 0 && dir === 'asc') {
          if (n === 5) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_fua_id).innerHTML = 'DES';
          }
          if (n === 6) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_fv_id).innerHTML = 'DES';
          }
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  ordenar_tabla_string_cipa(n, type) {
    /* EXTRAER EL NODO PADRE DE LA TABLA */
    let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let switchcount = 0;
    table = this.shadowRoot.getElementById(CONSTANTS_ITEM002.table_id);
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* INDICAR EL ORDEN QUE HAY SELECCIONADO EN EL DIV > LABEL ORDENAR */
    if (n === 0) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_nombre_id).innerHTML = 'ASC';
    }
    if (n === 1) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_correo_id).innerHTML = 'ASC';
    }
    if (n === 3) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_perfil_id).innerHTML = 'ASC';
    }
    if (n === 4) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_plantilla_id).innerHTML = 'SI';
    }
    /* Make a loop that will continue until no switching has been done: */
    while (switching) {
      // start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare, one from current row and one from the next: */
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];

        /* check if the two rows should switch place, based on the direction, asc or desc: */
        if (dir === 'asc') {
          if ((type === 'str' && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type === 'int' && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if ((type === 'str' && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type === 'int' && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
            // if so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
        if (switchcount === 0 && dir === 'asc') {
          /* INDICAR EN EL LABEL QUE EL ORDEN CAMBIO A DESCENDENTE */
          if (n === 0) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_nombre_id).innerHTML = 'DES';
          }
          if (n === 1) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_correo_id).innerHTML = 'DES';
          }
          if (n === 3) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_perfil_id).innerHTML = 'DES';
          }
          if (n === 4) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_plantilla_id).innerHTML = 'NO';
          }
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  vaciar_campos_ordena() {
    /* FUNCION QUE VACIA TODOS LOS CAMPOS DEL DIV ORDENAR - INTRODUCIDA PARA EVITAR REPETIR CODIGO */
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_nombre_id).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_correo_id).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_perfil_id).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_plantilla_id).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_fua_id).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.label_ordenar_fv_id).innerHTML = '';
  }

  calcular_diferencia_fecha_semaforo(fecha_vencimiento) {
    /* EXTRAER FECHA ACTUAL */
    // eslint-disable-next-line no-unused-vars
    let fecha_actual = '';
    // eslint-disable-next-line prefer-const
    let date = new Date();
    fecha_actual = (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);

    /* EXTRAER ( FECHA VENCIMIENTO - 3 MESES ) = NUMERO DE DIAS QUE HAY EN ESOS 3 MESES */
    /* EXTRAER DATOS FECHA POR SEPARADO */
    let array_datos_fecha = fecha_vencimiento.split('/');
    /* DECLARAR FECHA CON EL FORMATO CORRECTO */
    let fecha_vencimiento_formato = new Date(array_datos_fecha[2], (parseInt(array_datos_fecha[1]) - parseInt('1')), array_datos_fecha[0]);
    let fecha_vencimiento_3_meses = new Date(array_datos_fecha[2], (parseInt(array_datos_fecha[1]) - parseInt('1')), array_datos_fecha[0]);
    // DECLARAR FECHA_VENCIMIENTO -3 MESES
    fecha_vencimiento_3_meses.setMonth(fecha_vencimiento_formato.getMonth() - 3);
    let diff_3_milis = fecha_vencimiento_formato.getTime() - fecha_vencimiento_3_meses.getTime();
    // DIAS QUE HAY EN ESOS 3 MESES DE DIFERENCIA A LA FECHA VENCIMIENTO
    let dias_dif_3_meses = (Math.floor(diff_3_milis / (1000 * 60 * 60 * 24)));

    // DECLARAR FECHA_VENCIMIENTO -1 MES
    let fecha_vencimiento_1_meses = new Date(array_datos_fecha[2], (parseInt(array_datos_fecha[1]) - parseInt('1')), array_datos_fecha[0]);
    fecha_vencimiento_1_meses.setMonth(fecha_vencimiento_formato.getMonth() - 1);
    let diff_1_milis = fecha_vencimiento_formato.getTime() - fecha_vencimiento_1_meses.getTime();
    // DIAS QUE HAY EN 1 MES DE DIFERENCIA A LA FECHA VENCIMIENTO
    let dias_dif_1_meses = (Math.floor(diff_1_milis / (1000 * 60 * 60 * 24)));

    /* CALCULAR LOS DIAS QUE FALTAN PARA QUE LA FECHA ACTUAL SUPERE A LA DE VENCIMIENTO ( FECHA_VENCIMIENTO - FECHA_ACTUAL ) = DIAS_QUE_FALTAN */
    var fechaInicio = new Date(fecha_vencimiento_formato).getTime();
    var fechaFin = new Date(date).getTime();
    var diff = fechaInicio - fechaFin;
    // DIAS QUE HAY ENTRE LA FECHA_VENCIMIENTO Y LA FECHA_ACTUAL
    let diferencia_fechas_actual_vencimiento = (Math.floor(diff / (1000 * 60 * 60 * 24)));
    // fecha_vencimiento_3_meses.getDate()+"/"+fecha_vencimiento_3_meses.getMonth()+"/"+fecha_vencimiento_3_meses.getFullYear()

    let valor_final_a_enviar = null;
    if (parseInt(diferencia_fechas_actual_vencimiento) <= parseInt(dias_dif_3_meses) && parseInt(diferencia_fechas_actual_vencimiento) >= dias_dif_1_meses) {
      valor_final_a_enviar = 'amarillo';
    }

    if (diferencia_fechas_actual_vencimiento <= dias_dif_1_meses) {
      valor_final_a_enviar = 'rojo';
    }

    return valor_final_a_enviar;
  }

  calcular_fecha_vencimiento(fecha_ultima_actualizacion) {
    /* EXTRAER DATOS FECHA POR SEPARADO */
    let array_datos_fecha = fecha_ultima_actualizacion.split('/');

    /* DECLARAR FECHA CON EL FORMATO CORRECTO */
    let date = new Date(array_datos_fecha[2], (parseInt(array_datos_fecha[1]) + parseInt('1')), array_datos_fecha[0]);
    date.setMonth(date.getMonth() + 18);
    let fecha_final = '';

    /* EXTRAER FECHA VENCIMIENTO POR SEPARADO */
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    /* DARLE FORMATO CORRECTO A LA FECHA */
    fecha_final = (`${day}/${month}/${year}`);
    if (month < 10) {
      fecha_final = (`${day}/0${month}/${year}`);
      if (day < 10) {
        fecha_final = (`0${day}/0${month}/${year}`);
      }
    }
    if (day < 10) {
      fecha_final = (`0${day}/${month}/${year}`);
      if (month < 10) {
        fecha_final = (`0${day}/0${month}/${year}`);
      }
    }
    return fecha_final;
  }
}

customElements.define('informe-candidatos-informacion-desactualizada', BeniListaCipa);
