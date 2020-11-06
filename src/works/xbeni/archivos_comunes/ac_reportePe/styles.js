import { css } from 'lit-element';

export const RpeStyles = css`
  .divBodyControlRpe {
    width: max-content;
    border-radius: 7px;
    padding: 7px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-bottom: 10px;
    overflow: auto;
  }

  .divHeaderControlRpe {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .divFlexRpe {
    display: flex;
    width: 100%;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  .divCamposRpe {
    width: 200px;
    font-size: 20px;
  }

  .divCamposDatos {
    width: max-content;
  }

  .selectRpe {
    width: max-content;
    padding-right: 50px;
    font-size: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .selectRpe:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: 1px solid orange;
  }

  .inputFechasRpe {
    font-size: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    border: 1px solid black;
    border-radius: 5px;
  }

  .inputFechasRpe:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: 1px solid orange;
  }

  .buttonGenerarReporte {
    width: 100%;
    font-size: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #000442;
    color: white;
    cursor: pointer;
  }

  .buttonGenerarReporte:hover {
    opacity: 0.8;
  }

  /* DIV ERRORES */
  .divErroresRpe {
    display: none;
    background-color: #ff000050;
    padding: 3px;
    margin-bottom: 5px;
  }

  .divExitoRpe {
    display: none;
    background-color: #02ff0f50;
    padding: 3px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .divBodyReporteGeneradoRpe {
    overflow: auto;
  }

  /*ESTILOS TABLA HCEAP */
  .tableRpe {
    width: 100%;
    border: 2px solid #20208869;
    border-collapse: collapse;
    overflow: auto;
  }

  .active_hover label {
    cursor: pointer;
  }

  .tableRpe .active_hover {
    cursor: pointer;
  }

  .svg_order_up {
    visibility: hidden;
  }

  .svg_order_down {
    display: none;
  }

  .tableRpe tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .tableRpe tr:hover {
    background-color: #ff000027;
  }

  .tableRpe td,
  .tableRpe th {
    border: 1px solid #00000039;
    padding: 5px;
  }

  .tableRpe th {
    background-color: #68686a69;
    text-align: left;
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

  @media only screen and (max-width: 540px) {
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
    .buttonGenerarReporte {
      width: 100%;
      padding-right: 10%;
      padding-left: 10%;
      padding-top: 5px;
      padding-bottom: 5px;
      font-size: 11px;
      font-weight: bold;
    }
    .inputFech {
      font-size: 12px;
    }
  }
`;
