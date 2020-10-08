/* eslint-disable camelcase */
import { LitElement, html } from 'lit-element';
import { item008ListaPeStyles } from '../../archivos_comunes/styles/styles_items008';
import { CONSTANTS_ITEM008 } from '../../archivos_comunes/constants/constants_item008';
import { extraerDatosListaPe, getDatosDescripcionPe } from '../../archivos_comunes/mocks/moks_item008';
import { svgBeniX } from '../../archivos_comunes/svg_icons/svg_item008';
class BeniListaPe extends LitElement {
  static get properties() {
    return {
      titulo_lista: { type: String },
      datos_lista_pe: { type: Object }
    };
  }

  constructor() {
    super();
    this.titulo_lista = 'Lista de peticiones';
    this.datos_lista_pe = extraerDatosListaPe();
  }

  static get styles() {
    return [
      item008ListaPeStyles
    ];
  }

  render() {
    return html`
        <div class="div_body_full">
            <div class="div_body_pe">
                <div class="div_header_pe">
                    <div clas="div_header_titulo_pe">
                        <label class="label_header_titulo">${this.titulo_lista}</label>
                    </div>
                </div>
                <div class="div_main_pe">
                    <div class="div_main_body_tabla">
                        <table class="table_pe">
                            <!--  HEADER TABLA -->
                            <tr>
                                <th scope="row">
                                    <label>Titulo</label>
                                </th>
                                <th>
                                    <label>Fecha de publicación</label>
                                </th>
                            </tr>
                            ${Object.keys(this.datos_lista_pe).map(item =>
    html`
                            <tr>
                                <td>
                                    <label @click=${() => this.load_date_results(this.datos_lista_pe[item].id_peticion, this.datos_lista_pe[item].titulo, this.datos_lista_pe[item].fecha_publicacion)} class="label_titulo_tabla_pe"> 
                                        ${this.datos_lista_pe[item].titulo}
                                    </label>
                                </td>
                                <td>
                                    <label>
                                            ${this.datos_lista_pe[item].fecha_publicacion}
                                    </label>
                                </td>
                            </tr>
        
                            `)}
                        </table>
                    </div>
                </div>
            </div>
            <div id="${CONSTANTS_ITEM008.id_body_detalles_pe}" class="div_body_resultados_pe">
                <div>
                    <div class="div_resultados_pe_campos">
                        <div class="div_resultados_titulo_pe">
                            <label class="texto_resultados_pe">Titulo: </label>
                            <label class="texto_resultados_pe_id" id="${CONSTANTS_ITEM008.id_resultados_titulo}"> Analista Programador
                                Java</label>
                        </div>
                        <div class="div_resultados_fecha_publicacion_pe">
                            <label class="texto_resultados_pe">Fecha publicacion: </label>
                            <label class="texto_resultados_pe_id"
                                id="${CONSTANTS_ITEM008.id_resultados_fecha_publicacion}">18/08/2020</label>
                        </div>
                        <div class="div_controles_detalles_pe">
                            <div @click="${this.hidden_date_results}" class="div_x_header_pe">
                                ${svgBeniX}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div_resultados_descripcion_pe">
                    <label class="texto_resultados_pe">Descripcion:</label><br>
                    <textarea disabled id="${CONSTANTS_ITEM008.id_resultados_descripcion_publicacion}" class="textarea_resultados_pe"></textarea>
                </div>
            </div>
        </div>
        `;
  }

  hidden_date_results() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.id_body_detalles_pe).style.display = 'none';
  }

  load_date_results(id_peticion, titulo_peticion, fecha_peticion) {
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.id_resultados_titulo).textContent = titulo_peticion;
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.id_resultados_fecha_publicacion).textContent = fecha_peticion;
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.id_body_detalles_pe).style.display = 'block';

    // UNA VEZ HECHA LA CONSULTA AJAX ELIMINAR ESTA LINEA DE CODIGO
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.id_resultados_descripcion_publicacion).textContent = 'Requisitos:\nUn año de experiencia minimo\nLugar de Trabajo: Las Tablas\nActividades:\nAutomatización de pruebas\nDescripcion se obtendra de ajax una vez que se conecte a la base datos.';

    // SOLICITUD AJAX QUE RPEGUNTE POR LA DESCRIPCION
    getDatosDescripcionPe(id_peticion);
  }
}

customElements.define('item012-lista-pe', BeniListaPe);
