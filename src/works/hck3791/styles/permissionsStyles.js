import { css } from 'lit-element';

export const permissionsStyles = css`

  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');

  :host {
    font-family: 'Comic Neue', cursive;
  }

  .no-visible {
    display: none;
  }

  #filters div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  #filters div label {
    width: 20%;
  }

  #filters div #employeeSelect {
    width: 20%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url('/assets/hck3791/icons/down-arrow-64.png') 101% / 20% no-repeat;
    padding: 2px;
  }

  #filters div #employeeSelect:focus,  #filters div input:focus {
    outline: none;
  }

  #filters div input {
    width: 20%;
    box-sizing: border-box;
  }

  .custom-input::-webkit-datetime-edit-day-field,
  .custom-input::-webkit-datetime-edit-month-field,
  .custom-input::-webkit-datetime-edit-year-field {
    visibility:hidden;
  }

  .custom-default::-webkit-datetime-edit-day-field,
  .custom-default::-webkit-datetime-edit-month-field,
  .custom-default::-webkit-datetime-edit-year-field {
    visibility:visible;
  }

`;
