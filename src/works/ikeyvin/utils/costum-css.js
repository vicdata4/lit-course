import { css } from 'lit-element';

export const formPeticion = css`
  * {
    box-sizing: border-box;
  }

  .form {
    width: 100%;
    border-color: rgb(204, 208, 212);
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    font-family: Roboto, 'Open Sans';
    color: #0a0202;
    letter-spacing: 0.5px;
    position: relative;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }

  .petitionForm {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: 10px;
  }

  .column-a1 {
    flex: 1;
    margin: 3px;
  }

  .column-a2 {
    max-width: 300px;
    flex: 1;
    margin: 3px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  .content {
    padding: 10px;
    font-size: 14px;
  }

  .heading {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 24px;
    background-color: #f6f6f6;
    border-bottom-color: rgb(204, 208, 212);
    border-bottom-style: solid;
    border-bottom-width: 1px;
    position: relative;
  }

  .heading h1 {
    color: #23282d;
    font-size: 23px;
    padding: 24px;
    font-weight: 400;
    display: inline-block;
  }

  .heading button {
    font-family: Roboto, 'Open Sans';
    color: #ffffff;
    background-color: #0a0202;
    border-radius: 2px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    font-weight: 600;
    font-size: 14px;
    padding: 0px 28px;
    height: 36px;
    outline-width: 0px;
    letter-spacing: 0.5px;
    cursor: pointer;
    outline-style: none;
    border: none;
    float: right;
    margin-top: 33px;
    margin-right: 28px;
  }

  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-color: #7e8993;
    border-width: 1px;
    border-radius: 3px;
  }

  textarea {
    width: 100%;
    height: 300px;
    padding: 10px;
    box-sizing: border-box;
    resize: vertical;
    border-color: #7e8993;
  }

  input[type='checkbox'] {
    color: #5a5a5a;
    width: auto;
    transform: scale(2, 2);
    margin: 10px;
    border-color: rgb(204, 208, 212);
    cursor: pointer;
  }

  input[type='checkbox'] + label {
    color: #5a5a5a;
    padding-bottom: 10px;
    font-size: 14px;
  }

  .postPet {
    border-color: rgb(204, 208, 212);
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    margin-bottom: 15px;
  }

  #cliPet:focus,
  #candiPet:focus {
    outline-color: #007cba;
    color: #016087;
  }

  option {
    color: #016087;
  }

  input:focus {
    outline-color: #007cba;
    color: #016087;
  }

  textarea:focus {
    outline-color: #007cba;
    color: #016087;
  }

  p:before {
    content: attr(type);
    display: block;
    font-size: 14px;
    color: #5a5a5a;
  }

  .descrip {
    width: auto;
    border-color: rgb(204, 208, 212);
    border-style: solid;
    border-width: 1px;
    border-bottom-width: 0;
    margin-bottom: 0;
    background-color: rgb(246, 246, 246);
    padding: 10px;
    font-weight: bold;
  }

  .postHead {
    width: auto;
    background-color: rgb(246, 246, 246);
    padding: 10px;
    margin: 0px;
    font-weight: bold;
    border-bottom-color: rgb(204, 208, 212);
    border-bottom-style: solid;
    border-bottom-width: 1px;
  }

  .postFoot {
    width: 100%;
    background-color: rgb(246, 246, 246);
    padding: 10px;
    margin: 0px;
    font-size: 13px;
    border-top-color: rgb(204, 208, 212);
    border-top-style: solid;
    border-top-width: 1px;
    display: flex;
    flex-flow: row wrap;
  }

  .foot-right {
    flex: 1;
    padding-left: 30px;
  }

  .foot-left {
    flex: 1;
    padding-top: 5px;
  }

  select {
    width: 100%;
    padding: 5px;
    border-color: rgb(204, 208, 212);
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    border-color: #7e8993;
  }

  a {
    cursor: pointer;
  }

  .contentArea {
    padding: 15px;
    color: #23282d;
    font-size: 13px;
  }

  .updateBtn {
    font-family: Roboto, 'Open Sans';
    color: #ffffff;
    background-color: #0a0202;
    border-radius: 2px;
    font-weight: 600;
    font-size: 13px;
    outline-style: none;
    border: none;
    height: 25px;
    width: 100%;
    margin: 0;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    cursor: pointer;
  }

  .subBtn {
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
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  .alertMessage {
    font-family: Roboto, 'Open Sans';
    letter-spacing: 0.5px;
    display: none;
    position: fixed;
    z-index: 1;
    padding: 200px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    font-size: 14px;
    font-weight: bold;
    box-shadow: 10px 10px;
  }
  .closebtn {
    margin-left: 15px;
    color: black;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
  }

  .closebtn:hover {
    color: gray;
  }
  .message {
    background-color: #ffffff;
    padding: 20px;
    margin-right: 2%;
    margin-left: 2%;
  }

  .alertMessage.active {
    display: block;
  }

  @media only screen and (max-width: 600px) {
    .heading button {
      font-size: 10px;
      padding: 0px 15px;
      margin-top: 20px;
      margin-right: 20px;
    }

    .heading h1 {
      font-size: 14px;
      padding: 20px;
    }

    .petitionForm {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 55vh 70vh;
    }

    .column-a2 {
      max-width: 600px;
    }
  }

  @media only screen and (max-width: 340px) {
    .heading button {
      font-size: 10px;
      padding: 0px 15px;
      margin-top: 20px;
      margin-right: 20px;
    }

    .heading h1 {
      font-size: 14px;
      padding: 20px;
    }

    .petitionForm {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 72vh 85vh;
    }

    .column-a2 {
      max-width: 600px;
    }
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
    letter-spacing: 0.5px;
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

  a {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    .table-container td:nth-child(4),
    .table-container th:nth-child(4),
    .table-container td:nth-child(3),
    .table-container th:nth-child(3),
    .table-container td:nth-child(5),
    .table-container th:nth-child(5) {
      display: none;
    }
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
    letter-spacing: 0.5px;
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
    box-shadow: 10px 10px;
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
