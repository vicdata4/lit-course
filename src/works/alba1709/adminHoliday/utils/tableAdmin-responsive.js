import { css } from 'lit-element';

export const responsiveTable = css`
  @media (min-width: 760px) {
    #tableAdmin {
      border: 1px solid #ccd0d4;
      text-align: left;
      margin-top: 20px;
      border-collapse: collapse;
      width: 100%;
      font-size: 0.8em;
    }

    th {
      background-color: #cccccc;
    }

    select {
      width: 90%;
    }

    table td[data-title]::before {
      content: attr(none);
      width: 0px;
    }

    table td[data-title] {
      display: table-cell;
    }

    #tableAdmin #rowTitle {
      display: table-row;
    }

    tr .cell {
      display: block;
    }

    tr .cell {
      display: revert;
    }

    td,
    th {
      border: 0px;
    }

    #rowInfo {
      border: 0px;
    }
  }
`;
