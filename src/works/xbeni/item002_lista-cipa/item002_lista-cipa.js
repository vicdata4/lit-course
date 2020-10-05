/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import { LitElement, css, html } from 'lit-element';

export class BeniListaCipa extends LitElement {
  constructor() {
    super();
    // datos_cipa > ES DONDE SE CARGAN LOS DATOS PARA QUE EL OBJETO FUNCIONE CORRECTAMENTE | EXTRAERLOS CON AJAX DE LA BASE DATOS*/
    this.datos_cipa = this.cargar_informacion_candidatos_cipa();
    this.titulo_formulario = 'Lista de candidatos con información pendiente a actualizar';
    this.table_id = 'table_cipa';
    this.div_body_cipa = 'div_body_cipa';
    this.div_body_abrir_cipa = 'div_body_abrir_cipa';
    this.label_ordenar_nombre_id = 'label_ordenar_nombre_id';
    this.label_ordenar_correo_id = 'label_ordenar_correo_id';
    this.label_ordenar_perfil_id = 'label_ordenar_perfil_id';
    this.label_ordenar_plantilla_id = 'label_ordenar_plantilla_id';
    this.label_ordenar_fua_id = 'label_ordenar_fua_id';
    this.label_ordenar_fv_id = 'label_ordenar_fv_id';
  }

  static get properties() {
    return {
      datos_cipa: { type: Object },
      titulo_formulario: { type: String },
      table_id: { type: String },
      div_body_cipa: { type: String },
      div_body_abrir_cipa: { type: String },
      label_ordenar_nombre_id: { type: String, attribute: false },
      label_ordenar_correo_id: { type: String, attribute: false },
      label_ordenar_perfil_id: { type: String, attribute: false },
      label_ordenar_plantilla_id: { type: String, attribute: false },
      label_ordenar_fua_id: { type: String, attribute: false },
      label_ordenar_fv_id: { type: String, attribute: false }
    };
  }

  static get styles() {
    return css`

        .div_body_cipa{
            width: 100%;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        .div_body_abrir_cipa {
            display: none;
        }

        .div_header_cipa {
            display: flex;
            align-items: center;
            background-color: #00076e;
            color:white;
            padding-bottom:3px;
        }

        .div_titulo_cipa {
            padding-left: 5px;
            float: left;
        }

        .div_header_controles_cipa {
            margin-left: auto;
            height: auto;
        }

        .svg_eliminar_cipa {
            width: 25px;
            height: auto;
            margin: 0;
            cursor: pointer;
            overflow: visible;
            fill: #ff0000;
        }

        .svg_eliminar_cipa:hover {
            fill: yellow;
        }

        .div_x_header_cipa {
            padding-right: 1px;
            padding-top: 1px;
            float: right;
            height: 22px;
            padding-left: 5px;
        }

        .div_main_cipa {
            overflow: auto;
        }

        .titulo_header_cipa {
            font-size:16px;
            font-weight: bold;
        }

        .tabla_cipa {
            width:100%;
            border: 2px solid #20208869;
            border-collapse: collapse;
        }

        .tabla_cipa tr:nth-child(even){background-color: #f2f2f2;}

        .tabla_cipa tr:hover {background-color: #ff000027;}

        .tabla_cipa td, .tabla_cipa th {
            border: 1px solid #00000039;
            padding: 5px;
        }

        .tabla_cipa th {
            background-color: #68686a69;
            text-align: left;
        }

        .campo_ordenar{
            margin-left: auto;
            float:right;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        .div_flex_th_cipa {
            display: flex;
        }

        .div_texto_campo_ordenar {
            margin-top: -10px;
        }

        .texto_campo_ordenar{
            font-size: 9px;
        }

        .svg_cipa{
            width:17px;
            height:auto;
        }

        .svg_cipa:hover {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }

        .label_nombre_candidato_cipa {
            text-decoration: underline;
            color: #0000e0;
            cursor: pointer;
        }

        /* CSS CHECKBOX EN PLANTILLA */
        .checkbox > input[type=checkbox] {
            visibility: hidden;
        }

        .checkbox {
        position: relative;
        display: block;
        width: 80px;
        height: 20px;
        margin: 0 auto;
        background: #FFF;
        border: 1px solid #2E2E2E;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        }

        .checkbox:after {
        position: absolute;
        display: inline;
        right: 10px;
        content: 'No';
        color: #E53935;
        font: 10px/22px Arial, sans-serif;
        font-weight: bold;
        text-transform: capitalize;
        z-index: 0;
        }

        .checkbox:before {
        position: absolute;
        display: inline;
        left: 10px;
        content: 'Si';
        color: #43A047;
        font: 10px/22px Arial, sans-serif;
        font-weight: bold;
        text-transform: capitalize;
        z-index: 0;
        }

        .checkbox label {
        position: absolute;
        display: block;
        top: 3px;
        left: 3px;
        width: 34px;
        height: 15px;
        background: #2E2E2E;
        cursor: pointer;
        transition: all 0.5s linear;
        -webkit-transition: all 0.5s linear;
        -moz-transition: all 0.5s linear;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        z-index: 1;
        }

        .checkbox input[type=checkbox]:checked + label {
        left: 43px;
        }

        /* FIN CSS CHECKBOX EN PLANTILLA */

        .svg_semaforo_rojo{
            width:20px;
            height:auto;
        }

        .svg_semaforo_amarillo{
            fill:yellow;
            width:auto;
            height:auto;
        }

        .div_semaforo {
            text-align: center;
        }


        /* BOTON ABRIR FORMULARIO */
        .div_button_abrir_cipa{
            margin-top: 7px;
            padding-top: 7px;
            padding-bottom: 7px;
        }

        .button_abrir_cipa{
            background-color: #063146;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            text-decoration-line: underline;
            cursor: pointer;
            color: white;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            font-size: 15px;
            padding-top: 3px;
            padding-bottom: 7px;

        }

        .button_abrir_cipa:hover{
            opacity: 0.8;
            text-decoration-color: red;
        }
    `;
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
            <div id="${this.div_body_abrir_cipa}" class="div_body_abrir_cipa">
                <div class="div_button_abrir_cipa">
                    <button @click="${this.hidden_body_abrir_cipa}" class="button_abrir_cipa" >Abrir lista de candidatos con información pendiente a actualizar </button>
                </div>
            </div>
            <div id="${this.div_body_cipa}"  class="div_body_cipa">
                <div class="div_header_cipa">
                    <div class="div_titulo_cipa">
                        <!-- EL TITULO FORMULARIO SE PUEDE MODIFICAR SEGUN SE DESEE -->
                        <label class="titulo_header_cipa">${this.titulo_formulario}</label>
                    </div>
                    <div class="div_header_controles_cipa">
                        <div @click="${this.hidden_body_cipa}" class="div_x_header_cipa">
                            <svg class="svg_eliminar_cipa" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 392.619 392.619" style="enable-background:new 0 0 392.619 392.619;" xml:space="preserve"><g><path d="M310.724,0.929H81.896C36.738,0.929,0,37.667,0,82.825v226.969c0,45.158,36.738,81.896,81.896,81.896h228.828 c45.157,0,81.896-36.738,81.896-81.896V82.825C392.619,37.667,355.881,0.929,310.724,0.929z M362.619,309.794 c0,28.616-23.28,51.896-51.896,51.896H81.896C53.28,361.69,30,338.41,30,309.794V82.825c0-28.615,23.28-51.896,51.896-51.896 h228.828c28.615,0,51.896,23.28,51.896,51.896V309.794z"/><path d="M286.559,107.182c-5.839-5.877-15.336-5.908-21.214-0.069l-66.539,66.106l-66.572-66.572 c-5.857-5.858-15.355-5.858-21.213,0c-5.858,5.858-5.858,15.355,0,21.213l66.502,66.503l-65.968,65.539 c-5.877,5.839-5.907,15.336-0.069,21.213c2.933,2.952,6.786,4.428,10.642,4.428c3.822,0,7.646-1.452,10.572-4.359l66.037-65.608 l66.073,66.073c2.929,2.929,6.768,4.394,10.606,4.394c3.838,0,7.678-1.465,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213 l-66.004-66.004l66.47-66.038C292.366,122.556,292.396,113.059,286.559,107.182z"/></g></svg>
                        </div>
                    </div>
                </div>
                <div class="div_main_cipa">
                    <!--  COMIENZO TABLA -->
                    <table id="${this.table_id}" class="tabla_cipa">
                        <!--  HEADER TABLA -->
                        <tr>
                            <th scope="row">
                                <div class="div_flex_th_cipa">
                                    <div>
                                        <label>Nombre</label>
                                    </div>
                                    <div @click=${() => this.ordenar_tabla_string_cipa(0, 'str')} class="campo_ordenar">
                                        <svg version="1.1" class="svg_cipa" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.626px"
                                            height="511.627px" viewBox="0 0 511.626 511.627"
                                            style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M215.232,401.991h-54.818V9.136c0-2.663-0.854-4.856-2.568-6.567C156.133,0.859,153.946,0,151.279,0H96.461c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H32.507c-4.184,0-7.039,1.902-8.563,5.708c-1.525,3.621-0.856,6.95,1.997,9.996l91.361,91.365c2.096,1.707,4.281,2.562,6.567,2.562c2.474,0,4.664-0.855,6.567-2.562l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.854-4.859-2.568-6.584C220.086,402.847,217.9,401.991,215.232,401.991z" />
                                                    <path
                                                        d="M428.511,479.082h-70.808c-3.997,0-6.852,0.191-8.559,0.568l-4.001,0.571v-0.571l3.142-3.142c2.848-3.419,4.853-5.896,5.996-7.409l105.344-151.331v-25.406H297.744v65.377h34.263v-32.832h66.236c3.422,0,6.283-0.288,8.555-0.855c0.572,0,1.287-0.048,2.143-0.145c0.853-0.085,1.475-0.144,1.852-0.144v0.855l-3.142,2.574c-1.704,1.711-3.713,4.273-5.995,7.706L296.31,485.934v25.693h166.734v-66.521h-34.54v33.976H428.511z" />
                                                    <path
                                                        d="M468.475,189.008L402.807,0h-46.25l-65.664,189.008h-19.979v30.264h81.933v-30.264h-21.409l13.419-41.112h69.381l13.415,41.112H406.25v30.264h82.228v-30.264H468.475z M354.278,116.487l20.841-62.241c0.76-2.285,1.479-5.046,2.143-8.28c0.66-3.236,0.996-4.949,0.996-5.139l0.855-5.708h1.143c0,0.761,0.191,2.664,0.562,5.708l3.433,13.418l20.554,62.241H354.278z" />
                                                </g>
                                            </g>
                                        </svg>
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${this.label_ordenar_nombre_id}" class="texto_campo_ordenar"></label>
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
                                        <svg version="1.1" class="svg_cipa" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.626px"
                                            height="511.627px" viewBox="0 0 511.626 511.627"
                                            style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M215.232,401.991h-54.818V9.136c0-2.663-0.854-4.856-2.568-6.567C156.133,0.859,153.946,0,151.279,0H96.461c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H32.507c-4.184,0-7.039,1.902-8.563,5.708c-1.525,3.621-0.856,6.95,1.997,9.996l91.361,91.365c2.096,1.707,4.281,2.562,6.567,2.562c2.474,0,4.664-0.855,6.567-2.562l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.854-4.859-2.568-6.584C220.086,402.847,217.9,401.991,215.232,401.991z" />
                                                    <path
                                                        d="M428.511,479.082h-70.808c-3.997,0-6.852,0.191-8.559,0.568l-4.001,0.571v-0.571l3.142-3.142c2.848-3.419,4.853-5.896,5.996-7.409l105.344-151.331v-25.406H297.744v65.377h34.263v-32.832h66.236c3.422,0,6.283-0.288,8.555-0.855c0.572,0,1.287-0.048,2.143-0.145c0.853-0.085,1.475-0.144,1.852-0.144v0.855l-3.142,2.574c-1.704,1.711-3.713,4.273-5.995,7.706L296.31,485.934v25.693h166.734v-66.521h-34.54v33.976H428.511z" />
                                                    <path
                                                        d="M468.475,189.008L402.807,0h-46.25l-65.664,189.008h-19.979v30.264h81.933v-30.264h-21.409l13.419-41.112h69.381l13.415,41.112H406.25v30.264h82.228v-30.264H468.475z M354.278,116.487l20.841-62.241c0.76-2.285,1.479-5.046,2.143-8.28c0.66-3.236,0.996-4.949,0.996-5.139l0.855-5.708h1.143c0,0.761,0.191,2.664,0.562,5.708l3.433,13.418l20.554,62.241H354.278z" />
                                                </g>
                                            </g>
                                        </svg>
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${this.label_ordenar_correo_id}" class="texto_campo_ordenar"></label>
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
                                        <svg version="1.1" class="svg_cipa" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.626px"
                                            height="511.627px" viewBox="0 0 511.626 511.627"
                                            style="enable-background:new 0 0 511.626 511.627;" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M215.232,401.991h-54.818V9.136c0-2.663-0.854-4.856-2.568-6.567C156.133,0.859,153.946,0,151.279,0H96.461c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H32.507c-4.184,0-7.039,1.902-8.563,5.708c-1.525,3.621-0.856,6.95,1.997,9.996l91.361,91.365c2.096,1.707,4.281,2.562,6.567,2.562c2.474,0,4.664-0.855,6.567-2.562l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.854-4.859-2.568-6.584C220.086,402.847,217.9,401.991,215.232,401.991z" />
                                                    <path
                                                        d="M428.511,479.082h-70.808c-3.997,0-6.852,0.191-8.559,0.568l-4.001,0.571v-0.571l3.142-3.142c2.848-3.419,4.853-5.896,5.996-7.409l105.344-151.331v-25.406H297.744v65.377h34.263v-32.832h66.236c3.422,0,6.283-0.288,8.555-0.855c0.572,0,1.287-0.048,2.143-0.145c0.853-0.085,1.475-0.144,1.852-0.144v0.855l-3.142,2.574c-1.704,1.711-3.713,4.273-5.995,7.706L296.31,485.934v25.693h166.734v-66.521h-34.54v33.976H428.511z" />
                                                    <path
                                                        d="M468.475,189.008L402.807,0h-46.25l-65.664,189.008h-19.979v30.264h81.933v-30.264h-21.409l13.419-41.112h69.381l13.415,41.112H406.25v30.264h82.228v-30.264H468.475z M354.278,116.487l20.841-62.241c0.76-2.285,1.479-5.046,2.143-8.28c0.66-3.236,0.996-4.949,0.996-5.139l0.855-5.708h1.143c0,0.761,0.191,2.664,0.562,5.708l3.433,13.418l20.554,62.241H354.278z" />
                                                </g>
                                            </g>
                                        </svg>
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${this.label_ordenar_perfil_id}" class="texto_campo_ordenar"></label>
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
                                        <svg version="1.1" class="svg_cipa" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.627px"
                                            height="511.627px" viewBox="0 0 511.627 511.627"
                                            style="enable-background:new 0 0 511.627 511.627;" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M260.494,219.271H388.4c2.666,0,4.855-0.855,6.563-2.57c1.715-1.713,2.573-3.9,2.573-6.567v-54.816c0-2.667-0.858-4.854-2.573-6.567c-1.708-1.711-3.897-2.57-6.563-2.57H260.494c-2.666,0-4.853,0.855-6.567,2.57c-1.71,1.713-2.568,3.9-2.568,6.567v54.816c0,2.667,0.855,4.854,2.568,6.567C255.641,218.413,257.828,219.271,260.494,219.271z" />
                                                    <path
                                                        d="M260.497,73.089h73.087c2.666,0,4.856-0.855,6.563-2.568c1.718-1.714,2.563-3.901,2.563-6.567V9.136c0-2.663-0.846-4.853-2.563-6.567C338.44,0.859,336.25,0,333.584,0h-73.087c-2.666,0-4.853,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v54.818c0,2.666,0.855,4.853,2.568,6.567C255.645,72.23,257.831,73.089,260.497,73.089z" />
                                                    <path d="M196.54,401.991h-54.817V9.136c0-2.663-0.854-4.856-2.568-6.567C137.441,0.859,135.254,0,132.587,0H77.769c-2.663,0-4.856,0.855-6.567,2.568c-1.709,1.715-2.568,3.905-2.568,6.567v392.855H13.816c-4.184,0-7.04,1.902-8.564,5.708c-1.525,3.621-0.855,6.95,1.997,9.996l91.361,91.365c2.094,1.707,4.281,2.562,6.567,2.562c2.474,0,4.665-0.855,6.567-2.562l91.076-91.078c1.906-2.279,2.856-4.571,2.856-6.844c0-2.676-0.859-4.859-2.568-6.584C201.395,402.847,199.208,401.991,196.54,401.991z" />
                                                    <path
                                                        d="M504.604,441.109c-1.715-1.718-3.901-2.573-6.567-2.573H260.497c-2.666,0-4.853,0.855-6.567,2.573c-1.709,1.711-2.568,3.901-2.568,6.564v54.815c0,2.673,0.855,4.853,2.568,6.571c1.715,1.711,3.901,2.566,6.567,2.566h237.539c2.666,0,4.853-0.855,6.567-2.566c1.711-1.719,2.566-3.898,2.566-6.571v-54.815C507.173,445.011,506.314,442.82,504.604,441.109z" />
                                                    <path
                                                        d="M260.494,365.445H443.22c2.663,0,4.853-0.855,6.57-2.566c1.708-1.711,2.563-3.901,2.563-6.563v-54.823c0-2.662-0.855-4.853-2.563-6.563c-1.718-1.711-3.907-2.566-6.57-2.566H260.494c-2.666,0-4.853,0.855-6.567,2.566c-1.71,1.711-2.568,3.901-2.568,6.563v54.823c0,2.662,0.855,4.853,2.568,6.563C255.641,364.59,257.828,365.445,260.494,365.445z" />
                                                </g>
                                            </g>
                                        </svg>
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${this.label_ordenar_plantilla_id}" class="texto_campo_ordenar"></label>
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
                                        <svg version="1.1" class="svg_cipa" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.63px"
                                            height="511.63px" viewBox="0 0 511.63 511.63"
                                            style="enable-background:new 0 0 511.63 511.63;" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M240.214,401.994h-54.816V9.139c0-2.663-0.855-4.856-2.57-6.567c-1.713-1.709-3.899-2.568-6.567-2.568h-54.816c-2.664,0-4.858,0.856-6.567,2.568c-1.711,1.714-2.57,3.905-2.57,6.567v392.855H57.491c-4.186,0-7.042,1.903-8.566,5.709c-1.524,3.62-0.854,6.95,1.999,9.999l91.36,91.365c2.096,1.704,4.283,2.56,6.567,2.56c2.475,0,4.665-0.855,6.567-2.56l91.076-91.078c1.908-2.282,2.857-4.571,2.857-6.848c0-2.673-0.855-4.855-2.57-6.581C245.068,402.85,242.881,401.994,240.214,401.994z" />
                                                    <path
                                                        d="M407.804,292.369L407.804,292.369h-35.114l-54.823,52.814l23.421,24.55l17.7-16.556c3.425-3.433,5.899-6.379,7.419-8.854l1.995-3.429h0.571v4.568c0,0.955-0.055,2.57-0.144,4.856c-0.089,2.285-0.144,4.093-0.144,5.427v123.339h-47.671v32.544h133.902v-32.544h-47.109V292.369H407.804z" />
                                                    <path
                                                        d="M440.062,26.98C424.452,8.992,404.946,0,381.532,0c-20.749,0-37.973,6.949-51.679,20.845c-13.698,13.894-20.55,30.833-20.55,50.819c0,19.224,6.369,35.642,19.13,49.249c12.758,13.611,29.212,20.417,49.389,20.417c8.385,0,16.427-1.334,24.133-3.999c7.7-2.667,13.562-6.189,17.56-10.566h0.571c-3.046,16.558-9.377,30.404-18.986,41.54c-9.609,11.134-22.415,16.702-38.403,16.702c-7.228,0-14.366-1.237-21.402-3.711c-3.046-0.759-5.995-1.809-8.85-3.14l-11.136,32.264c3.426,1.332,7.419,2.758,11.995,4.283c8.75,3.044,19.034,4.569,30.833,4.569c13.135,0,25.267-2.329,36.401-6.993c11.137-4.665,20.513-10.9,28.12-18.702c7.618-7.806,14.089-16.892,19.418-27.264c5.328-10.373,9.229-21.223,11.703-32.548c2.478-11.326,3.72-22.886,3.72-34.689C463.485,69,455.673,44.971,440.062,26.98z M413.516,101.929c-6.659,5.14-14.753,7.71-24.267,7.71c-12.939,0-22.891-3.617-29.845-10.85c-6.943-7.232-10.424-16.274-10.424-27.122c0-10.85,2.95-19.794,8.85-26.836c5.896-7.043,13.798-10.566,23.698-10.566c11.229,0,21.033,5.042,29.414,15.131c8.377,10.09,12.559,21.128,12.559,33.12C423.501,90.319,420.175,96.792,413.516,101.929z" />
                                                </g>
                                            </g>
                                        </svg>
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${this.label_ordenar_fua_id}" class="texto_campo_ordenar"></label>
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
                                        <svg version="1.1" class="svg_cipa" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="511.63px"
                                            height="511.63px" viewBox="0 0 511.63 511.63"
                                            style="enable-background:new 0 0 511.63 511.63;" xml:space="preserve">
                                            <g>
                                                <g>
                                                    <path
                                                        d="M240.214,401.994h-54.816V9.139c0-2.663-0.855-4.856-2.57-6.567c-1.713-1.709-3.899-2.568-6.567-2.568h-54.816c-2.664,0-4.858,0.856-6.567,2.568c-1.711,1.714-2.57,3.905-2.57,6.567v392.855H57.491c-4.186,0-7.042,1.903-8.566,5.709c-1.524,3.62-0.854,6.95,1.999,9.999l91.36,91.365c2.096,1.704,4.283,2.56,6.567,2.56c2.475,0,4.665-0.855,6.567-2.56l91.076-91.078c1.908-2.282,2.857-4.571,2.857-6.848c0-2.673-0.855-4.855-2.57-6.581C245.068,402.85,242.881,401.994,240.214,401.994z" />
                                                    <path
                                                        d="M407.804,292.369L407.804,292.369h-35.114l-54.823,52.814l23.421,24.55l17.7-16.556c3.425-3.433,5.899-6.379,7.419-8.854l1.995-3.429h0.571v4.568c0,0.955-0.055,2.57-0.144,4.856c-0.089,2.285-0.144,4.093-0.144,5.427v123.339h-47.671v32.544h133.902v-32.544h-47.109V292.369H407.804z" />
                                                    <path
                                                        d="M440.062,26.98C424.452,8.992,404.946,0,381.532,0c-20.749,0-37.973,6.949-51.679,20.845c-13.698,13.894-20.55,30.833-20.55,50.819c0,19.224,6.369,35.642,19.13,49.249c12.758,13.611,29.212,20.417,49.389,20.417c8.385,0,16.427-1.334,24.133-3.999c7.7-2.667,13.562-6.189,17.56-10.566h0.571c-3.046,16.558-9.377,30.404-18.986,41.54c-9.609,11.134-22.415,16.702-38.403,16.702c-7.228,0-14.366-1.237-21.402-3.711c-3.046-0.759-5.995-1.809-8.85-3.14l-11.136,32.264c3.426,1.332,7.419,2.758,11.995,4.283c8.75,3.044,19.034,4.569,30.833,4.569c13.135,0,25.267-2.329,36.401-6.993c11.137-4.665,20.513-10.9,28.12-18.702c7.618-7.806,14.089-16.892,19.418-27.264c5.328-10.373,9.229-21.223,11.703-32.548c2.478-11.326,3.72-22.886,3.72-34.689C463.485,69,455.673,44.971,440.062,26.98z M413.516,101.929c-6.659,5.14-14.753,7.71-24.267,7.71c-12.939,0-22.891-3.617-29.845-10.85c-6.943-7.232-10.424-16.274-10.424-27.122c0-10.85,2.95-19.794,8.85-26.836c5.896-7.043,13.798-10.566,23.698-10.566c11.229,0,21.033,5.042,29.414,15.131c8.377,10.09,12.559,21.128,12.559,33.12C423.501,90.319,420.175,96.792,413.516,101.929z" />
                                                </g>
                                            </g>
                                        </svg>
                                        <div class="div_texto_campo_ordenar">                    
                                            <label id="${this.label_ordenar_fv_id}" class="texto_campo_ordenar"></label>
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
    ? html`
                                        <svg width="18px" height="18px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="9" cy="9" r="8" stroke="black" stroke-width="1" fill="red"/>
                                        </svg>
                                        `
    : html`
                                            ${this.calcular_diferencia_fecha_semaforo(this.calcular_fecha_vencimiento(this.datos_cipa[item].fecha_ultima_actualizacion)) === 'amarillo'
    ? html`            
                                                    <svg width="18px" height="18px" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9" r="8" stroke="black" stroke-width="1" fill="yellow"/>
                                                    </svg>`
    : html``
}
                                        `
}
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

  /* FUNCIONES JS */

  /* CARGAR LOS DATOS EN EL COMPONENTE | ELIMINAR DATOS EN LA BASE DE DATOS */
  cargar_informacion_candidatos_cipa() {
    /*
         1- HACER FUNCION AJAX QUE CARGUE TODOS LOS CANDIDATOS DE LA TABLA DE DATOS.
            1.1- HACER FUNCION QUE COMPARE LOS DATOS RECIBIDOS Y QUE CALCULE SI LA FECHA ACTUAL SUPERO LOS 18 MESES DE FECHA DE VENCIMIENTO
                1.1.1-LOS CANDIDATOS QUE SALGAN POSITIVO HACER OTRA FUNCION AJAX QUE LOS ELIMINE DE LA BASE DE DATOS
            1.2 LOS CANDIDATOS QUE SUPEREN EL FILTRO DE DE FECHAS QUE SE CARGUEN EN EL COMPONENTE
    */

    /* FORMATO QUE DEBE RECIBIR Nombre="String", Email="String", telefono="String/Number", perfil="String", en_plantilla="boolean"(true="SI",false="NO"), fecha_ultima_actualizacion="STRING"(formato(dd/mm/yyyy)) */
    return [{ nombre: 'Maria Mendoza', email: 'mm@gmail.com', telefono: '465464654', perfil: 'programador', en_plantilla: false, fecha_ultima_actualizacion: '25/4/2019' }, { nombre: 'Luisa Ojeda', email: 'lo@gmail.com', telefono: '658464132', perfil: 'programador', en_plantilla: true, fecha_ultima_actualizacion: '05/06/2019' }, { nombre: 'Javier Hernande', email: 'jehk@gmail.com', telefono: '645632111', perfil: 'arquitecto devop', en_plantilla: false, fecha_ultima_actualizacion: '11/06/2019' }, { nombre: 'Rocio Canales', email: 'rocio.canales@alvea.es', telefono: '652488965', perfil: 'programador', en_plantilla: true, fecha_ultima_actualizacion: '11/03/2019' }];
  }

  hidden_body_cipa() {
    this.shadowRoot.getElementById(this.div_body_cipa).style.display = 'none';
    this.shadowRoot.getElementById(this.div_body_abrir_cipa).style.display = 'block';
  }

  hidden_body_abrir_cipa() {
    this.shadowRoot.getElementById(this.div_body_cipa).style.display = 'block';
    this.shadowRoot.getElementById(this.div_body_abrir_cipa).style.display = 'none';
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
    table = this.shadowRoot.getElementById(this.table_id);
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* INDICAR EL ORDEN QUE HAY SELECCIONADO EN EL DIV > LABEL ORDENAR */
    if (n === 5) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(this.label_ordenar_fua_id).innerHTML = 'ASC';
    }
    if (n === 6) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(this.label_ordenar_fv_id).innerHTML = 'ASC';
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
            this.shadowRoot.getElementById(this.label_ordenar_fua_id).innerHTML = 'DES';
          }
          if (n === 6) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(this.label_ordenar_fv_id).innerHTML = 'DES';
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
    table = this.shadowRoot.getElementById(this.table_id);
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* INDICAR EL ORDEN QUE HAY SELECCIONADO EN EL DIV > LABEL ORDENAR */
    if (n === 0) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(this.label_ordenar_nombre_id).innerHTML = 'ASC';
    }
    if (n === 1) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(this.label_ordenar_correo_id).innerHTML = 'ASC';
    }
    if (n === 3) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(this.label_ordenar_perfil_id).innerHTML = 'ASC';
    }
    if (n === 4) {
      this.vaciar_campos_ordena();
      this.shadowRoot.getElementById(this.label_ordenar_plantilla_id).innerHTML = 'SI';
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
            this.shadowRoot.getElementById(this.label_ordenar_nombre_id).innerHTML = 'DES';
          }
          if (n === 1) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(this.label_ordenar_correo_id).innerHTML = 'DES';
          }
          if (n === 3) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(this.label_ordenar_perfil_id).innerHTML = 'DES';
          }
          if (n === 4) {
            this.vaciar_campos_ordena();
            this.shadowRoot.getElementById(this.label_ordenar_plantilla_id).innerHTML = 'NO';
          }
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  vaciar_campos_ordena() {
    /* FUNCION QUE VACIA TODOS LOS CAMPOS DEL DIV ORDENAR - INTRODUCIDA PARA EVITAR REPETIR CODIGO */
    this.shadowRoot.getElementById(this.label_ordenar_nombre_id).innerHTML = '';
    this.shadowRoot.getElementById(this.label_ordenar_correo_id).innerHTML = '';
    this.shadowRoot.getElementById(this.label_ordenar_perfil_id).innerHTML = '';
    this.shadowRoot.getElementById(this.label_ordenar_plantilla_id).innerHTML = '';
    this.shadowRoot.getElementById(this.label_ordenar_fua_id).innerHTML = '';
    this.shadowRoot.getElementById(this.label_ordenar_fv_id).innerHTML = '';
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

customElements.define('item002_lista-cipa', BeniListaCipa);
