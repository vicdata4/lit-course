import { css } from 'lit-element';

export const requestListStyles = css`

  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');

  :host {
    display: flex;
    flex-direction: column;
    align-items: left;
    font-family: 'Comic Neue', cursive;
  }

  #requestlist-container section table {
    border-collapse: collapse;
    border: 1px solid #000;
    width: 70%;
  }

  #requestlist-container section table caption {
    font-weight: 400;
    font-size: 1.3rem;
    margin-bottom: 15px;
    text-align: left;
  }

  #requestlist-container section table thead tr th:first-child {
    width: 60%;
  }

  #requestlist-container section table tr:first-child {
    background-color: #ccc;  
  }

  #requestlist-container section table tbody tr:nth-child(odd) {
    background-color: #eee;
  }

  #requestlist-container section table thead th, #requestlist-container section table tbody td {
    border-right: 1px solid #000;
  }

  #requestlist-container section table thead tr th {
    text-align:left;
    padding: 0 0 0 5px;
    font-size: 0.8rem;
  }

  #requestlist-container section table tbody tr td {
    padding: 10px 0 10px 5px;
    font-size: 0.8rem;
    font-weight: bold;
  }

`;

export const requestStyles = css`

  @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
  
  :host {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 20px;
    width: 70%;
    font-family: 'Comic Neue', cursive;
  }

  #request-container #titles {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }

  #request-container #description h3 {
    margin-top: 0;
  }

  h3 {
    font-weight: 400;
  }

  #request-container #content {
    border: 1px solid #000;
    color: #7b7c89;
    padding: 10px;
  }

  #request-container #content p {
    margin: 0;
  }

`;
