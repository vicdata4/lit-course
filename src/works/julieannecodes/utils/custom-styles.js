import { css } from 'lit-element';

export const tableStyles = css`
    table {margin-top: 30px;}
    table tr:nth-child(even) {
      background-color: lightgray;
    }
    table td {
      border-right: 2px solid black;
    }
    table, th { border: 2px solid black;
    border-collapse: collapse;
    }
    .rotated {
      transform: rotate(180deg);
    }
`;

export const stepperStyles = css`
    .bSteps {
      margin-left: 2px; margin-right: 2px;
      width: 30px; height: 22px;
    }
    .btOrder { 
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
    .selected {
      background-color: black;
      color: white;
      border: none;
    }
`;
