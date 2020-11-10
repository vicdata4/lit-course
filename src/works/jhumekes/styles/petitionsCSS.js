import { css } from 'lit-element';

export const petitionsListCSS = css`
  :host {
    font-family: 'inherit', cursive;
  }
  thead tr td {
    background-color: white;
  }

  table {
    display: table;
    border-collapse: collapse;
    border: solid #ccd0d4 1px;
    border-spacing: 0px;
    width: 100%;
  }

  @media only screen and (min-width: 600px) {
    table {
      width: 100%;
    }
  }

  tr:nth-child(2n + 1) {
    background-color: #f6f6f6;
  }

  h3 {
    font-weight: normal;
  }
  thead {
    border: solid #ccd0d4 1px;
  }
`;

export const petitionsCSS = css`
  :host {
    font-family: 'Comic Sans', cursive;
  }

  #divdesc {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
    padding: 15px;
  }
  #divdesc section {
    width: 100%;
  }
  #title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #h2date {
    text-align: right;
  }

  #reqContainer {
    border: solid #ccd0d4 1px;
    padding-left: 10px;
  }

  @media only screen and (min-width: 600px) {
    #divdesc section {
      width: 100%;
    }
  }

  p {
    font-family: 'Comic Sans';
    color: grey;
  }
  h2 {
    font-weight: normal;
  }
`;
