import { css } from 'lit-element';

export const tableStyles = css`
  table {
    margin-top: 30px;
  }
  table tr:nth-child(even) {
    background-color: lightgray;
  }
  table td {
    border-right: 2px solid black;
  }
  table,
  th {
    border: 2px solid black;
    border-collapse: collapse;
  }
`;
