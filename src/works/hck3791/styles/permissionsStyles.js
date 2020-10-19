import { css } from 'lit-element';

export const permissionsStyles = css`

  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');

  :host {
    font-family: 'Comic Neue', cursive;
  }

  .no-visible {
    visibility: hidden;
  }

  .permissions-container {
    display: flex;
    flex-direction: column;
    aling-item: center;
  }

  .filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  p {
    margin: 0;
  }

  .filter div {
    transform: rotate(90deg);
    cursor: pointer;
  }

  .filter span {
    margin-right: 2px;
  }

  #filters div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  #filters div label {
    width: 30%;
    font-size: 0.8rem;
  }

  #filters div #employeeSelect {
    width: 60%;
    height: 20px;
    font-family: 'Comic Neue', cursive;
    font-weight: bold;
    font-size: 0.7rem;
  }

  #filters div #employeeSelect:focus,  #filters div input:focus {
    outline: none;
  }

  #filters div input {
    width: 60%;
    height: 20px;
    box-sizing: border-box;
    font-family: 'Comic Neue', cursive;
    font-weight: bold;
    font-size: 0.7rem;
  }

  #generateReport {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 15px;
    padding: 5px;
    font-family: 'Comic Neue', cursive;
    font-weight: bold;
    font-size: 0.7rem;
  }

  table {
    width: 100%;
    border: 1px solid #000;
    border-collapse: collapse;
    font-size: 0.6rem;
    font-weight: bold;
  }

  table thead tr {
    background-color: #ccc;
  }

  table thead tr p {
    padding-left: 5px;
  }

  table tbody tr:nth-child(odd) {
    background-color: #eee;
  }

  table tbody tr td {
    padding: 10px 0 10px 5px;
  }

  table thead th, table tbody td {
    text-align: left;
    border-right: 1px solid #000;
  }

  #navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #navigation input {
    background-color: transparent;
    border: none;
  }

  #navigation input:focus {
    outline: none;
  }

  @media screen and (min-width: 40em) {
    .permissions-container {
      width: 80%;
      margin-right: auto;
      margin-left: auto;
    }
    
    #filters div {
      justify-content: flex-start;
    }

    #filters div label {
      width: 20%;
      font-size: 1rem;
    }
  
    #filters div #employeeSelect {
      width: 40%;
      height: auto;
      font-size: 0.9rem;
    }
  
    #filters div input {
      width: 40%;
      height: auto;
      font-size: 0.9rem;
    }

    #generateReport {
      width: 120px;
    }

    table {
      font-size: 0.9rem;
    }

    #navigation input {
      font-size: 1.5rem;
    }
  }

`;
