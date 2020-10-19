/* eslint-disable prefer-const */
import { LitElement, html } from 'lit-element';
import { informeCipaStyles } from '../../archivos_comunes/ac_informe-cipa/styles';
import { CONSTANTS_ITEM002 } from '../../archivos_comunes/ac_informe-cipa/constantes';
import { svgBeniX, svgBeniOrdenarString, svgBeniOrdenarOther, svgBeniOrdenarInt, svgBeniCircleRed, svgBeniCircleYellow } from '../../archivos_comunes/ac_informe-cipa/svc_icons';
import { cargarInformacionCandidatosCipa } from '../../archivos_comunes/ac_informe-cipa/mocks';

export class BeniListaCipa extends LitElement {
  constructor() {
    super();
    this.datosCipa = cargarInformacionCandidatosCipa;
    this.tituloFormulario = 'Lista de candidatos con información pendiente a actualizar';
    this.cargarFechaVencimiento();
  }

  static get properties() {
    return {
      datosCipa: { type: Array },
      tituloFormulario: { type: String }
    };
  }

  static get styles() {
    return [
      informeCipaStyles
    ];
  }

  cargarFechaVencimiento() {
    for (let i = 0; i < this.datosCipa.length; i++) {
      this.datosCipa[i].fechaVencimiento = this.calcularFechaVencimiento(this.datosCipa[i].fecha_ultima_actualizacion);
    }
  }

  orderList(column) {
    this.vaciarCamposOrdena();
    const myList = [...this.datosCipa];
    var orderedList = [];

    switch (column) {
      case 'nombre':
        this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarNombreId).innerHTML = 'ASC';
        break;
      case 'email':
        this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarCorreoId).innerHTML = 'ASC';
        break;
      case 'perfil':
        this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPerfilId).innerHTML = 'ASC';
        break;
      case 'en_plantilla':
        this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPlantillaId).innerHTML = 'SI';
        break;
      case 'fecha_ultima_actualizacion':
        this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFuaId).innerHTML = 'ASC';
        break;
      case 'fechaVencimiento':
        this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFvId).innerHTML = 'ASC';
        break;
    }

    // ORDENA STRING
    if (column === 'nombre' || column === 'email' || column === 'perfil') {
      orderedList = myList.sort((a, b) => {
        if (a[column].toLowerCase() < b[column].toLowerCase()) return -1;
        if (a[column].toLowerCase() > b[column].toLowerCase()) return 1;
        return 0;
      });
    }
    // ORDENA BOLEANOS - NUMEROS
    if (column === 'en_plantilla') {
      orderedList = myList.sort((a, b) => {
        if (a[column] < b[column]) return -1;
        if (a[column] > b[column]) return 1;
        return 0;
      });
    }
    // ORDENA FECHAS - FORMATO DATOS A RECIBIR DD/MM/YYYY
    if (column === 'fecha_ultima_actualizacion' || column === 'fechaVencimiento') {
      orderedList = myList.sort((a, b) => {
        let arrayDateA = a[column].split('/');
        let dateA = new Date(arrayDateA[2], (parseInt(arrayDateA[1]) + parseInt('-1')), arrayDateA[0]);

        let arrayDateB = b[column].split('/');
        let dateB = new Date(arrayDateB[2], (parseInt(arrayDateB[1]) + parseInt('-1')), arrayDateB[0]);

        if (dateA.getTime() < dateB.getTime()) return -1;
        if (dateA.getTime() > dateB.getTime()) return 1;
        return 0;
      });
    }

    if (JSON.stringify(this.datosCipa) === JSON.stringify((orderedList))) {
      orderedList.reverse();
      switch (column) {
        case 'nombre':
          this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarNombreId).innerHTML = 'DES';
          break;
        case 'email':
          this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarCorreoId).innerHTML = 'DES';
          break;
        case 'perfil':
          this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPerfilId).innerHTML = 'DES';
          break;
        case 'en_plantilla':
          this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPlantillaId).innerHTML = 'NO';
          break;
        case 'fecha_ultima_actualizacion':
          this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFuaId).innerHTML = 'DES';
          break;
        case 'fechaVencimiento':
          this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFvId).innerHTML = 'DES';
          break;
      }
    }

    this.datosCipa = [...orderedList];
    this.showPage(0);
  }

  render() {
    return html`
      <div class="div_slot_top">
        <slot name="top">
        </slot>
      </div>

      <div class="div_slot_defaul">
        <slot>
        </slot> 
      </div>

      <div id="${CONSTANTS_ITEM002.divBodyAbrirCipa}" class="div_body_abrir_cipa">
        <div class="div_button_abrir_cipa">
          <button @click="${this.hiddenBodyAbrirCipa}" class="button_abrir_cipa" >Abrir lista de candidatos con información pendiente a actualizar </button>
        </div>
      </div>

      <div id="${CONSTANTS_ITEM002.divBodyCipa}"  class="div_body_cipa">
        <div class="div_header_cipa">
          <div class="div_titulo_cipa">
            <!-- EL TITULO FORMULARIO SE PUEDE MODIFICAR SEGUN SE DESEE -->
            <label class="titulo_header_cipa">${this.tituloFormulario}</label>
          </div>
          <div class="div_header_controles_cipa">
            <div @click="${this.hiddenBodyCipa}" class="div_x_header_cipa">
              ${svgBeniX}
            </div>
          </div>
        </div>
        <div class="div_main_cipa">

          <table id="${CONSTANTS_ITEM002.table_id}" class="tabla_cipa">

            <!--  HEADER TABLA -->
            <tr>
              <th>
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Nombre</label>
                  </div>
                  <div @click="${() => this.orderList('nombre')}" class="campo_ordenar">
                    ${svgBeniOrdenarString}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarNombreId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Correo electronico</label>
                  </div>
                  <div @click="${() => this.orderList('email')}" class="campo_ordenar">
                    ${svgBeniOrdenarString}
                      <div class="div_texto_campo_ordenar">                    
                        <label id="${CONSTANTS_ITEM002.labelOrdenarCorreoId}" class="texto_campo_ordenar"></label>
                      </div>
                  </div>
                </div>
              </th>
              <th>
                <label>Telefono</label>
              </th>
              <th>
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Perfil</label>
                  </div>
                  <div @click="${() => this.orderList('perfil')}" class="campo_ordenar">
                    ${svgBeniOrdenarString}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarPerfilId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div class="div_flex_th_cipa">
                  <div>
                    <label>En plantilla</label>
                  </div>
                  <div @click="${() => this.orderList('en_plantilla')}" class="campo_ordenar">
                    ${svgBeniOrdenarOther}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarPlantillaId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de ultima actualizacion de datos</label>
                  </div>
                  <div @click="${() => this.orderList('fecha_ultima_actualizacion')}" class="campo_ordenar">
                    ${svgBeniOrdenarInt}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarFuaId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de vencimiento</label>
                  </div>
                  <div @click="${() => this.orderList('fechaVencimiento')}" class="campo_ordenar">
                    ${svgBeniOrdenarInt}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarFvId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>Semaforo</th>
            </tr>

            <!--  MAIN TABLA -->
            ${this.datosCipa.map(item => html`
            <tr>
              <td>
                <label class="label_nombre_candidato_cipa" @click=${() => this.dirigirUrlEditarCandidato(item.nombre)}>
                  ${this.cambiarFormatoNombre(item.nombre)}
                </label>
              </td>
              <td>
                <label>
                  ${this.cambiarFormatoCorreo(item.email)}
                </label>
              </td>
              <td>
                <label>
                  ${item.telefono}
                </label>
              </td>
              <td>
                <label>
                  ${this.cambiarFormatoPerfil(item.perfil)}
                </label>
              </td>
              <td>
                <div class="checkbox">
                  ${item.en_plantilla
    ? html`<input checked disabled id="checkbox1_${item}" type="checkbox" value="1" />
                    <label for="checkbox1_${item}"></label>`
    : html`<input disabled id="checkbox1_${item}" type="checkbox" value="1" />
                    <label for="checkbox1_${item}"></label>
                  `}
                </div>
              </td>
              <td>
                <label>
                  ${item.fecha_ultima_actualizacion}
                </label>
              </td>
              <td>
                <label>
                  ${item.fechaVencimiento}
                </label>
              </td>
              <td>
                <div class="div_semaforo">
        ${this.calcularDiferenciaFechaSemaforo(this.calcularFechaVencimiento(item.fecha_ultima_actualizacion)) === 'rojo'
    ? html`${svgBeniCircleRed}`
    : html` ${this.calcularDiferenciaFechaSemaforo(this.calcularFechaVencimiento(item.fecha_ultima_actualizacion)) === 'amarillo'
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
        <slot name="bottom">
        </slot>
      </div>
    `;
  }

  hiddenBodyCipa() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyCipa).style.display = 'none';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyAbrirCipa).style.display = 'block';
  }

  hiddenBodyAbrirCipa() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyCipa).style.display = 'block';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyAbrirCipa).style.display = 'none';
  }

  dirigirUrlEditarCandidato(idCandidatoEditar) {
    /* CUANDO SE INTRODUCA EN PRODUCCION EDITAR ESTA FUNCION PARA QUE REDIRIGA A EDITAR PERFIL DEL CANDIDATO CON ESTE NOMBRE O PASAR OTRO PARAMETRO DESDE LA BASE DE DATOS CON SU RESPECTIVO ID: EXTRAERLO DE LA FUNCION QUE CARGA POR DEFECTO EL CONSTRUCTOR RESULTADOS BASE DATOS JSON */
    // eslint-disable-next-line no-console
    console.log('URL: REDIRIGIR URL - EDITAR CANDIDATO [ ' + idCandidatoEditar + ' ]');
  }

  cambiarFormatoPerfil(perfil) {
    let resultado = perfil[0].toUpperCase() + perfil.slice(1);
    return resultado;
  }

  cambiarFormatoCorreo(email) {
    let resultado = email.toLowerCase();
    return resultado;
  }

  cambiarFormatoNombre(nombre) {
    let dato = nombre.toLowerCase();
    let arrayDatos = dato.split(' ');
    let resultado = '';

    for (let i = 0; i < arrayDatos.length; i++) {
      if (i === arrayDatos.length - 1) {
        resultado += arrayDatos[i][0].toUpperCase() + arrayDatos[i].slice(1);
      } else {
        resultado += arrayDatos[i][0].toUpperCase() + arrayDatos[i].slice(1) + ' ';
      }
    }
    return resultado;
  }

  vaciarCamposOrdena() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarNombreId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarCorreoId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPerfilId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPlantillaId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFuaId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFvId).innerHTML = '';
  }

  calcularDiferenciaFechaSemaforo(fechaVencimiento) {
    let date = new Date();

    let arrayDatosFecha = fechaVencimiento.split('/');
    let fechaVenciminetoFormato = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) - parseInt('1')), arrayDatosFecha[0]);
    let fechaVencimiento3Meses = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) - parseInt('1')), arrayDatosFecha[0]);
    fechaVencimiento3Meses.setMonth(fechaVenciminetoFormato.getMonth() - 3);
    let diff3Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento3Meses.getTime();
    let diasDif3Meses = (Math.floor(diff3Milis / (1000 * 60 * 60 * 24)));

    let fechaVencimiento1Meses = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) - parseInt('1')), arrayDatosFecha[0]);
    fechaVencimiento1Meses.setMonth(fechaVenciminetoFormato.getMonth() - 1);
    let diff1Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento1Meses.getTime();
    let diasDif1Meses = (Math.floor(diff1Milis / (1000 * 60 * 60 * 24)));

    var fechaInicio = new Date(fechaVenciminetoFormato).getTime();
    var fechaFin = new Date(date).getTime();
    var diff = fechaInicio - fechaFin;
    let diferenciaFechasActualVencimiento = (Math.floor(diff / (1000 * 60 * 60 * 24)));

    let valorFinalEnviar = null;
    if (parseInt(diferenciaFechasActualVencimiento) <= parseInt(diasDif3Meses) && parseInt(diferenciaFechasActualVencimiento) >= diasDif1Meses) {
      valorFinalEnviar = 'amarillo';
    }

    if (diferenciaFechasActualVencimiento <= diasDif1Meses) {
      valorFinalEnviar = 'rojo';
    }

    return valorFinalEnviar;
  }

  calcularFechaVencimiento(fechaUltimaActualizacion) {
    let arrayDatosFecha = fechaUltimaActualizacion.split('/');
    let date = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) + parseInt('1')), arrayDatosFecha[0]);
    date.setMonth(date.getMonth() + 18);

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  }
}

customElements.define('informe-cipa', BeniListaCipa);
