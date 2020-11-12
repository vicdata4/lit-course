import { css } from 'lit-element';

export const adminVacationStyles = css`
  .container {
    font-family: Roboto, 'Open Sans';
  }
  .order-box {
    display: flex;
    justify-content: space-around;
  }
  input,
  select,
  textarea {
    font-size: 16px;
    width: 100%;
  }
  .order {
    cursor: pointer;
  }
  .black-date {
    color: #0a0202;
  }
  .grey-date {
    color: #555;
  }
  select {
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
      url(data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23555%22%2F%3E%3C%2Fsvg%3E)
      no-repeat right 5px top 55%;
    background-size: 16px 16px;
    cursor: pointer;
    vertical-align: middle;
  }
  select:focus {
    border-color: #007cba;
    outline: 2px solid transparent;
    color: #016087;
    box-shadow: 0 0 0 1px #007cba;
  }
  table.vacations {
    width: 100%;
    border-collapse: collapse;
  }
  table.vacations th {
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
    color: rgb(10, 2, 2);
    font-size: 1em;
    padding: 1px 5px;
    vertical-align: middle;
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
    .order-box {
      display: none;
    }
    .table-box {
      border: 1px solid #ccd0d4;
      margin-top: 1.5rem;
    }
    thead {
      border-bottom: 1px solid #d0d0d0;
    }
    table.vacations th {
      padding: 0;
      display: table-cell;
      text-align: left;
      font-size: 14px;
      line-height: 1.4em;
      font-weight: 400;
      padding: 10px 10px 10px 10px;
    }
    table.vacations a {
      display: block;
      overflow: hidden;
      text-decoration: none;
      color: #0a0202;
    }
    table.vacations {
      border-collapse: collapse;
      font-size: 0.8rem;
      empty-cells: hide;
    }
    table.vacations tr {
      border-bottom: none;
    }
    tr:nth-child(even) {
      background-color: #f6f6f6;
    }
    table.vacations td {
      display: table-cell;
      text-align: left;
      padding: 10px 10px 20px 10px;
    }
    table.vacations td:before {
      content: none;
    }
    .name {
      font-weight: bold;
    }
    .order {
      display: flex;
      align-items: center;
    }
    .order span {
      visibility: hidden;
      color: rgb(68, 68, 68);
      text-decoration: none !important;
      position: relative;
      left: 3px;
      top: -1px;
    }
    .order:hover span {
      visibility: visible;
    }
    .order a {
      width: 60%;
    }
    @media (min-width: 992px) {
      .order a {
        width: auto;
      }
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
    font-family: Roboto, 'Open Sans';
  }
  .doc-box {
    border: 1px solid #ccd0d4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
  }
  .row.header:first-of-type {
    border-bottom: 1px solid #ccd0d4;
  }
  .row.header:last-of-type {
    border-top: 1px solid #ccd0d4;
  }
  .row > * {
    text-align: left;
    padding-right: 10px;

    height: 30px;
    line-height: 30px;
  }

  .group:nth-child(even) {
    background-color: #f6f6f6;
  }

  .row > *,
  .info-container {
    white-space: nowrap;
    overflow: hidden;
    padding: 5px;
  }

  .row.header > * {
    color: #0a0202;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
  }

  .title {
    width: 70%;
    color: #285659;
  }

  .date {
    display: none;
    width: 30%;
  }

  .light-grey {
    color: #555;
  }

  .info {
    width: 20%;
  }

  .info-container {
    display: block;
  }

  .italic {
    font-style: italic;
  }
  img {
    width: 20px;
    cursor: pointer;
  }
  a {
    color: #007cba;
  }
  button {
    border: none;
    background-color: transparent;
    vertical-align: middle;
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

    .row.data {
      padding: 10px 10px 10px 0px;
    }
  }
`;
