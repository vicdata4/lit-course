/* eslint-disable camelcase */
import { LitElement, css, html } from 'lit-element';

class BeniListaPe extends LitElement {
  static get properties() {
    return {
      titulo_lista: { type: String },
      datos_lista_pe: { type: Object },
      id_resultados_titulo: { type: String, attribute: false },
      id_resultados_fecha_publicacion: { type: String, attribute: false },
      id_resultados_descripcion_publicacion: { type: String, attribute: false },
      id_body_detalles_pe: { type: String }
    };
  }

  constructor() {
    super();
    this.titulo_lista = 'Lista de peticiones';
    this.datos_lista_pe = this.extraer_datos_lista_pe();
    this.id_resultados_titulo = 'id_resultados_titulo';
    this.id_resultados_fecha_publicacion = 'id_resultados_fecha_publicacion';
    this.id_resultados_descripcion_publicacion = 'id_resultados_descripcion_publicacion';
    this.id_body_detalles_pe = 'id_body_detalles_pe';
  }

  static get styles() {
    return css`
        /* ESTILOS CUERPO PRINCIPAL PE */

            .div_body_full {
                display: flex;
                width: 100%;
                flex-flow: row wrap;
                justify-content: flex-start;
            }

            .div_body_pe {
                width: max-content;
                margin-right: 20px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                height:max-content;
                margin-bottom:10px;
            }

            .div_body_resultados_pe {
                display:none;
                width: max-content;
                border-radius:7px;
                padding: 7px;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                margin-bottom:10px;
            }
            
            .div_header_pe {
                display: flex;
                align-items: center;
                background-color: #00076e;
                color:white;
                padding-bottom:3px;
                padding-left:5px;
            }

            .div_header_titulo_pe {
                padding-left: 5px;
                float: left;
            }

            .label_header_titulo{
                font-size:16px;
                font-weight: bold;
            }


            /*ESTILOS TABLA PE */
            .table_pe {
                width:100%;
                border: 2px solid #20208869;
                border-collapse: collapse;
            }

            .table_pe tr:nth-child(even){background-color: #f2f2f2;}

            .table_pe tr:hover {background-color: #ff000027;}

            .table_pe td, .table_pe th {
                border: 1px solid #00000039;
                padding: 5px;
            }

            .table_pe th {
                background-color: #68686a69;
                text-align: left;
            }

            .label_titulo_tabla_pe {
                text-decoration: underline;
                color: #0000e0;
                cursor: pointer;
            }
            /* FIN ESTILOS TABLA PE */

            /* SECTION RESULTADOS PE */

            .div_resultados_pe_campos{
                display: flex;
                width: 100%;
                flex-flow: row wrap;
                justify-content: flex-start;
                margin-bottom:8px;
            }

            .texto_resultados_pe{
                font-size:17px;
                font-weight:bold;
            }

            .div_resultados_titulo_pe {
                margin-right: 70px;
            }

            .texto_resultados_pe_id{
                font-size:17px;
                font-weight:500;
            }

            .div_resultados_fecha_publicacion_pe{
                margin-right: 30px;
            }

            .textarea_resultados_pe{
                width: 100%;
                height: 175px;
                padding: 12px 10px;
                box-sizing: border-box;
                border: 1px solid rgba(12, 12, 12, 0.5);
                border-radius: 7px;
                background-color: #f8f8f8;
                font-size: 14px;
                resize: both;
                color: #00032b;
                font-weight:500;
            }

        .svg_eliminar_pe {
            width: 25px;
            height: auto;
            margin: 0;
            cursor: pointer;
            overflow: visible;
            fill: #ff0000;
        }

        .svg_eliminar_pe:hover {
            fill: #00032b;
        }

        .div_x_header_pe {
            padding-right: 1px;
            padding-top: 1px;
            float: right;
            height: 22px;
            padding-left: 5px;
        }

        .div_controles_detalles_pe {
            margin-left: auto;
            float: right;
        }


            `;
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
            <div id="${this.id_body_detalles_pe}" class="div_body_resultados_pe">
                <div>
                    <div class="div_resultados_pe_campos">
                        <div class="div_resultados_titulo_pe">
                            <label class="texto_resultados_pe">Titulo: </label>
                            <label class="texto_resultados_pe_id" id="${this.id_resultados_titulo}"> Analista Programador
                                Java</label>
                        </div>
                        <div class="div_resultados_fecha_publicacion_pe">
                            <label class="texto_resultados_pe">Fecha publicacion: </label>
                            <label class="texto_resultados_pe_id"
                                id="${this.id_resultados_fecha_publicacion}">18/08/2020</label>
                        </div>
                        <div class="div_controles_detalles_pe">
                            <div @click="${this.hidden_date_results}" class="div_x_header_pe">
                                <svg class="svg_eliminar_pe" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 392.619 392.619"
                                    style="enable-background:new 0 0 392.619 392.619;" xml:space="preserve">
                                    <g>
                                        <path
                                            d="M310.724,0.929H81.896C36.738,0.929,0,37.667,0,82.825v226.969c0,45.158,36.738,81.896,81.896,81.896h228.828 c45.157,0,81.896-36.738,81.896-81.896V82.825C392.619,37.667,355.881,0.929,310.724,0.929z M362.619,309.794 c0,28.616-23.28,51.896-51.896,51.896H81.896C53.28,361.69,30,338.41,30,309.794V82.825c0-28.615,23.28-51.896,51.896-51.896 h228.828c28.615,0,51.896,23.28,51.896,51.896V309.794z" />
                                        <path
                                            d="M286.559,107.182c-5.839-5.877-15.336-5.908-21.214-0.069l-66.539,66.106l-66.572-66.572 c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l66.502,66.503l-65.968,65.539 c-5.877,5.839-5.907,15.336-0.069,21.213c2.933,2.952,6.786,4.428,10.642,4.428c3.822,0,7.646-1.452,10.572-4.359l66.037-65.608 l66.073,66.073c2.929,2.929,6.768,4.394,10.606,4.394c3.838,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213 l-66.004-66.004l66.47-66.038C292.366,122.556,292.396,113.059,286.559,107.182z" />
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="div_resultados_descripcion_pe">
                    <label class="texto_resultados_pe">Descripcion:</label><br>
                    <textarea disabled id="${this.id_resultados_descripcion_publicacion}" class="textarea_resultados_pe"></textarea>
                </div>
            </div>
        </div>
        `;
  }

  hidden_date_results() {
    this.shadowRoot.getElementById(this.id_body_detalles_pe).style.display = 'none';
  }

  load_date_results(id_peticion, titulo_peticion, fecha_peticion) {
    this.shadowRoot.getElementById(this.id_resultados_titulo).textContent = titulo_peticion;
    this.shadowRoot.getElementById(this.id_resultados_fecha_publicacion).textContent = fecha_peticion;
    this.shadowRoot.getElementById(this.id_body_detalles_pe).style.display = 'block';

    // UNA VEZ HECHA LA CONSULTA AJAX ELIMINAR ESTA LINEA DE CODIGO
    this.shadowRoot.getElementById(this.id_resultados_descripcion_publicacion).textContent = 'Requisitos:\nUn año de experiencia minimo\nLugar de Trabajo: Las Tablas\nActividades:\nAutomatización de pruebas\nDescripcion se obtendra de ajax una vez que se conecte a la base datos.';

    /*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var resultados = JSON.parse(this.response);
                //SOLO HACE FALTA CARGAR EL DATO DE LA DESCRIPCION, EL TITULO Y FECHA SE SOLICITAN EN LA 1 CONSULTA AJAX
                this.shadowRoot.getElementById(this.id_resultados_descripcion_publicacion).textContent = "DESCRIPCION PRUEBAA";
            }
        }
        var parametros_enviar = 'id_peticion=' + id_peticion;
        xhttp.open("POST", "RUTA EXTRACCION DE DATOS", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(parametros_enviar);
        */
  }

  extraer_datos_lista_pe() {
    /* AL IMPLEMENTAR EN PRODUCCION */
    /* HACER CONSULTA AJAX QUE EXTRAIGA DE LA BASE DE DATOS DE LA TABLA DE PETICIONES - TITULO Y FECHA PUBLICACION (Ej: consulta mysql: SELECT titulo,fecha_pub,id_peticion FROM peticiones WHERE check_publicar_peticion = true)  */

    return [{ titulo: 'Tester Junior', fecha_publicacion: '16/09/2020', id_peticion: 'PET_201' }, { titulo: 'Analista Programador Java', fecha_publicacion: '18/08/2020', id_peticion: 'PET_202' }, { titulo: 'Prueba programador', fecha_publicacion: '16/09/2020', id_peticion: 'PET_203' }];
  }
}

customElements.define('item012-lista-pe', BeniListaPe);
