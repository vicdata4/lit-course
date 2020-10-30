import { css } from 'lit-element';

export const formPeticion = css`
  .form {
    width: 340px;
    height: 400px;
    background: #e6e6e6;
    border-radius: 8px;
    padding: 20px 30px;
    max-width: calc(100vw - 40px);
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    position: relative;
    margin-bottom: 30px;
  }

  h2 {
    margin: 10px 0;
    padding-bottom: 10px;
    width: 100%;
    color: #78788c;
    border-bottom: 3px solid #78788c;
  }

  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: none;
    outline: none;
    resize: none;
    border: 0;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s;
    border-bottom: 2px solid #bebed2;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    background: none;
    outline: none;
    border: 0;
    font-family: 'Montserrat', sans-serif;
    transition: all 0.3s;
    border-bottom: 2px solid #bebed2;
  }

  input[type='checkbox'] {
    color: #5a5a5a;
    width: 5%;
  }

  input[type='checkbox'] + label {
    color: #5a5a5a;
    padding-bottom: 10px;
    font-size: 14px;
  }

  input:focus {
    border-bottom: 2px solid #78788c;
  }

  textarea:focus {
    border: 2px solid #78788c;
  }

  p:before {
    content: attr(type);
    display: block;
    margin: 28px 0 0;
    font-size: 14px;
    color: #5a5a5a;
  }
  button {
    float: right;
    padding: 8px 12px;
    margin: 8px 0 0;
    font-family: 'Montserrat', sans-serif;
    border: 2px solid #78788c;
    background: 0;
    color: #5a5a6e;
    cursor: pointer;
    transition: all 0.3s;
  }

  button:hover {
    background: #78788c;
    color: #fff;
  }

  span {
    margin: 0 5px 0 15px;
  }
`;

export const tablePeticion = css`
  .table-container th h1 {
    font-family: 'Raleway';
    font-variant: petite-caps;
    font-weight: bold;
    font-size: 1.1em;
    text-align: left;
    color: grey;
  }

  .table-container td {
    font-family: 'Raleway';
    font-weight: normal;
    font-size: 1em;
  }

  .table-container {
    text-align: left;
    overflow: hidden;
    width: 40%;
    margin: 0 auto;
    display: table;
    padding: 0 0 8em 0;
  }

  .table-container td,
  .table-container th {
    padding-bottom: 2%;
    padding-top: 2%;
    padding-left: 2%;
  }

  .table-container tr:nth-of-type(odd) {
    background: #eee;
  }

  .table-container th {
    background-color: #1c2b2d;
  }

  .table-container td:first-child {
    color: #403e10;
  }

  .table-container a:hover {
    color: #51adcf;
    font-weight: bold;
  }

  @media (max-width: 300px) {
    .table-container td:nth-child(2),
    .table-container th:nth-child(2) {
      display: none;
    }
  }
`;

export const modalPopup = css`
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
  }

  .modal.active {
    display: block;
  }

  .clearBoth {
    clear: both;
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modal {
    box-sizing: border-box;
  }

  input[type='text'],
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  label {
    padding: 12px 12px 12px 0;
    display: inline-block;
  }

  input[type='submit'] {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
  }

  input[type='submit']:hover {
    background-color: #45a049;
  }

  .container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    margin: 20%;
  }

  .col-25 {
    float: left;
    width: 20%;
    margin-top: 6px;
  }

  .col-75 {
    float: left;
    width: 70%;
    margin-top: 6px;
  }

  .row:after {
    content: '';
    display: table;
    clear: both;
  }

  @media screen and (max-width: 600px) {
    .col-25,
    .col-75,
    input[type='submit'] {
      width: 100%;
      margin-top: 0;
    }
  }
`;
