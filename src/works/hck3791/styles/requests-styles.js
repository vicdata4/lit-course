import { css } from 'lit-element';

export const requestsStyles = css`
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  table {
    margin-top: 15px;
    border-collapse: collapse;
    border: none;
    width: 100%;
    table-layout: fixed;
  }

  table caption {
    font-size: 1.3rem;
    text-align: left;
    margin-bottom: 15px;
  }

  table thead th {
    background-color: #ccc;
  }

  table tbody tr:nth-child(odd) {
    background: #eee;
  }

  table thead {
    height: 1px;
    width: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    margin: -1;
  }

  table tr {
    display: block;
  }

  table td {
    display: block;
    padding: 0.3rem;
    text-align: right;
    font-size: 0.7rem;
  }

  table td::before {
    content: attr(data-label);
    float: left;
    font-weight: bold;
  }

  table td a {
    display: inline-block;
    width: 70%;
  }

  @media all and (min-width: 400px) {
    table tr {
      display: table-row;
    }

    table tr th,
    table tr td {
      display: table-cell;
      text-align: left;
    }

    table tr th {
      padding: 10px 8px;
      font-size: 0.9rem;
    }

    table tr td {
      padding: 8px;
    }

    table thead {
      height: 100%;
      width: auto;
      overflow: visible;
      position: static;
      margin: 0;
    }

    table td::before {
      content: none;
    }

    table td a {
      display: block;
      width: 100%;
    }
  }

  @media all and (min-width: 1000px) {
    table {
      width: 60%;
    }
  }
`;
