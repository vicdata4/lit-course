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
  div.container-table {
    width: 100%;
    background: #e6e6e6;
    border-radius: 8px;
    padding: 20px;
    max-width: calc(100vw - 40px);
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    position: relative;
    margin-bottom: 30px;
  }

  div.table-title {
    display: block;
    margin: auto;
    max-width: 80%;
    width: 100%;
  }

  .table-title h2 {
    margin: 10px 0;
    color: #78788c;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    text-transform: uppercase;
  }

  .table-fill {
    background: white;
    border-radius: 3px;
    border-collapse: collapse;
    height: 150px;
    margin: auto;
    max-width: 600px;
    padding: 5px;
    width: 100%;
    font-family: 'Montserrat', sans-serif;
  }

  th {
    color: #d5dde5;
    background: #1b1e24;
    border-right: 1px solid #343a45;
    font-size: 14px;
    font-style: normal;
    padding: 20px;
    text-align: left;
    vertical-align: middle;
  }

  th:first-child {
    border-top-left-radius: 3px;
  }

  th:last-child {
    border-top-right-radius: 3px;
    border-right: none;
  }

  tr {
    border-top: 1px solid #c1c3d1;
    border-bottom: 1px solid #c1c3d1;
    color: #666b85;
    font-size: 16px;
    font-weight: normal;
  }

  tr:first-child {
    border-top: none;
  }

  td {
    background: #ffffff;
    padding: 20px;
    text-align: left;
    vertical-align: middle;
    font-size: 14px;
    border-right: 1px solid #c1c3d1;
  }

  td:last-child {
    border-right: 0px;
  }

  th.text-left {
    text-align: left;
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

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #78788c;
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
  }

  .modal-title {
    padding-right: 30%;
    font-weight: bold;
    float: left;
  }

  .modal-date {
    font-weight: bold;
    padding-right: 30px;
    float: left;
  }

  .modal-items {
    width: 80%;
  }

  p {
    font-weight: bold;
    width: 30%;
  }

  textarea {
    width: 100%;
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
`;
