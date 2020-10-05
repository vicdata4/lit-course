import { css } from 'lit-element';

export const tableStyles = css`
    table {
      border: 2px solid black;
      margin-top: 30px;
    }
    table tr:nth-child(even) {
      background-color: lightgray;
    }
    table td {
      border-right: 2px solid black;
    }
`;
