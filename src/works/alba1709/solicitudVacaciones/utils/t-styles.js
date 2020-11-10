import { css } from 'lit-element';

export const viewStyles = css`
  #tablaSoli {
    border: 1px solid rgb(221, 221, 221)
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
    font-size: 0.8rem;
    text-align: center;
  }

  #rowInfo:nth-child(even) {
    background: #f6f6f6;
  }

  #rowTitle {
    border: 1px solid rgb(221, 221, 221)
  }

  #papelera:hover {
    cursor: pointer;
  }

  #btnPapelera {
    background-color: #ffffff00;
    border: 0px;
  }

  td,
  th {
    font-family: Roboto, 'Open Sans';
    white-space: nowrap;
    padding: 8px 10px;
  }

  .btnOrder {
    cursor: pointer;
    outline: none;
    background-color: transparent;
    border: transparent;
    transition: transform 0.2s ease-in;
    font-size: 20px;
  }

  .btnOrder.rotate {
    transform: rotate(180deg);
  }

  .stepper {
    margin: 10px 0;
    text-align: center;
  }

  .step {
    display: inline-block;
    padding: 5px;
    border: 1px solid rgb(216, 215, 215);
    width: 30px;
    height: auto;
    text-align: center;
    cursor: pointer;
    border-radius: 2px;
  }

  .step.left {
    transform: rotate(180deg);
  }

  .stepper .step:hover {
    background-color: #e8e7e7;
  }

  .step.active {
    background-color: #535353 !important;
    color: white;
  }

  .stepper,
  .step {
    user-select: none;
  }

  #lblI,
  #lblF {
    font-family: Roboto, 'Open Sans';
    margin-right: 15px;
  }

  #fechaIni {
    margin-right: 25px;
  }

  #inputStart,
  #inputEnd {
    display: inline-flex;
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
  }

  #fechaIni:hover,
  #fechaFin:hover {
    cursor: pointer;
  }

  #inputs {
    display: inline;
  }
  #fechaIni:focus,
  #fechaFin:focus {
    outline: none !important;
    box-shadow: 0 0 0 1px #007cba;
    color: #016087;
    border-color: #007cba;
  }

  #fechaIni,
  #fechaFin {
    padding: 0 8px;
    min-height: 30px;
    box-shadow: 0 0 0 transparent;
    border-radius: 4px;
    border: 1px solid #7e8993;
    background-color: #fff;
    color: #32373c;
    cursor: pointer;
  }

  #btnAgregar {
    background-color: #0a0202;
    color: #fff;
    text-align: center;
    letter-spacing: 0.5px;
    transition: 0.2s ease-out;
    padding: 0 2rem;
    text-decoration: none;
    border: none;
    height: 36px;
    border-radius: 2px;
    cursor: pointer;
    font-family: Roboto, 'Open Sans';
    box-shadow: rgba(0, 0, 0, 0.18) 0px 5px 11px 0px, rgba(0, 0, 0, 0.15) 0px 4px 15px 0px;
  }

  #btnAgregar:hover {
    box-shadow: rgba(0, 0, 0, 0.18) 0px 5px 11px 0px, rgba(0, 0, 0, 0.3) 0px 4px 15px 0px;
  }
`;
