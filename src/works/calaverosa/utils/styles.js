import { css } from 'lit-element';

export const mediaQueriesStyles = css`
  /* Smartphones (portrait & landscape) */
  @media only screen and (min-device-width: 280px) and (max-device-width: 760px) {
    table {
      width: 100%;
    }
    div {
      text-align: center;
      margin: 5%;
    }
    input {
      width: 50%;
    }
  }

  /* iPads */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    table {
      width: 100%;
    }
    div {
      text-align: center;
      margin: 5%;
    }
  }
`;

// css permissions-report-detailed //
export const tableFormat = css`
  * {
    font-family: Roboto, 'Open Sans';
  }
  .permissions-report-ctr {
    display: flex;
    flex-direction: column;
  }

  .permissions-report-ctr div {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .date {
    justify-content: flex-start !important;
    flex-direction: row !important;
  }

  select,
  input {
    width: 50%;
    font-size: 14px;
    line-height: 2;
    color: #32373c;
    border: 1px solid #7e8993;
    box-shadow: none;
    border-radius: 3px;
    min-height: 30px;
    max-width: 25rem;
    -webkit-appearance: none;
    background: #fff
      url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%206l5%205%205-5%202%201-7%207-7-7%202-1z%22%20fill%3D%22%23555%22%2F%3E%3C%2Fsvg%3E')
      no-repeat right 5px top 55%;
    background-size: auto;
    background-size: 16px 16px;
    cursor: pointer;
    font-size: 13px;
  }
  select:focus,
  input:focus {
    border-color: #007cba;
    color: #016087;
    box-shadow: 0 0 0 1px #007cba;
  }

  label {
    width: 50%;
    margin-right: 50px;
    font-size: 14px;
  }

  .calendar {
    width: 28px;
    cursor: pointer;
    margin-left: 3%;
  }

  .arrow-str {
    display: block;
    width: 14px;
    float: right;
    cursor: pointer;
    visibility: hidden;
  }

  th:hover .arrow-str {
    visibility: visible;
  }

  table {
    border-collapse: collapse;
    border: 1px solid #ccd0d4;
    text-align: left;
    color: #0a0202;
    line-height: 1.5em;
  }

  table tbody tr:nth-child(odd) {
    background: #f6f6f6;
  }

  table th {
    border-right: 0px;
    border-bottom: 1px solid #ccd0d4;
    padding: 4px 10px 4px 5px;
    width: 10%;
    font-size: 14px;
    font-weight: normal;
  }

  table td {
    border-right: 0px;
    padding: 10px 10px 10px 5px;
    font-size: 13px;
  }

  th:first-child,
  th:last-child {
    width: 3%;
  }

  #generateReport {
    background-color: black;
    width: 210px;
    color: white;
    font-size: 13px;
    font-weight: bold;
    border: solid black;
    letter-spacing: 1px;
    padding: 9px 10px;
    cursor: pointer;
    text-shadow: 0 -1px 1px #000, 1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000 !important;
    font-family: inherit;
  }

  #previous-btn,
  #next-btn {
    width: 10%;
    display: block;
    cursor: pointer;
    margin-top: 1%;
    margin-right: 3px;
    color: #a0a5aa !important;
    border: none;
    background: #f7f7f7 !important;
  }

  #navigation #nPages {
    margin-top: 3%;
    margin-left: 0.5%;
    font-size: 12px;
  }

  #navigation {
    justify-content: flex-start !important;
    flex-direction: row !important;
  }

  .no-visible {
    visibility: hidden;
  }
`;

export const mediaQueriesPerReport = css`
  /* iPads */
  @media screen and (min-width: 580px) and (max-width: 1024px) {
    .permissions-report-ctr div {
      flex-direction: row;
    }
    label {
      width: 25%;
    }
    select {
      width: 30%;
      margin-bottom: 1%;
    }
    .date {
      width: 60%;
    }
    .calendar {
      margin-left: 1%;
    }
    #previous-btn,
    #next-btn {
      width: 4%;
    }
    .arrow-str {
      display: block;
      width: 14px;
      float: right;
      cursor: pointer;
      visibility: hidden;
    }
    th:hover .arrow-str {
      visibility: visible;
    }
  }
  /* Desktop */
  @media (min-width: 1025px) {
    table {
      width: 100%;
    }
    .permissions-report-ctr div {
      flex-direction: row;
    }
    select {
      width: 10%;
      margin-bottom: 0.5%;
    }
    .date {
      width: 20%;
    }
    label {
      width: 8%;
    }
    #generateReport {
      width: 200px;
    }
    .calendar {
      margin-left: 1%;
    }
    #previous-btn,
    #next-btn {
      width: 2%;
    }
    #navigation #nPages {
      margin-top: 1.5%;
      margin-left: 0.5%;
    }
    .arrow-str {
      display: block;
      width: 14px;
      float: right;
      cursor: pointer;
      visibility: hidden;
    }
    th:hover .arrow-str {
      visibility: visible;
    }
  }
`;
