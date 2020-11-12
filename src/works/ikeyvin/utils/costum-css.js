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

  .alertMessage {
    color: red;
    font-size: 12px;
  }
`;

export const tablePeticion = css`
  .table-container {
    text-align: left;
    overflow: hidden;
    width: 100%;
    display: table;
    border-color: rgb(204, 208, 212);
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    font-family: Roboto, 'Open Sans';
    color: #0a0202;
    border-collapse: collapse;
  }

  .table-container td,
  .table-container th {
    padding: 8px 10px;
    font-size: 14px;
  }

  .table-container th {
    border-bottom-color: rgb(204, 208, 212);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    background: #fff;
    font-weight: 400;
    color: rgb(10, 2, 2);
  }
  .table-container td {
    font-weight: 600;
    font-size: 13px;
    color: rgb(10, 2, 2);
  }

  .table-container .date {
    font-weight: 400;
    color: rgb(10, 2, 2);
  }

  .table-container tr:nth-of-type(odd) {
    background: #eee;
  }

  @media (max-width: 300px) {
    .table-container td:nth-child(2),
    .table-container th:nth-child(2) {
      display: none;
    }
  }
`;

export const modalPopup = css`
  * {
    box-sizing: border-box;
  }
  .modal {
    font-family: Roboto, 'Open Sans';
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
    font-size: 14px;
    font-weight: bold;
  }

  .modal input {
    font-size: 13px;
  }

  input:focus {
    outline-color: #007cba;
    color: #016087;
  }

  textarea:focus {
    outline-color: #007cba;
    color: #016087;
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

  input[type='text'],
  select,
  textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    resize: vertical;
    font-family: Roboto, 'Open Sans';
  }

  label {
    padding: 20px 10px 20px 0;
    display: inline-block;
  }

  .container {
    background-color: #ffffff;
    padding: 20px;
    margin-right: 2%;
    margin-left: 2%;
  }

  .col-25 {
    float: left;
    width: 25%;
    margin-top: 6px;
  }

  .col-75 {
    float: left;
    width: 60%;
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
