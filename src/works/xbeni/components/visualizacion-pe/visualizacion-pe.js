import { LitElement, html } from 'lit-element';
import { item008ListaPeStyles } from '../../archivos_comunes/ac_visualizacion-pe/styles_items008';
import { CONSTANTS_ITEM008 } from '../../archivos_comunes/ac_visualizacion-pe/constants_item008';
import { extraerDatosListaPe, getDatosDescripcionPe } from '../../archivos_comunes/ac_visualizacion-pe/moks_item008';
import { svgBeniX } from '../../archivos_comunes/ac_visualizacion-pe/svg_item008';

class BeniListaPe extends LitElement {
  static get properties() {
    return {
      tituloLista: { type: String },
      datosListaPe: { type: Object }
    };
  }

  constructor() {
    super();
    this.tituloLista = 'Lista de peticiones';
    this.datosListaPe = extraerDatosListaPe();
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
              <label class="label_header_titulo">${this.tituloLista}</label>
            </div>
          </div>
            <div class="div_main_pe">
              <div class="div_main_body_tabla">
                ${this.generateTablePetitions()}
              </div>
            </div>
          </div>
          <div id="${CONSTANTS_ITEM008.idBodyDetallesPe}" class="div_body_resultados_pe">
          <div>
            <div class="div_resultados_pe_campos">
              <div class="div_resultados_titulo_pe">
                <label class="texto_resultados_pe">Titulo: </label>
                <label class="texto_resultados_pe_id" id="${CONSTANTS_ITEM008.idResultadosTitulo}"> Analista
                  Programador
                  Java</label>
                </div>
              <div class="div_resultados_fecha_publicacion_pe">
                <label class="texto_resultados_pe">Fecha publicacion: </label>
                <label class="texto_resultados_pe_id" id="${CONSTANTS_ITEM008.idResultadosFechaPublicacion}">18/08/2020</label>
              </div>
              <div class="div_controles_detalles_pe">
                <div @click="${this.hiddenDateResults}" class="div_x_header_pe">
                  ${svgBeniX}
                </div>
              </div>
            </div>
          </div>
          <div class="div_resultados_descripcion_pe">
            <label class="texto_resultados_pe">Descripcion:</label><br>
            <textarea disabled id="${CONSTANTS_ITEM008.idResultadosDescripcionPublicacion}" class="textarea_resultados_pe"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  generateTablePetitions() {
    return html`
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
        ${Object.keys(this.datosListaPe).map(item => html`
          <tr>
            <td>
              <label @click=${() => this.loadDateResults(this.datosListaPe[item].id_peticion, this.datosListaPe[item].titulo, this.datosListaPe[item].fecha_publicacion)} class="label_titulo_tabla_pe">
                ${this.datosListaPe[item].titulo}
              </label>
            </td>
            <td>
              <label>
                ${this.datosListaPe[item].fecha_publicacion}
              </label>
            </td>
          </tr>
        `)}
      </table>
    `;
  }

  hiddenDateResults() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.idBodyDetallesPe).style.display = 'none';
  }

  loadDateResults(idPeticion, tituloPeticion, fechaPeticion) {
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.idResultadosTitulo).textContent = tituloPeticion;
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.idResultadosFechaPublicacion).textContent = fechaPeticion;
    // SOLICITUD AJAX QUE RPEGUNTE POR LA DESCRIPCION
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.idResultadosDescripcionPublicacion).textContent = getDatosDescripcionPe(idPeticion);
    this.shadowRoot.getElementById(CONSTANTS_ITEM008.idBodyDetallesPe).style.display = 'block';
  }
}

customElements.define('visualizacion-pe', BeniListaPe);
