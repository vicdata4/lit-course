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
    background-color: #a1a1a1;
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
  }
`;

export const commonStyles = css`
  .container {
    padding: 20px;
  }
`;
