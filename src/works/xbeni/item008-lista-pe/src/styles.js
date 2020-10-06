import { css } from 'lit-element';

export const item008ListaPeStyles = css`
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
