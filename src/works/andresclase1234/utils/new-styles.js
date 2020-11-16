import { css } from 'lit-element';

export const adminStyle = css`
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
  }
  .container {
    width: 100%;
    font-family: Roboto, 'Open Sans';
  }
  table {
    border: 1px solid #ccd0d4;
    border-collapse: collapse;
    margin-left: 1%;
    margin-right: 1%;
    width: 98%;
  }
  tr:first-of-type {
    border: 1px solid #ccd0d4;
  }
  tr:nth-child(even) {
    background-color: #f6f6f6;
  }
  td {
    font-weight: 500;
    text-size-adjust: 100%;
    line-height: 54px;
    color: rgb(85, 85, 85);
    padding-left: 10px;
  }
  .tdHeader {
    font-family: Roboto, 'Open Sans';
    color: rgb(10, 2, 2);
    font-weight: 400px;
    line-height: 36px;
    text-size-adjust: 100%;
    text-align: left;
    padding-left: 8px;
  }
  body {
    color: #444;
    line-height: 1.4em;
  }
  a {
    color: #0071a1;
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
