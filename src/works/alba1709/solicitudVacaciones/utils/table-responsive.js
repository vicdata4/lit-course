import { css } from 'lit-element';

export const responsiveTable = css`
  @media (max-width: 760px) {
    #tablaSoli {
      border: none;
    }

    #tablaSoli tr {
      display: flex;
      flex-direction: column;
      padding: 1em;
      margin-bottom: 1em;
    }

    tr .cell {
      display: none;
    }

    tr .ord {
      border: none;
    }

    td {
      border: none;
    }

    #rowInfo {
      border: 1px solid grey;
    }

    #rowTitle {
      background-color: #cccccc;
    }

    table td[data-title] {
      display: flex;
    }
    table td[data-title]::before {
      content: attr(data-title);
      width: 130px;
    }

    #inputStart,
    #inputEnd {
      margin-bottom: 15px;
    }
  }
`;
