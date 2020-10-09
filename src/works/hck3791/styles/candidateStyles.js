import { css } from 'lit-element';

export const candidateStyles = css`
  
  #header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #f6f6f6;
    padding: 15px 8px 15px 8px;
  }

  #header #search {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
  }

  #header #search > label {
    color: #7b7c89;
    font-weight: bold;
  }

  #header #search input {
    height: 80%;
    border: none;
  }

  #header #search input:focus {
    outline: none;
  }

  #header #add > button {
    background-color: #000;
    color: #fff;
    padding: 8px 15px 8px 15px;
    text-transform: uppercase;
    font-size: 0.5rem;
  }

  #body {
    padding:10px;
  }

  #body section form {
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  #body section form h5 {
    color: #7b7c89;
  }

  #body section form div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    margin-bottom: 10px;
    font-size: 0.8rem;
    font-weight: bold;
  }

  #body section form .custom-select, #body section form .custom-checkbox {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  #body section form div label {
    width: 20%;
  }

  #body section form div input {
    box-sizing:border-box;
    width: 80%;
  }

  #body section form .custom-select select {
    width: 30%;
  }

  #body section form div input:focus, #body section form .custom-select select:focus {
    outline: none;
  }

  #body section form .custom-checkbox #onStaff {
    margin: 0;
    width: auto;

  }

  #custom-input-file::-webkit-file-upload-button {
    visibility: hidden;
  }

  #custom-input-file {
    color: transparent !important;
    font-size: 0.7rem !important;
    font-weight: bold;
  }

  #custom-input-file::before {
    display: inline-block;
    content: 'Subir CV';
    background: #f3f5f6;
    color: #81a7bd;
    padding: 8px 10px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
  }

  @media all and (max-width: 399px) and (min-width: 320px) {

    #header #search > label {
      font-size: 0.5rem;
    }

    #header #add > button {
      padding: 8px 4px;
      font-size: 0.3rem;
    }

    #body section form {
      padding: 15px;
    }

    #body section form h5 {
      font-size: 0.5rem;
    }

    #body section form div {
      font-size: 0.5rem;
    }

  }

  @media all and (min-width: 400px) and (max-width: 599px) {

    #header #search > label {
      font-size: 0.8rem;
    }

    #header #add > button {
      padding: 8px 10px;
      font-size: 0.45rem;
    }

  }

`;
