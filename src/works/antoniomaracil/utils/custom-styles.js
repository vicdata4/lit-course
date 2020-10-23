import { css } from 'lit-element';

export const vacationStyles = css`
  .component-box {
    margin: 1rem;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
  .inp-controls {
    display: flex;
    align-items: center;
  }
  .inp-controls p {
    margin-right: 1rem;
  }
  .inp-controls input + p {
    margin-left: 1rem;
  }
  .inp-controls button {
    margin-right: 1.5rem;
    margin-left: 1.5rem;
  }
  .order {
    background-color: transparent;
    font-family: 'Muli', sans-serif;
    font-weight: bold;
    font-size: 0.7rem;
    border: none;
    cursor: pointer;
  }
  .table-box {
    border-top: solid 2px black;
    border-bottom: solid 2px black;
    margin-top: 1.5rem;
    overflow-x: auto;
  }
  table {
    border-collapse: collapse;
    font-size: 0.8rem;
    empty-cells: hide;
    width: 100%;
  }
  tr:nth-child(even) {
    background-color: #eeeeee;
  }
  table th {
    border-left: solid 2px black;
    border-right: solid 2px black;
    background-color: #cccccc;
    font-size: 0.7rem;
    text-align: left;
  }
  table td {
    border-right: solid 2px black;
    border-left: solid 2px black;
  }
  td {
    height: 2rem;
  }
  span span {
    cursor: pointer;
  }
  .table-cntr {
    display: flex;
    justify-content: space-between;
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
  .warning.active {
    color: red;
  }
  .warning {
    color: transparent;
  }
`;
export const commonStyles = css`
  .container {
    padding: 20px;
  }
`;
