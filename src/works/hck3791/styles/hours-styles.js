import { css } from 'lit-element';

export const hoursStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Roboto:wght@300;400;500;700&display=swap');

  * {
    box-sizing: border-box;
    font-family: Roboto, 'Open Sans';
  }

  #container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  #container section {
    width: 100%;
  }

  #container section h3 {
    font-size: 0.9rem;
  }

  #container .filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  #container .filters label {
    width: 40%;
    font-size: 0.8rem;
    font-weight: bold;
  }

  #container .filters select {
    width: 60%;
    font-size: 0.8rem;
    color: #32373c;
    border-color: #7e8993;
    outline-color: #007cba;
    border-radius: 5px;
  }

  #container .filters select:focus {
    border-color: #007cba;
    color: #016087;
    box-shadow: 0 0 0 1px #007cba;
  }

  #container #generateReport {
    margin-bottom: 5px;
  }

  #container #generateReport button {
    padding: 5px 10px 5px 10px;
    font-size: 0.7rem;
    background-color: #0a0202;
    border: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 10px 18px;
  }

  #container #generateReport button:hover {
    -webkit-box-shadow: box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    -moz-box-shadow: box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  #container section table {
    width: 100%;
    border-collapse: collapse;
  }

  td,
  th {
    color: #555;
  }

  table tbody tr:nth-child(odd) {
    background: #f1f1f1;
  }

  table tbody tr td {
    border-bottom: 1px solid #ccc;
  }

  table tbody tr td:last-child {
    border-bottom: 0;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 0.8em;
  }

  td {
    position: relative;
    padding-left: 75%;
    padding-top: 5px;
    height: 30px;
  }

  td:before {
    position: absolute;
    left: 0;
    white-space: nowrap;
  }

  td:nth-of-type(1):before {
    content: '';
  }
  td:nth-of-type(2):before {
    content: 'Horas trabajadas';
  }
  td:nth-of-type(3):before {
    content: 'Horas de permisos';
  }
  td:nth-of-type(4):before {
    content: 'Horas de intervenciones';
  }
  td:nth-of-type(5):before {
    content: 'Jornadas trabajadas';
  }
  td:nth-of-type(6):before {
    content: 'Jornadas de guardia';
  }
  td:nth-of-type(7):before {
    content: 'Jornadas de vacaciones';
  }

  @media all and (max-width: 350px) {
    :host {
      font-size: 0.8rem;
    }

    #container .filters select {
      width: 50%;
      font-size: 0.8rem;
    }

    #container #generateReport button {
      font-size: 0.85em;
    }

    td {
      padding-top: 8px;
    }
  }

  @media all and (min-width: 670px) {
    #container .filters {
      justify-content: flex-start;
    }

    #container .filters label {
      width: 200px;
      font-size: 0.8rem;
    }

    #container .filters select {
      width: 300px;
      font-size: 14px;
    }

    table {
      display: table;
    }

    thead {
      display: table-header-group;
    }

    tbody {
      display: table-row-group;
    }

    thead tr {
      position: relative;
      top: 1px;
      left: 1px;
      display: table-row;
    }

    tbody tr {
      display: table-row;
    }

    thead tr th {
      display: table-cell;
      text-align: left;
      font-size: 0.8rem;
      font-weight: normal;
    }

    table tbody tr:nth-child(odd) td {
      border-bottom: 1px solid #fff;
    }
    table tbody tr:nth-child(even) td {
      border-bottom: 1px solid #fff;
    }

    table tbody tr:last-child td {
      border-bottom: 1px solid #ccc;
    }

    tbody tr td {
      display: table-cell;
      text-align: left;
      font-size: 0.8rem;
    }

    td,
    th {
      padding: 8px 10px;
    }

    td:before {
      text-overflow: ellipsis;
    }

    td:nth-of-type(1):before {
      content: '';
    }
    td:nth-of-type(2):before {
      content: '';
    }
    td:nth-of-type(3):before {
      content: '';
    }
    td:nth-of-type(4):before {
      content: '';
    }
    td:nth-of-type(5):before {
      content: '';
    }
    td:nth-of-type(6):before {
      content: '';
    }
    td:nth-of-type(7):before {
      content: '';
    }
  }
`;
