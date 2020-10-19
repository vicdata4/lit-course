import { css } from 'lit-element';

export const informeCipaStyles = css`
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
