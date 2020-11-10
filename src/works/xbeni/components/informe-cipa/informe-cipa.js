/* eslint-disable prefer-const */
import { LitElement, html } from 'lit-element';
import { informeCipaStyles } from '../../archivos_comunes/ac_informe-cipa/styles';
import {
  svgUpArrow,
  svgDownArrow,
  svgOrderCircleRed,
  svgCircleYellow,
} from '../../archivos_comunes/ac_informe-cipa/svc_icons';
import { cargarInformacionCandidatosCipa } from '../../archivos_comunes/ac_informe-cipa/mocks';

export class BeniListaCipa extends LitElement {
  constructor() {
    super();
    this.datosCipa = cargarInformacionCandidatosCipa;
    this.cargarFechaVencimiento();
    this.showName = false;
    this.showEmail = false;
    this.showPerfil = false;
    this.showPlantilla = false;
    this.showFua = false;
    this.showFv = false;
  }

  static get properties() {
    return {
      datosCipa: { type: Array },
      showName: { type: Boolean, attribute: false },
      showEmail: { type: Boolean, attribute: false },
      showPerfil: { type: Boolean, attribute: false },
      showPlantilla: { type: Boolean, attribute: false },
      showFua: { type: Boolean, attribute: false },
      showFv: { type: Boolean, attribute: false },
    };
  }

  static get styles() {
    return [informeCipaStyles];
  }

  render() {
    return html`
      <div id="id_body_cipa" class="div_body_cipa">
        <div class="div_main_cipa">
          <table class="tabla_cipa">
            <!--  HEADER TABLA -->
            <tr>
              <th
                @click="${() => this.orderList('nombre')}"
                @mouseover="${() => this.showButtonOrder('nombre')}"
                @mouseout="${() => this.hiddenButtonOrder('nombre')}"
                class="active_hover"
              >
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Nombre</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgDownArrow}${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_name" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th
                @click="${() => this.orderList('email')}"
                @mouseover="${() => this.showButtonOrder('email')}"
                @mouseout="${() => this.hiddenButtonOrder('email')}"
                class="active_hover"
              >
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Correo electronico</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgDownArrow}${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_email" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <label>Telefono</label>
              </th>
              <th
                @click="${() => this.orderList('perfil')}"
                @mouseover="${() => this.showButtonOrder('perfil')}"
                @mouseout="${() => this.hiddenButtonOrder('perfil')}"
                class="active_hover"
              >
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Perfil</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgDownArrow}${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_perfil" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th
                @click="${() => this.orderList('en_plantilla')}"
                @mouseover="${() => this.showButtonOrder('en_plantilla')}"
                @mouseout="${() => this.hiddenButtonOrder('en_plantilla')}"
                class="active_hover"
              >
                <div class="div_flex_th_cipa">
                  <div>
                    <label>En plantilla</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgDownArrow}${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_plantilla" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th
                @click="${() => this.orderList('fecha_ultima_actualizacion')}"
                @mouseover="${() => this.showButtonOrder('fecha_ultima_actualizacion')}"
                @mouseout="${() => this.hiddenButtonOrder('fecha_ultima_actualizacion')}"
                class="active_hover"
              >
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de ultima actualizacion de datos</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgDownArrow}${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_fua" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th
                @click="${() => this.orderList('fechaVencimiento')}"
                @mouseover="${() => this.showButtonOrder('fechaVencimiento')}"
                @mouseout="${() => this.hiddenButtonOrder('fechaVencimiento')}"
                class="active_hover"
              >
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de vencimiento</label>
                  </div>
                  <div class="campo_ordenar">
                    ${svgDownArrow}${svgUpArrow}
                    <div class="div_texto_campo_ordenar">
                      <label id="id_label_order_fv" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th>
                <label>Semaforo</label>
              </th>
            </tr>

            <!--  MAIN TABLA -->
            ${this.datosCipa.map(
              (item) => html`
                <tr>
                  <td>
                    <label
                      class="label_nombre_candidato_cipa"
                      @click=${() => this.dirigirUrlEditarCandidato(item.nombre)}
                    >
                      ${this.cambiarFormatoNombre(item.nombre)}
                    </label>
                  </td>
                  <td>
                    <label> ${this.cambiarFormatoCorreo(item.email)} </label>
                  </td>
                  <td>
                    <label> ${item.telefono} </label>
                  </td>
                  <td>
                    <label> ${this.cambiarFormatoPerfil(item.perfil)} </label>
                  </td>
                  <td>
                    <div class="checkbox">
                      ${item.en_plantilla
                        ? html`<input checked disabled id="checkbox1_${item}" type="checkbox" value="1" />
                            <label for="checkbox1_${item}"></label>`
                        : html`<input disabled id="checkbox1_${item}" type="checkbox" value="1" />
                            <label for="checkbox1_${item}"></label> `}
                    </div>
                  </td>
                  <td>
                    <label> ${this.formatRequiredDate(item.fecha_ultima_actualizacion)} </label>
                  </td>
                  <td>
                    <label> ${this.formatRequiredDate(item.fechaVencimiento)} </label>
                  </td>
                  <td>
                    <div class="div_semaforo">
                      ${this.calcularDiferenciaFechaSemaforo(item.fechaVencimiento) === 'rojo'
                        ? html`${svgOrderCircleRed}`
                        : html`
                            ${this.calcularDiferenciaFechaSemaforo(item.fechaVencimiento) === 'amarillo'
                              ? html`${svgCircleYellow}`
                              : html``}
                          `}
                    </div>
                  </td>
                </tr>
              `,
            )}
          </table>
        </div>
      </div>

      <div class="div_slot_bottom">
        <slot name="bottom"> </slot>
      </div>
    `;
  }

  cargarFechaVencimiento() {
    for (let i = 0; i < this.datosCipa.length; i++) {
      this.datosCipa[i].fechaVencimiento = this.generateDateEndToAddComponent(
        this.datosCipa[i].fecha_ultima_actualizacion,
      );
    }
  }

  showButtonOrder(column) {
    const svgNameUp = this.shadowRoot.querySelectorAll('.svg_order_up')[0];
    const svgNameDown = this.shadowRoot.querySelectorAll('.svg_order_down')[0];
    const svgEmailUp = this.shadowRoot.querySelectorAll('.svg_order_up')[1];
    const svgEmailDown = this.shadowRoot.querySelectorAll('.svg_order_down')[1];
    const svgPerfilUp = this.shadowRoot.querySelectorAll('.svg_order_up')[2];
    const svgPerfilDown = this.shadowRoot.querySelectorAll('.svg_order_down')[2];
    const svgPlantillaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[3];
    const svgPlantillaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[3];
    const svgFuaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[4];
    const svgFuaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[4];
    const svgFvUp = this.shadowRoot.querySelectorAll('.svg_order_up')[5];
    const svgFvDown = this.shadowRoot.querySelectorAll('.svg_order_down')[5];
    switch (column) {
      case 'nombre':
        svgNameUp.style.visibility = 'visible';
        svgNameDown.style.visibility = 'visible';
        break;
      case 'email':
        svgEmailUp.style.visibility = 'visible';
        svgEmailDown.style.visibility = 'visible';
        break;
      case 'perfil':
        svgPerfilUp.style.visibility = 'visible';
        svgPerfilDown.style.visibility = 'visible';
        break;
      case 'en_plantilla':
        svgPlantillaUp.style.visibility = 'visible';
        svgPlantillaDown.style.visibility = 'visible';
        break;
      case 'fecha_ultima_actualizacion':
        svgFuaUp.style.visibility = 'visible';
        svgFuaDown.style.visibility = 'visible';
        break;
      case 'fechaVencimiento':
        svgFvUp.style.visibility = 'visible';
        svgFvDown.style.visibility = 'visible';
        break;
    }
  }

  hiddenButtonOrder(column) {
    const svgNameUp = this.shadowRoot.querySelectorAll('.svg_order_up')[0];
    const svgNameDown = this.shadowRoot.querySelectorAll('.svg_order_down')[0];
    const svgEmailUp = this.shadowRoot.querySelectorAll('.svg_order_up')[1];
    const svgEmailDown = this.shadowRoot.querySelectorAll('.svg_order_down')[1];
    const svgPerfilUp = this.shadowRoot.querySelectorAll('.svg_order_up')[2];
    const svgPerfilDown = this.shadowRoot.querySelectorAll('.svg_order_down')[2];
    const svgPlantillaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[3];
    const svgPlantillaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[3];
    const svgFuaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[4];
    const svgFuaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[4];
    const svgFvUp = this.shadowRoot.querySelectorAll('.svg_order_up')[5];
    const svgFvDown = this.shadowRoot.querySelectorAll('.svg_order_down')[5];
    if (this.showName === false) {
      svgNameUp.style.visibility = 'hidden';
      svgNameDown.style.visibility = 'hidden';
    } else {
      svgNameUp.style.visibility = 'visible';
      svgNameDown.style.visibility = 'visible';
    }
    if (this.showEmail === false) {
      svgEmailUp.style.visibility = 'hidden';
      svgEmailDown.style.visibility = 'hidden';
    } else {
      svgEmailUp.style.visibility = 'visible';
      svgEmailDown.style.visibility = 'visible';
    }
    if (this.showPerfil === false) {
      svgPerfilUp.style.visibility = 'hidden';
      svgPerfilDown.style.visibility = 'hidden';
    } else {
      svgPerfilUp.style.visibility = 'visible';
      svgPerfilDown.style.visibility = 'visible';
    }
    if (this.showPlantilla === false) {
      svgPlantillaUp.style.visibility = 'hidden';
      svgPlantillaDown.style.visibility = 'hidden';
    } else {
      svgPlantillaUp.style.visibility = 'visible';
      svgPlantillaDown.style.visibility = 'visible';
    }
    if (this.showFua === false) {
      svgFuaUp.style.visibility = 'hidden';
      svgFuaDown.style.visibility = 'hidden';
    } else {
      svgFuaUp.style.visibility = 'visible';
      svgFuaDown.style.visibility = 'visible';
    }
    if (this.showFv === false) {
      svgFvUp.style.visibility = 'hidden';
      svgFvDown.style.visibility = 'hidden';
    } else {
      svgFvUp.style.visibility = 'visible';
      svgFvDown.style.visibility = 'visible';
    }
  }

  clearControlsShowOrder() {
    this.showName = false;
    this.showEmail = false;
    this.showPerfil = false;
    this.showPlantilla = false;
    this.showFua = false;
    this.showFv = false;
  }

  orderList(column) {
    this.clearControlsShowOrder();
    this.clearOrderCamp();
    const myList = [...this.datosCipa];
    let orderedList = [];
    const orderNameUp = this.shadowRoot.querySelectorAll('.svg_order_up')[0];
    const orderNameDown = this.shadowRoot.querySelectorAll('.svg_order_down')[0];
    const svgNameUp = this.shadowRoot.querySelectorAll('.svg_order_up')[0];
    const svgNameDown = this.shadowRoot.querySelectorAll('.svg_order_down')[0];
    const orderEmailUp = this.shadowRoot.querySelectorAll('.svg_order_up')[1];
    const orderEmailDown = this.shadowRoot.querySelectorAll('.svg_order_down')[1];
    const svgEmailUp = this.shadowRoot.querySelectorAll('.svg_order_up')[1];
    const svgEmailDown = this.shadowRoot.querySelectorAll('.svg_order_down')[1];
    const orderPerfilUp = this.shadowRoot.querySelectorAll('.svg_order_up')[2];
    const orderPerfilDown = this.shadowRoot.querySelectorAll('.svg_order_down')[2];
    const svgPerfilUp = this.shadowRoot.querySelectorAll('.svg_order_up')[2];
    const svgPerfilDown = this.shadowRoot.querySelectorAll('.svg_order_down')[2];
    const orderPlantillaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[3];
    const orderPlantillaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[3];
    const svgPlantillaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[3];
    const svgPlantillaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[3];
    const orderFuaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[4];
    const orderFuaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[4];
    const svgFuaUp = this.shadowRoot.querySelectorAll('.svg_order_up')[4];
    const svgFuaDown = this.shadowRoot.querySelectorAll('.svg_order_down')[4];
    const orderFvUp = this.shadowRoot.querySelectorAll('.svg_order_up')[5];
    const orderFvDown = this.shadowRoot.querySelectorAll('.svg_order_down')[5];
    const svgFvUp = this.shadowRoot.querySelectorAll('.svg_order_up')[5];
    const svgFvDown = this.shadowRoot.querySelectorAll('.svg_order_down')[5];

    switch (column) {
      case 'nombre':
        orderNameUp.style.display = 'block';
        orderNameDown.style.display = 'none';
        svgNameUp.style.visibility = 'visible';
        svgNameDown.style.visibility = 'visible';
        this.showName = true;
        break;
      case 'email':
        orderEmailUp.style.display = 'block';
        orderEmailDown.style.display = 'none';
        svgEmailUp.style.visibility = 'visible';
        svgEmailDown.style.visibility = 'visible';
        this.showEmail = true;
        break;
      case 'perfil':
        orderPerfilUp.style.display = 'block';
        orderPerfilDown.style.display = 'none';
        svgPerfilUp.style.visibility = 'visible';
        svgPerfilDown.style.visibility = 'visible';
        this.showPerfil = true;
        break;
      case 'en_plantilla':
        orderPlantillaUp.style.display = 'block';
        orderPlantillaDown.style.display = 'none';
        svgPlantillaUp.style.visibility = 'visible';
        svgPlantillaDown.style.visibility = 'visible';
        this.showPlantilla = true;
        break;
      case 'fecha_ultima_actualizacion':
        orderFuaUp.style.display = 'block';
        orderFuaDown.style.display = 'none';
        svgFuaUp.style.visibility = 'visible';
        svgFuaDown.style.visibility = 'visible';
        this.showFua = true;
        break;
      case 'fechaVencimiento':
        orderFvUp.style.display = 'block';
        orderFvDown.style.display = 'none';
        svgFvUp.style.visibility = 'visible';
        svgFvDown.style.visibility = 'visible';
        this.showFv = true;
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
        if (a[column].getTime() < b[column].getTime()) return -1;
        if (a[column].getTime() > b[column].getTime()) return 1;
        return 0;
      });
    }

    if (JSON.stringify(this.datosCipa) === JSON.stringify(orderedList)) {
      orderedList.reverse();
      switch (column) {
        case 'nombre':
          orderNameUp.style.display = 'none';
          orderNameDown.style.display = 'block';
          svgNameUp.style.visibility = 'visible';
          svgNameDown.style.visibility = 'visible';
          this.showName = true;
          break;
        case 'email':
          orderEmailUp.style.display = 'none';
          orderEmailDown.style.display = 'block';
          svgEmailUp.style.visibility = 'visible';
          svgEmailDown.style.visibility = 'visible';
          this.showEmail = true;
          break;
        case 'perfil':
          orderPerfilUp.style.display = 'none';
          orderPerfilDown.style.display = 'block';
          svgPerfilUp.style.visibility = 'visible';
          svgPerfilDown.style.visibility = 'visible';
          this.showPerfil = true;
          break;
        case 'en_plantilla':
          orderPlantillaUp.style.display = 'none';
          orderPlantillaDown.style.display = 'block';
          svgPlantillaUp.style.visibility = 'visible';
          svgPlantillaDown.style.visibility = 'visible';
          this.showPlantilla = true;
          break;
        case 'fecha_ultima_actualizacion':
          orderFuaUp.style.display = 'none';
          orderFuaDown.style.display = 'block';
          svgFuaUp.style.visibility = 'visible';
          svgFuaDown.style.visibility = 'visible';
          this.showFua = true;
          break;
        case 'fechaVencimiento':
          orderFvUp.style.display = 'none';
          orderFvDown.style.display = 'block';
          svgFvUp.style.visibility = 'visible';
          svgFvDown.style.visibility = 'visible';
          this.showFv = true;
          break;
      }
    }

    this.datosCipa = [...orderedList];
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

  clearOrderCamp() {
    const svgOrderUpNombre = this.shadowRoot.querySelectorAll('.svg_order_up')[0];
    const svgOrderUpEmail = this.shadowRoot.querySelectorAll('.svg_order_up')[1];
    const svgOrderUpPerfil = this.shadowRoot.querySelectorAll('.svg_order_up')[2];
    const svgOrderUpPlantilla = this.shadowRoot.querySelectorAll('.svg_order_up')[3];
    const svgOrderUpFua = this.shadowRoot.querySelectorAll('.svg_order_up')[4];
    const svgOrderUpFv = this.shadowRoot.querySelectorAll('.svg_order_up')[5];
    svgOrderUpNombre.style.display = 'block';
    this.shadowRoot.querySelectorAll('.svg_order_down')[0].style.display = 'none';
    svgOrderUpEmail.style.display = 'block';
    this.shadowRoot.querySelectorAll('.svg_order_down')[1].style.display = 'none';
    svgOrderUpPerfil.style.display = 'block';
    this.shadowRoot.querySelectorAll('.svg_order_down')[2].style.display = 'none';
    svgOrderUpPlantilla.style.display = 'block';
    this.shadowRoot.querySelectorAll('.svg_order_down')[3].style.display = 'none';
    svgOrderUpFua.style.display = 'block';
    this.shadowRoot.querySelectorAll('.svg_order_down')[4].style.display = 'none';
    svgOrderUpFv.style.display = 'block';
    this.shadowRoot.querySelectorAll('.svg_order_down')[5].style.display = 'none';
    svgOrderUpNombre.style.visibility = 'hidden';
    svgOrderUpEmail.style.visibility = 'hidden';
    svgOrderUpPerfil.style.visibility = 'hidden';
    svgOrderUpPlantilla.style.visibility = 'hidden';
    svgOrderUpFua.style.visibility = 'hidden';
    svgOrderUpFv.style.visibility = 'hidden';
  }

  calcularDiferenciaFechaSemaforo(fechaVencimiento) {
    let date = new Date();

    let fechaVenciminetoFormato = new Date(fechaVencimiento);
    let fechaVencimiento3Meses = new Date(fechaVencimiento);
    fechaVencimiento3Meses.setMonth(fechaVenciminetoFormato.getMonth() - 3);
    let diff3Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento3Meses.getTime();
    let diasDif3Meses = Math.floor(diff3Milis / (1000 * 60 * 60 * 24));

    let fechaVencimiento1Meses = new Date(fechaVencimiento);
    fechaVencimiento1Meses.setMonth(fechaVenciminetoFormato.getMonth() - 1);
    let diff1Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento1Meses.getTime();
    let diasDif1Meses = Math.floor(diff1Milis / (1000 * 60 * 60 * 24));

    let fechaInicio = new Date(fechaVenciminetoFormato).getTime();
    let fechaFin = new Date(date).getTime();
    let diff = fechaInicio - fechaFin;
    let diferenciaFechasActualVencimiento = Math.floor(diff / (1000 * 60 * 60 * 24));

    let valorFinalEnviar = null;
    if (diferenciaFechasActualVencimiento <= diasDif1Meses) {
      valorFinalEnviar = 'rojo';
    }
    if (diferenciaFechasActualVencimiento <= diasDif3Meses && diferenciaFechasActualVencimiento >= diasDif1Meses) {
      valorFinalEnviar = 'amarillo';
    }
    return valorFinalEnviar;
  }

  formatRequiredDate(date) {
    let date1 = new Date(date);
    let day = date1.getDate();
    let month = parseInt(date1.getMonth()) + 1;
    let year = date1.getFullYear();
    return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
  }

  generateDateEndToAddComponent(fechaUltimaActualizacion) {
    const date = new Date(fechaUltimaActualizacion);
    date.setMonth(date.getMonth() + 18);
    return date;
  }
}

customElements.define('informe-cipa', BeniListaCipa);
