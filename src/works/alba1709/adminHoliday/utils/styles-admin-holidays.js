import { css } from 'lit-element';

export const viewHoliday = css`
  /* Mobile First */
  #tableAdmin {
    border: none;
    font-size: 0.7em;
  }

  #tableAdmin #rowTitle {
    display: flex;
    padding: 1em 0.5em;
    margin-bottom: 1em;
    border: 1px solid #ccd0d4;
  }

  #tableAdmin tr:nth-child(even) {
    background-color: #f6f6f6;
  }

  td,
  th {
    font-family: Roboto, 'Open Sans';
    text-align: left;
    padding: 8px;
  }

  tr .cell {
    display: none;
  }

  tr .ord {
    border: none;
  }

  td {
    border: none;
    padding: 15px;
    border-bottom: 1px solid rgb(221, 221, 221);
  }

  #rowInfo {
    border: 1px solid grey;
    align-content: center;
    margin-bottom: 1em;
  }

  table td[data-title] {
    display: flex;
  }

  table td[data-title]::before {
    content: attr(data-title);
    width: 130px;
    font-weight: bold;
  }

  #inputStart,
  #inputEnd {
    margin-bottom: 15px;
  }

  #papelera {
    width: 22px;
    height: 22px;
  }

  h2,
  select {
    font-family: Roboto, 'Open Sans';
  }

  .btnOrder {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
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

  .stepper .step:hover {
    background-color: #f1f1f1;
  }

  .step {
    display: inline-block;
    padding: 5px;
    border: 1px solid rgb(216, 215, 215);
    width: 30px;
    height: auto;
    text-align: center;
    cursor: pointer;
  }

  .step.active {
    background-color: #535353 !important;
    color: white;
  }

  .step.left {
    transform: rotate(180deg);
  }

  .stepper,
  .step {
    user-select: none;
  }
`;
