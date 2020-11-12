import { css } from 'lit-element';

export const petitionsListCSS = css`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Roboto:wght@300;400;500;700&display=swap');

  :host {
    font-family: Roboto, 'Open Sans';
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
  label {
    color: blue;
    text-decoration: underline blue;
  }
`;

export const petitionsCSS = css`
  :host {
    font-family: Roboto, 'Open Sans';
  }

  #divdesc {
    display: flex;
    flex-direction: column;
    align-items: left;
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
    font-family: Roboto, 'Open Sans';
    color: grey;
  }
  h3 {
    font-weight: normal;
  }
`;
