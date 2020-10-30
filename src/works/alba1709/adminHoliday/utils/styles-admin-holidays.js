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
    background-color: #cccccc;
  }

  #tableAdmin tr:nth-child(odd) {
    background-color: #eeeeee;
  }

  td,
  th {
    border-right: solid 3px black;
    border-left: solid 3px black;
    font-family: 'Open Sans', sans-serif;
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
    padding: 1em;
    border: 1px solid grey;
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
    font-family: 'Open Sans', sans-serif;
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
  }

  .stepper .step:hover {
    background-color: #f1f1f1;
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
