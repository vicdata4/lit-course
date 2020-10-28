import { css } from 'lit-element';

export const newStyles = css`
  #tabla {
    width: 100%;
    border-collapse: collapse;
  }

  tr {
    text-align: center;
  }

  .fila_par {
    background-color: #bbb;
  }

  .fila_imppar {
    background-color: lightgreen;
  }

  td,
  th {
    padding: 6px;
    border: 1px solid #ccc;
  }

  @media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px) {
    label #select {
      font-size: 1.2em;
    }
  }

  #select {
    border: 1px solid #ccc;
    width: 50%;
    border-radius: 3px;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
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
`;
