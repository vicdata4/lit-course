import { css } from 'lit-element';

export const HOURS = css`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

  :host {
    font-family: 'Open Sans', sans-serif;
  }

  .hours-container {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
  }

  select {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url('/assets/hck3791/icons/down-arrow-64.png') 100% / 20% no-repeat;
    padding: 2px;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10px;
  }

  div label {
    font-weight: bold;
  }

  label,
  select {
    width: 20%;
  }

  div select:focus {
    outline: none;
  }

  #generateReport {
    padding: 7px 10px;
    font-size: 0.7em;
  }

  table {
    border-collapse: collapse;
    border: 1px solid black;
    font-size: 0.75em;
    text-align: left;
  }

  table thead tr:first-child {
    background-color: #ccc;
  }

  table tbody tr:nth-child(odd) {
    background: #eee;
  }

  table td {
    border-right: 1px solid black;
    padding: 10px 10px 10px 5px;
    font-weight: 600;
  }

  table th {
    border-right: 1px solid black;
    padding: 4px 10px 4px 5px;
  }

  @media only screen and (max-width: 600px) {
    h3 {
      font-size: 0.9rem;
    }

    label,
    select {
      font-size: 0.7rem;
      width: 30%;
    }

    table {
      font-size: 0.47em;
    }
  }

  @media only screen and (max-width: 375px) {
    h3 {
      font-size: 0.8rem;
    }

    label,
    select {
      font-size: 0.5rem;
      width: 30%;
    }

    #generateReport {
      padding: 3.5px 5px;
      font-size: 0.5em;
    }

    table {
      font-size: 0.45rem;
    }

    table td {
      border-right: 1px solid black;
      padding: 3.5px 1px 3.5px 2px;
    }

    table th {
      border-right: 1px solid black;
      padding: 4px 7px 4px 5px;
    }
  }

  @media only screen and (max-width: 320px) {
    h3 {
      font-size: 0.7rem;
    }

    label,
    select {
      font-size: 0.45rem;
      width: 30%;
    }

    #generateReport {
      padding: 3px 4px;
      font-size: 0.45em;
    }

    table {
      font-size: 0.45rem;
    }

    table td {
      border-right: 1px solid black;
      padding: 2px 0 2px 2px;
    }

    table th {
      border-right: 1px solid black;
      padding: 2px 1px 2px 2px;
    }

    select {
      background: url('/assets/hck3791/icons/down-arrow-64.png') 101% / 20% no-repeat;
    }
  }

  @media only screen and (max-width: 280px) {
    h3 {
      font-size: 0.6rem;
    }

    label,
    select {
      font-size: 0.4rem;
    }

    #generateReport {
      padding: 3px 5px;
      font-size: 0.4em;
    }

    table {
      font-size: 0.4rem;
    }
  }
`;
