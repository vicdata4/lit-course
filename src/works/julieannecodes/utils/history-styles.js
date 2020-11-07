import { css } from 'lit-element';

export const historyStyles = css`
  .tableContainer {
    margin-top: 20px;
  }
  .historyTable {
    border: 1px solid #ccd0d4;
    border-collapse: collapse;
    width: 100%;
    position: relative;
    font-size: 13px;
    line-height: 1.4em;
  }
  .historyTable tr td {
    padding: 4px 5px;
    text-align: center;
  }
  .historyTable tr:nth-of-type(even) {
    background-color: #f6f6f6;
  }
  h2 {
    font-weight: 400;
  }
`;
