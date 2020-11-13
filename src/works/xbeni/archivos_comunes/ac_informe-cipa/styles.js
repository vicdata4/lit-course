import { css } from 'lit-element';

export const informeCipaStyles = css`
  .div_body_cipa {
    width: 100%;
    /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
  }

  .div_body_abrir_cipa {
    display: none;
  }

  .div_header_cipa {
    display: flex;
    align-items: center;
    background-color: #00076e;
    color: white;
    padding-bottom: 3px;
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
    font-size: 16px;
    font-weight: bold;
  }

  /*  TABLE CIPA */
  .tabla_cipa {
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

  .tabla_cipa tr:nth-child(even) {
    background-color: #f6f6f6;
  }

  .tabla_cipa tr:hover {
    background-color: #ff000027;
  }

  .tabla_cipa td {
    font-size: 13px;
    padding: 8px 10px;
  }

  .tabla_cipa th {
    font-size: 14px;
    background-color: transparent;
    text-align: left;
    padding: 10px 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 400;
  }

  .campo_ordenar {
    margin-left: 7px;
    /*margin-left: auto;*/
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .div_flex_th_cipa {
    display: flex;
  }

  .svg_order_up {
    visibility: hidden;
  }

  .col label {
    cursor: pointer;
  }

  .tabla_cipa .col {
    cursor: pointer;
  }

  /* ORDER RESPONSIVE TABLE */
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

  /* ORDER DESKTOP TABLE */
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

  .div_texto_campo_ordenar {
    margin-top: -10px;
  }

  .svg_cipa {
    width: 17px;
    height: auto;
  }

  .svg_cipa:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .svg_order_down {
    display: none;
  }

  .label_nombre_candidato_cipa {
    color: #0a0202;
    font-weight: 500;
    cursor: pointer;
    text-transform: uppercase;
  }

  /* CSS CHECKBOX EN PLANTILLA */
  @supports (-webkit-appearance: none) or (-moz-appearance: none) {
    input[type='checkbox'] {
      --active: #275efe;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, 0.3);
      --border: #bbc1e1;
      --border-hover: #275efe;
      --background: #fff;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: not-allowed;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      -webkit-transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
    }
    input[type='checkbox']:after {
      content: '';
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      -webkit-transition: opacity var(--d-o, 0.2s), -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);
      transition: opacity var(--d-o, 0.2s), -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s),
        -webkit-transform var(--d-t, 0.3s) var(--d-t-e, ease);
    }
    input[type='checkbox']:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: 0.3s;
      --d-t: 0.6s;
      --d-t-e: cubic-bezier(0.2, 0.85, 0.32, 1.2);
    }
    input[type='checkbox']:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    input[type='checkbox']:not(.switch) {
      width: 21px;
    }
    input[type='checkbox']:not(.switch):after {
      opacity: var(--o, 0);
    }
    input[type='checkbox']:not(.switch):checked {
      --o: 1;
    }
    input[type='checkbox'] + label {
      font-size: 14px;
      line-height: 21px;
      display: inline-block;
      vertical-align: top;
      cursor: not-allowed;
      margin-left: 4px;
    }

    input[type='checkbox']:not(.switch) {
      border-radius: 7px;
    }
    input[type='checkbox']:not(.switch):after {
      width: 5px;
      height: 9px;
      border: 2px solid var(--active-inner);
      border-top: 0;
      border-left: 0;
      left: 7px;
      top: 4px;
      -webkit-transform: rotate(var(--r, 20deg));
      transform: rotate(var(--r, 20deg));
    }
    input[type='checkbox']:not(.switch):checked {
      --r: 43deg;
    }
    input[type='checkbox'].switch {
      width: 38px;
      border-radius: 11px;
    }
    input[type='checkbox'].switch:after {
      left: 2px;
      top: 2px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      background: var(--ab, var(--border));
      -webkit-transform: translateX(var(--x, 0));
      transform: translateX(var(--x, 0));
    }
    input[type='checkbox'].switch:checked {
      --ab: var(--active-inner);
      --x: 17px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
  }
  /* FIN CSS CHECKBOX EN PLANTILLA */

  .svg_semaforo_rojo {
    width: 20px;
    height: auto;
  }

  .svg_semaforo_amarillo {
    fill: yellow;
    width: auto;
    height: auto;
  }

  .div_semaforo {
    text-align: center;
  }

  /* ORDER CAMP RESPONSIVE */
  .div_body_order_responsive {
    display: none;
  }

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

  .col_nombre {
    min-width: max-content;
  }

  .col_email {
    min-width: max-content;
  }

  .col_perfil {
    min-width: max-content;
  }

  .col_en_plantilla {
    min-width: max-content;
  }

  .col_fecha_ultima_actualizacion {
    min-width: max-content;
  }

  .col_fechaVencimiento {
    min-width: max-content;
  }

  .col_show_order {
    margin-left: 3px;
    /*margin-left: auto;*/
    cursor: pointer;
    text-align: start;
    margin-top: -5px;
  }

  /* END ORDER CAMP RESPONSIVE */

  @media only screen and (max-width: 1050px) {
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
