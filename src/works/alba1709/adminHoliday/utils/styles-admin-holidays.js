import { css } from 'lit-element';

export const viewHoliday = css`
  #tableAdmin {
    border: 3px solid black;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    font-size: 0.8rem;
    overflow: scroll;
    overflow-x: auto;
  }
  #tableAdmin tr:nth-child(odd) {
    background-color: #eeeeee;
  }
  td, th {
    border-right: solid 3px black;
    border-left: solid 3px black;
    font-family: "Comic Sans MS", cursive, sans-serif;
    white-space: nowrap;
  }
  h2 {
    font-family: "Comic Sans MS", cursive, sans-serif; 
  }
  .btnOrder {
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: transform .2s ease-in;
    font-size: 20px;
  }
  
  .btnOrder.rotate {
    transform: rotate(180deg);
  }
  
  
  }
`;
