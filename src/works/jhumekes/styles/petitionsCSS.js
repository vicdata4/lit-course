import { css } from 'lit-element';

export const petitionsListCSS = css`
  :host {
    font-family: 'Comic Sans', cursive;
  }
  thead tr td {
    background-color: darkgrey;
  }

  table {
    display: table;
    border-collapse: collapse;
    border: solid black 1px;
    border-spacing: 0px;
    width: 100%;
  }

  @media only screen and (min-width: 600px) {
    table {
      width: 50%;
    }
  }

  tr:nth-child(2n + 1) {
    background-color: lightgrey;
  }

  label {
    color: blue;
    text-decoration: underline blue;
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
    width: 75%;
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
    border: solid black 1px;
    padding-left: 10px;
  }

  @media only screen and (min-width: 600px) {
    #divdesc section {
      width: 60%;
    }
  }

  p {
    font-family: 'Comic Sans', cursive;
    color: grey;
  }
`;
