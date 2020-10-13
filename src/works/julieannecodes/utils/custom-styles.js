import { css } from 'lit-element';

export const tableStyles = css`

    @media only screen and (max-width: 600px) {
      .tableDiv { 
        overflow-x: auto;
        margin-bottom: 20px;
        }
    }
    @media only screen and (min-width: 1200px) {
      .tableDiv { width: 80%; margin: auto; }
      h1 { width: 50%; margin-left: 115px; }
      .stepper { width: 50%; margin-left: 120px; }
    }
    @media only screen and (min-width: 768px) {
      .container { width: 90%; margin: auto;}
    }
    @media only screen and (min-width: 1200px) {
      .container { width: 70%; margin: auto;}
    }
    .tableDiv { 
      margin-top: 20px;
      
      }
    table tr:nth-child(even) { background-color: lightgray; }
    table td { border-right: 2px solid black; }
    table, th { 
      border: 2px solid black;
      border-collapse: collapse;
    }
    .rotated { transform: rotate(180deg); }
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
      background-color: #3c3b3b; color: white;
      border: none;
    }
`;
