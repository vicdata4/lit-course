import { css } from 'lit-element';

export const adminVacationStyles = css`
  .component-box {
    margin: 1rem;
    font-family: 'Comic Sans MS', cursive, sans-serif;
  }
  .order {
    background-color: transparent;
    font-family: 'Muli', sans-serif;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }

  table.vacations {
    width: 100%;
    border-collapse: collapse;
  }
  table.vacations thead,
  th {
    display: none;
  }
  table.vacations td {
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: right;
    padding: 10px;
    margin: 1px;
  }
  tr:nth-child(even) {
    background-color: #eeeeee;
  }
  table.vacations td:before {
    content: attr(data-label);
    float: left;
    color: #273b47;
    font-weight: bold;
    font-size: 1em;
    padding: 1px 5px;
    vertical-align: middle;
  }

  .order-box {
    display: flex;
    justify-content: space-around;
  }
  .stepper {
    display: flex;
    justify-content: center;
    margin: 10px 0px 20px 0px;
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

  @media (min-width: 768px) {
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
    }
    table.vacations {
      border-collapse: collapse;
      font-size: 0.8rem;
      empty-cells: hide;
    }
    table th {
      display: table-cell;
      border-left: solid 2px black;
      border-right: solid 2px black;
      background-color: #cccccc;
      font-size: 0.7rem;
      text-align: center;
    }
    table.vacations tr {
      border-bottom: none;
    }
    tr:nth-child(even) {
      background-color: #eeeeee;
    }
    table.vacations td {
      display: table-cell;
      border-right: solid 2px black;
      border-left: solid 2px black;
      text-align: left;
    }
    table.vacations td:before {
      content: none;
    }
    .order-box {
      display: none;
    }
  }
`;
export const commonStyles = css`
  .container {
    padding: 20px;
  }
`;

export const documentListStyles = css`
  .container {
    width: 100%;
    font-family: 'Open Sans', sans-serif, Arial;
    letter-spacing: 0.4px;
  }

  .row > * {
    text-align: left;
    padding-right: 10px;

    height: 30px;
    line-height: 30px;
  }

  .row > *,
  .info-container {
    white-space: nowrap;
    overflow: hidden;
  }

  .row.header {
    margin-bottom: 20px;
  }

  .row.header > * {
    letter-spacing: 1.2px;
    color: #959595;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid #ebebeb;
    padding: 10px 0px;
  }

  .row:first-child {
    border: none;
  }
  .title {
    width: 70%;
    color: #285659;
  }

  .date {
    display: none;
    width: 20%;
  }

  .light-grey {
    color: #747474;
  }

  .info {
    width: 20%;
  }

  .info-container {
    display: block;
  }

  .row.data {
    margin-bottom: 40px;
  }
  .italic {
    font-style: italic;
  }

  @media (min-width: 768px) {
    .title {
      width: 40%;
    }

    .date {
      display: block;
    }

    .info-container {
      display: none;
    }

    .row {
      padding: 20px 0px;
    }

    .row.header {
      margin-bottom: 0px;
    }

    .row.data {
      margin-bottom: 0px;
    }

    .row.data:hover {
      background-color: #f5f6f7;
    }
  }
`;
