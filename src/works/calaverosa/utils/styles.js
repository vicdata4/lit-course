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

  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  div label {
    font-weight: bold;
  }

  label,
  select,
  input {
    width: 10%;
  }

  .calendar {
    width: 1.5%;
    margin-left: 1%;
    cursor: pointer;
  }

  .arrow-str {
    width: 10px;
    float: right;
    cursor: pointer;
  }

  div select:focus {
    outline: none;
  }

  table {
    border-collapse: collapse;
    border: 1px solid black;
    font-size: 0.75em;
    text-align: left;
    width: 50%;
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
    width: 2%;
    display: block;
    padding: 5px;
    cursor: pointer;
    margin-top: 1%;
  }

  #navigation #nPages {
    margin-top: 1.5%;
    margin-left: 0.5%;
  }

  .no-visible {
    visibility: hidden;
  }
`;

export const mediaQueriesPerReport = css`
  /* Smartphones (portrait) */
  @media only screen and (min-width: 280px) and (max-width: 480px) {
    table {
      width: 100%;
    }
    select,
    #inputStartDate,
    #inputEndDate {
      margin-left: -50%;
      margin-top: 8%;
      width: 50%;
    }
    .calendar {
      visibility: hidden;
    }
    label {
      width: 50%;
    }
    #previous-btn,
    #next-btn {
      width: 10%;
    }
    #navigation #nPages {
      margin-top: 3.5%;
      margin-left: 1%;
    }
    .no-visible {
      visibility: hidden;
    }
  }

  /* Smartphones (landscape) */
  @media only screen and (min-width: 481px) and (max-width: 850px) {
    table {
      width: 100%;
    }
    select,
    #inputStartDate,
    #inputEndDate {
      width: 25%;
    }
    label {
      width: 30%;
    }
    .calendar {
      width: 4%;
    }
    #previous-btn,
    #next-btn {
      width: 5%;
    }
    #navigation #nPages {
      margin-top: 3%;
      margin-left: 1%;
    }
  }

  /* iPads */
  @media only screen and (min-width: 851px) and (max-width: 1024px) {
    table {
      width: 100%;
    }
    label {
      width: 20%;
    }
    select,
    #inputStartDate,
    #inputEndDate {
      width: 20%;
    }
    .calendar {
      width: 3%;
    }
    #previous-btn,
    #next-btn {
      height: 3%;
      width: 3%;
    }
    #navigation #nPages {
      margin-left: 1%;
    }
  }
`;
