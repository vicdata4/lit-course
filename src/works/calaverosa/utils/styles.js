import { css } from 'lit-element';

export const mediaQueriesStyles = css`
  /* Smartphones (portrait & landscape) */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
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

  /* Smartphones (portrait & landscape) */
  @media only screen and (min-device-width: 340px) and (max-device-width: 760px) {
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

  /* Smartphones (portrait & landscape) */
  @media only screen and (min-device-width: 411px) and (max-device-width: 731px) {
    table {
      width: 100%;
    }
    div {
      text-align: center;
      margin: 5%;
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

  img {
    width: 1.5%;
    margin-left: 1%;
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
  }

  button {
    background-color: black;
    color: white;
    font-size: 10px;
    font-weight: bold;
    border: solid black;
    border-radius: 5px;
    padding: 5px 20px;
    cursor: pointer;
  }
`;
