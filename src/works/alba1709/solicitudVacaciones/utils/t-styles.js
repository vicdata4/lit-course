import { css } from 'lit-element';

export const viewStyles = css`
  #tablaSoli {
    border: 3px solid black;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border-collapse: collapse;
    width: 70%;
    font-size: 0.8rem;
  }
  td, th {
    border-right: solid 3px black;
    border-left: solid 3px black;
  }

  #rowInfo:nth-child(odd) {
    background-color: #eeeeee;
  }
  #papelera {
    width: 30px;
    height:30px;
  }
  #papelera:hover {
    cursor: pointer;
  }
  #btnPapelera {
    background-color: #ffffff00;
    border: 0px;
    margin-left: 7px;
  }
  td, th {
    font-family: 'Open Sans', sans-serif;
    white-space: nowrap;
  }
  .btnOrder {
    cursor: pointer;
    background-color: #cccccc;
    border: #cccccc;
  }
  .btnOrder:hover {
    background-color: #eeeeee;
  }
  th {
    background-color: #cccccc;
  }
  .stepper {
    margin: 10px 0;
  }
  .step {
    display: inline-block;
    padding: 5px;
    border: 1px solid #d8d7d7;
    width: 20px;
    height: auto;
    text-align: center;
    cursor: pointer;
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
  .stepper, .step {
    user-select: none;
    }
    }

  }
`;
