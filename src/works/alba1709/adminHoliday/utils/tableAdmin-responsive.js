import { css } from 'lit-element';

export const responsiveTable = css`
  @media (max-width: 760px) {
    #tableAdmin {
      border: none;
      font-size: 0.7em;
    }

    #tableAdmin #rowTitle {
      display: flex;
      padding: 1em 0.5em;
      margin-bottom: 1em;
      background-color: #cccccc;
    }

    tr .cell {
      display: none;
    }

    tr .ord {
      border: none;
    }

    td {
      border: none;
      padding: 1em;
      border: 1px solid grey;
    }

    #rowInfo {
      border: 1px solid grey;
      align-content: center;
      margin-bottom: 1em;
    }

    table td[data-title] {
      display: flex;
    }

    table td[data-title]::before {
      content: attr(data-title);
      width: 130px;
      font-weight: bold;
    }

    #inputStart,
    #inputEnd {
      margin-bottom: 15px;
    }

    #papelera {
      width: 22px;
      height: 22px;
    }
  }
`;
