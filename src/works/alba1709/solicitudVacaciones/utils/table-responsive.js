import { css } from 'lit-element';

export const responsiveTable = css`
  @media (max-width: 760px) {
    #tablaSoli tr {
      display: flex;
      flex-direction: column;
      padding: 1em;
      margin-bottm: 1em;
    }

    tr th {
      display: none;
    }
    table td[data-title] {
      display: flex;
    }
    table td[data-title]::before {
      content: attr(data-title);
      width: 130px;
    }
    .btnOrder {
      display: block;
    }
  }
`;
