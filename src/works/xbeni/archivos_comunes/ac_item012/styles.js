import { css } from 'lit-element';

export const item012ReporteHceapStyles = css`

.div_body_control_hceap{
  width: max-content;
  border-radius:7px;
  padding: 7px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom:10px;
  overflow: auto;
}

.div_header_control_hceap {
  font-size: 22px;
  font-weight: 500;
  margin-bottom:15px;
}

.div_flex_hceap{
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.div_campos_hceap{
  width:130px;
  font-size:20px;
}

.div_campos_datos{
  width: max-content;
}

.select_hceap {
  width: max-content;
  padding-right: 50px;
  font-size: 100%;
}

.button_generar_reporte{
  width:100%;
  font-size:100%;
  padding-top:3px;
  padding-bottom:3px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  background-color: #000442;
  color:white;
  cursor:pointer;
}

.button_generar_reporte:hover{
  opacity: 0.8;
}

/* DIV ERRORES */
.div_errores_hceap{
  display: none;
  background-color: #ff000050;
  padding:3px;
  margin-bottom:5px;
}

.div_exito_hceap{
  display:none;
  background-color: #02ff0f50;
  padding:3px;
  margin-top:5px;
  margin-bottom:5px;
}

.div_body_reporte_generado_hceap {
  overflow: auto;
}

/*ESTILOS TABLA HCEAP */
.table_hceap {
  width:100%;
  border: 2px solid #20208869;
  border-collapse: collapse;
  overflow:auto;
}

.table_hceap tr:nth-child(even){background-color: #f2f2f2;}

.table_hceap tr:hover {background-color: #ff000027;}

.table_hceap td, .table_hceap th {
  border: 1px solid #00000039;
  padding: 5px;
}

.table_hceap th {
  background-color: #68686a69;
  text-align: left;
}
/* FIN ESTILOS TABLA PE */

`;
