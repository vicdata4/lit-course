import { css } from 'lit-element';

export const viewHoliday = css`
  /* Mobile First */
  #tableAdmin {
    border: none;
    font-size: 0.7em;
  }

  select {
    line-height: 2;
    color: rgb(50, 55, 60);
    border-color: rgb(126, 137, 147);
    box-shadow: none;
    border-radius: 3px;
    padding: 0px 24px 0px 8px;
    min-height: 30px;
    max-width: 25rem;
    appearance: none;
    background: #fff
      url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23555%22%2F%3E%3C%2Fsvg%3E)
      no-repeat right 5px top 55%;
    cursor: pointer;
    vertical-align: middle;
  }

  select:focus {
    outline: none !important;
    box-shadow: 0 0 0 1px #007cba;
    color: #016087;
    border-color: #007cba;
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
