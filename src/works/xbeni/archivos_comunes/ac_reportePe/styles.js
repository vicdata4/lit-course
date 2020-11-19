import { css } from 'lit-element';

export const RpeStyles = css`
  .divBodyControlRpe {
    width: max-content;
    border-radius: 4px;
    padding: 7px;
    margin-bottom: 10px;
    overflow: auto;
  }

  .divBodyRpe {
    box-sizing: border-box;
  }

  .divHeaderControlRpe {
    font-weight: 400;
    color: #23282d;
    font-size: 1.3em;
    margin: 1em 0;
    font-family: Roboto, 'Open Sans';
    line-height: 1.4em;
    font-size: 22px;
  }

  .divFlexRpe {
    display: flex;
    width: 100%;
    /*flex-flow: row wrap;*/
    /*justify-content: flex-start;*/
    margin-bottom: 10px;
  }

  .divCamposRpe {
    width: 300px;
    font-size: 20px;
    color: #23282d;
    font-weight: 500;
    text-shadow: none;
    font-family: Roboto, 'Open Sans';
  }

  .divCamposDatos {
    width: 100%;
  }

  .selectRpe {
    font-size: 14px;
    line-height: 2;
    color: #32373c;
    border-color: #7e8993;
    box-shadow: none;
    border-radius: 3px;
    padding: 0 24px 0 8px;
    min-height: 30px;
    max-width: 25rem;
    -webkit-appearance: none;
    background: #fff
      url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23555%22%2F%3E%3C%2Fsvg%3E')
      no-repeat right 5px top 55%;
    background-size: auto;
    background-size: 16px 16px;
    cursor: pointer;
    vertical-align: middle;
    width: 100%;
    border: 1px solid #7e8993;
  }

  .selectRpe:focus {
    color: #007cba;
    border-color: #007cba;
    box-shadow: 0 0 0 1px #007cba;
    outline: 2px solid transparent;
  }

  .inputFechasRpe {
    padding: 0 8px;
    line-height: 2;
    min-height: 30px;
    box-shadow: 0 0 0 transparent;
    border-radius: 4px;
    border: 1px solid #7e8993;
    background-color: #fff;
    color: #32373c;
    min-width: max-content;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    max-width: 25rem;
  }

  .inputFechasRpe:focus {
    border-color: #007cba;
    box-shadow: 0 0 0 1px #007cba;
    outline: 2px solid transparent;
  }

  .buttonGenerarReporte {
    font-family: Roboto, 'Open Sans';
    vertical-align: baseline;
    background-color: #0a0202 !important;
    color: #fff;
    text-shadow: 0 -1px 1px #000, 1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000 !important;
    cursor: pointer;
    border: 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    font-weight: 600;
    text-transform: uppercase;
    padding: 0 12px !important;
    font-size: 85% !important;
    box-sizing: border-box !important;
    outline: 0;
    height: 36px;
    transition: 0.2s ease-out;
    text-align: center;
    letter-spacing: 0.5px;
    white-space: nowrap;
    -webkit-appearance: none;
    line-height: 2.15384615;
    min-height: 30px;
    margin: 0;
    display: inline-block;
    text-decoration: none;
  }

  /* DIV ERRORES */
  .divErroresRpe {
    display: none;
    background-color: #ff000050;
    padding: 3px;
    margin-bottom: 5px;
    font-size: 13px;
    font-style: italic;
  }

  .divExitoRpe {
    display: none;
    background-color: #02ff0f50;
    padding: 3px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 13px;
    font-style: italic;
  }

  .divErroresHeaderRpe {
    font-weight: bold;
  }

  .divBodyReporteGeneradoRpe {
    overflow: auto;
  }

  /*ESTILOS TABLA HCEAP */
  .tableRpe {
    border: 1px solid #d0d0d0;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
    font-family: Roboto, 'Open Sans';
    color: #0a0202;
    width: 100%;
    border-collapse: collapse;
    word-wrap: break-word;
    font-weight: 400;
  }

  thead {
    border-bottom: 1px solid #d0d0d0;
  }

  .col label {
    cursor: pointer;
  }

  .svg_order_up {
    visibility: hidden;
  }

  .col:hover .svg_order_up {
    visibility: visible;
  }

  .col.selected:hover .svg_order_up {
    visibility: visible;
    transform: rotate(180deg);
  }

  .col.selected.orderDown:hover .svg_order_up {
    visibility: visible;
    transform: rotate(360deg);
  }

  .orderDown .svg_order_up {
    transform: rotate(180deg);
  }

  .col.selected .svg_order_up {
    visibility: visible;
  }

  .tableRpe .col {
    cursor: pointer;
  }

  .tableRpe tr:nth-child(even) {
    background-color: #f6f6f6;
  }

  .tableRpe tr:hover {
    background-color: #ff000027;
  }

  .tableRpe td {
    font-size: 13px;
    padding: 11px 12px;
  }

  .tableRpe th {
    font-size: 14px;
    background-color: transparent;
    text-align: left;
    padding: 10px 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 400;
  }

  /* ORDER RESPONSIVE TABLE */
  .div_flex_100 {
    font-family: Roboto, 'Open Sans';
    color: #0a0202;
    border-collapse: collapse;
    word-wrap: break-word;
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: flex-start;
    font-size: 14px;
  }

  .header_order_text {
    font-style: italic;
    font-size: 12px;
  }

  .col_show_order {
    margin-left: 3px;
    /*margin-left: auto;*/
    cursor: pointer;
    text-align: start;
    margin-top: -5px;
  }

  .col_order_responsive {
    cursor: pointer;
    border: 1px solid #ddd;
    padding-left: 10px;
    padding-top: 7px;
    padding-bottom: 7px;
    margin-bottom: 4px;
    margin-right: 3px;
    padding-right: 4px;
    background: transparent;
  }

  .col_dia {
    min-width: max-content;
  }

  .col_email {
    min-width: max-content;
  }

  .div_body_order_responsive {
    display: none;
  }

  .col_svg {
    margin-left: 7px;
    /*margin-left: auto;*/
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .div_flex_order {
    display: flex;
  }

  .col_order_responsive span {
    cursor: pointer;
  }

  .col_order_responsive:hover .svg_order_up {
    visibility: visible;
  }

  .col_order_responsive.selected:hover .svg_order_up {
    visibility: visible;
    transform: rotate(180deg);
  }

  .col_order_responsive.selected.orderDown:hover .svg_order_up {
    visibility: visible;
    transform: rotate(360deg);
  }

  .orderDown .svg_order_up {
    transform: rotate(180deg);
  }

  .col_order_responsive.selected .svg_order_up {
    visibility: visible;
  }

  /* FIN ESTILOS TABLA PE */

  .divBodyStepper {
    margin: 5px 0;
    color: black;
  }

  .divBodyStepper .step:hover {
    background-color: #f1f1f1;
  }

  .step {
    display: inline-block;
    padding: 5px;
    border: 1px solid #d8d7d7;
    width: 25px;
    height: auto;
    text-align: center;
    cursor: pointer;
    font-weight: bold;
  }

  .step.active {
    background-color: #000442;
    color: white;
  }

  .stepper,
  .step {
    user-select: none;
  }

  .order {
    padding: 0;
    background-color: transparent;
    border: none;
    margin-bottom: 0;
    cursor: pointer;
    height: 10px;
  }

  .svgRpe {
    width: 17px;
    height: auto;
  }

  .svgRpe:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .campoOrdenar {
    margin-left: 7px;
    /*margin-left: auto;*/
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .divFlexThRpe {
    display: flex;
  }

  .divTextoCampoOrdenar {
    margin-top: -10px;
  }

  .textoCampoOrdenar {
    font-size: 9px;
  }

  /* DIV ERRORS FORM */
  .div_errores_campos {
    display: none;
    background-color: #ff000018;
    width: max-content;
    border: 1px solid #c40000;
    border-radius: 4px;
    padding: 3px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .section_body_errors {
    font-family: 'Amazon Ember', Arial, sans-serif;
    display: flex;
    flex-direction: row;
    width: max-content;
    background-color: #fff;
    padding-right: 10px;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .section_left_errores {
    height: auto;
    width: max-content;
    padding-left: 10px;
    padding-right: 10px;
  }

  .title_errors {
    color: #c40000;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.255;
    text-rendering: optimizeLegibility;
    padding-bottom: 4px;
  }

  .svg_danger {
    fill: red;
  }

  .div_svg_danger {
    width: 18px;
    margin-top: 4px;
  }

  .divErroresContenidoRpe {
    font-size: 13px;
  }

  /* DIV SUCCES FORM */
  .div_succes_campos {
    display: none;
    background-color: #02ff0f50;
    width: max-content;
    border: 1px solid green;
    border-radius: 4px;
    padding: 3px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .section_body_succes {
    font-family: 'Amazon Ember', Arial, sans-serif;
    display: flex;
    flex-direction: row;
    width: max-content;
    background-color: #fff;
    padding-right: 10px;
    padding-top: 7px;
    padding-bottom: 7px;
  }
  .section_left_succes {
    height: auto;
    width: max-content;
    padding-left: 10px;
    padding-right: 10px;
  }

  .title_succes {
    color: green;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.255;
    text-rendering: optimizeLegibility;
    padding-bottom: 4px;
  }

  .divSuccesContenidoRpe {
    font-size: 13px;
  }

  .section_data_succes {
    padding-left: 7px;
  }

  @media only screen and (max-width: 280px) {
    .div_succes_campos {
      width: 95%;
    }

    .section_body_succes {
      width: auto;
    }
  }

  @media only screen and (max-width: 620px) {
    .div_errores_campos {
      width: 95%;
    }

    .section_body_errors {
      width: auto;
    }

    .div_svg_danger {
      width: 15px;
    }

    .divErroresContenidoRpe {
      font-size: 12px;
      padding-top: 5px;
    }

    .divHeaderControlRpe {
      font-size: 15px;
    }

    .divFlexRpe {
      flex-flow: row wrap;
      justify-content: flex-start;
    }
    .divCamposRpe {
      width: 100%;
      font-size: 13px;
      font-weight: bold;
    }
    .divBodyControlRpe {
      width: 100%;
    }
    .selectRpe {
      width: 100%;
    }
    .divHeaderControlRpe {
      font-size: 19px;
    }
    .selectRpe {
      font-size: 12px;
    }
    .inputFech {
      font-size: 12px;
    }
  }

  @media only screen and (max-width: 400px) {
    .div_body_order_responsive {
      display: block;
    }

    table {
      border: 0;
    }

    table caption {
      font-size: 1.3em;
    }

    table thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }

    table tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
    }

    table td {
      border-bottom: 1px solid #ddd;
      display: block;
      font-size: 0.8em;
      text-align: right;
    }

    table td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
    }

    .div_semaforo {
      text-align: right;
    }

    table td:last-child {
      border-bottom: 0;
    }
  }
`;
