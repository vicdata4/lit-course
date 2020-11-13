import { css } from 'lit-element';

export const newStyles = css`
  #tabla {
    width: 100%;
    font-family: Roboto, 'Open Sans';
    border-collapse: collapse;
  }

  tr {
    text-align: center;
  }

  .fila_par {
    background-color: #f1f1f1;
    color: #555;
  }

  .fila_imppar {
    background-color: lightgreen;
  }

  td,
  th {
    padding: 8px 10px;
    border: 1px solid #ccd0d4;
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  }

  td {
    font-size: 14px;
    color: #555;
  }

  .select {
    font-size: 14px;
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
  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    label .select {
      font-size: 1.2em;
    }
    .select {
      border: 1px solid #ccc;
      width: 50%;
      border-radius: 3px;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
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
    }

    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }

    .i0 .i1 .i2 {
      width: 120px;
    }

    td:before {
      position: absolute;
      top: 20%;
      left: 3%;
      width: 50%;
      text-aling: right;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }

    td:nth-of-type(1):before {
      content: 'Nombre Apellido:';
    }
    td:nth-of-type(2):before {
      content: 'Fecha de Solicitud:';
    }
    td:nth-of-type(3):before {
      content: 'Fecha de Inicio:';
    }
    td:nth-of-type(4):before {
      content: 'Fecha Fin:';
    }
    td:nth-of-type(5):before {
      content: 'Estado:';
    }
    td:nth-of-type(6):before {
      content: 'Fecha de estado:';
    }
  }
`;
