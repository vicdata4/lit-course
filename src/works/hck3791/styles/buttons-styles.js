import { css } from 'lit-element';

export const buttons = css`
  #generateButtons {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 10px 0 0 0;
  }

  #generateComponent {
    text-transform: capitalize;
    font-weight: bold;
    font-size: 0.7rem;
    margin: 0 5px 0 0;
    background-color: #eee;
    border-radius: 6px;
    border: none;
    margin-top: 5px;
  }
`;
