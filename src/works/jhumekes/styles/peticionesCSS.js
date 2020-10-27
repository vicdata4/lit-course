import { css } from 'lit-element';

export const listaPeticionesCSS = css`
  :host {
    font-family: 'Comic Sans', cursive;
  }
  thead tr td {
    background-color: darkgrey;
  }
  section {
    width: 60%;
  }
  table {
    display: table;
    border-collapse: collapse;
    border: solid black 1px;
    border-spacing: 0px;
    width: 100%;
  }
  tr:nth-child(2n + 1) {
    background-color: lightgrey;
  }
`;

export const peticionesCSS = css`
  :host {
    font-family: 'Comic Sans', cursive;
  }

  #divdesc {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 75%;
    padding: 15px;
  }
  #divdesc section {
    width: 70%;
  }
  #titulo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #h2fecha {
    text-align: right;
  }

  #reqContainer {
    border: solid black 1px;
    padding-left: 10px;
  }

  p {
    font-family: 'Comic Sans', cursive;
    color: grey;
  }
`;
