import { css } from 'lit-element';

export const hoursStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Roboto:wght@300;400;500;700&display=swap');

  * {
    box-sizing: border-box;
    font-family: Roboto, 'Open Sans';
    font-size: 12px !important;
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
    width: 50%;
    font-size: 0.8rem;
    font-weight: bold;
  }

  #container .filters select {
    width: 50%;
    font-size: 0.8rem;
    color: #32373c;
    border-color: #7e8993;
    outline-color: #007cba;
    border-radius: 5px;
  }

  #container .filters select:focus {
    border-color: #007cba;
    color: #016087;
  }

  #container #generateReport {
    margin-bottom: 5px;
  }

  #container #generateReport button {
    padding: 8px 10px;
    background-color: #0a0202;
    border: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
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
    background: #f6f6f6;
  }

  table tbody tr td {
    border-bottom: 1px solid #ccd0d4;
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
    border: 1px solid #ccd0d4;
    margin-bottom: 10px;
    padding: 0 5px 5px 5px;
  }

  td {
    position: relative;
    padding-left: 75%;
    padding-top: 8px;
    padding-bottom: 8px;
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

  @media all and (min-width: 685px) {
    * {
      font-size: 14px !important;
    }

    #container .filters {
      justify-content: flex-start;
    }

    #container .filters label {
      width: 200px;
      font-size: 0.8rem;
    }

    #container .filters select {
      width: 300px;
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
