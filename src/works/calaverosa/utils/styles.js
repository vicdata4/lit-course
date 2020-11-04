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
  }

  label {
    font-weight: bold;
    width: 50%;
    margin-right: 50px;
  }

  .calendar {
    width: 25px;
    cursor: pointer;
    margin-left: 3%;
  }

  .arrow-str {
    width: 10px;
    float: right;
    cursor: pointer;
  }

  table {
    border-collapse: collapse;
    border: 1px solid black;
    font-size: 0.75em;
    text-align: left;
  }

  table thead tr:first-child {
    background-color: #ccc;
  }

  table tbody tr:nth-child(odd) {
    background: #eee;
  }

  table td {
    border-right: 1px solid black;
    padding: 10px 10px 10px 5px;
    font-weight: 600;
  }

  table th {
    border-right: 1px solid black;
    padding: 4px 10px 4px 5px;
    width: 10%;
  }

  th:first-child,
  th:last-child {
    width: 5%;
  }

  #generateReport {
    background-color: black;
    color: white;
    font-size: 10px;
    font-weight: bold;
    border: solid black;
    border-radius: 5px;
    padding: 5px 20px;
    cursor: pointer;
  }

  #previous-btn,
  #next-btn {
    width: 10%;
    display: block;
    cursor: pointer;
    margin-top: 1%;
  }

  #navigation #nPages {
    margin-top: 3%;
    margin-left: 0.5%;
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
  @media screen and (min-device-width: 580px) and (max-device-width: 1024px) {
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
    #generateReport {
      width: 30%;
    }
    .calendar {
      margin-left: 1%;
    }
    #previous-btn,
    #next-btn {
      width: 4%;
    }
  }
  /* Desktop */
  @media (min-device-width: 1025px) {
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
  }
`;
