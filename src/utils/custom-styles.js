import { css } from 'lit-element';

export const navigatorStyles = css`
  :host {
    --background-color: #eae8e8;
    --dark-color: #3c3b3b;
  }

  .menu-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .menu-list li {
    color: black;
    background-color: var(--background-color);
    margin-bottom: 2px;
    font-size: 20px;
    cursor: pointer;
  }

  .menu-list li a:hover {
    background-color: #3e5c7b;
    color: white;
  }

  .menu-list li a {
    display: block;
    text-decoration: none;
    color: black;
    padding: 20px;
    text-align: center;
  }

  @media (min-width: 768px) {
    .menu-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }

    .menu-list li {
      margin: 20px;
      line-height: 150px;
      border-radius: 3px;
    }

    .menu-list li a {
      height: 150px;
      width: 150px;
    }
  }
`;

export const commonStyles = css`
  .container {
    padding: 20px;
  }
`;

export const tableStyles = css`
    table {
      border: 2px solid black;
      margin-top: 30px;
    }
    table tr:nth-child(even) {
      background-color: lightgray;
    }
    table td {
      border-right: 2px solid black;
    }
`;
