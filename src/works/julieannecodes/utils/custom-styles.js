import { css } from 'lit-element';

export const mediaQueries = css`
  @media (min-width: 768px) {
    .container {
      width: 90%;
      margin: auto;
    }
    .startWrap,
    .endWrap {
      display: inline;
      margin-right: 15px;
    }
    .startLabel,
    .endLabel {
      margin-right: 15px;
    }
    .alert-msg {
      margin-top: 15px;
    }
    .formWrap {
      display: inline;
    }
  }
  @media (min-width: 1024px) {
    .container {
      width: 70%;
    }
  }
`;

export const tableStyles = css`
  .tableDiv {
    margin-top: 20px;
    overflow-x: auto;
  }
  table tr:nth-child(even) {
    background-color: lightgray;
  }
  table td {
    border-right: 2px solid black;
  }
  table,
  th {
    border: 2px solid black;
    border-collapse: collapse;
  }
  .rotated {
    transform: rotate(180deg);
  }
  .order,
  .deleteB {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .buttonWrap {
    width: 60%;
    margin: auto;
  }
`;

export const stepperStyles = css`
  .bSteps {
    margin-left: 2px;
    margin-right: 2px;
    width: 30px;
    height: 22px;
  }
  .btOrder {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .selected {
    background-color: #3c3b3b;
    color: white;
    border: none;
  }
  .stepper {
    margin-top: 20px;
  }
`;

export const formStyles = css`
  .startWrap,
  .endWrap {
    margin-bottom: 15px;
  }
  .startLabel {
    margin-right: 15px;
  }
  .endLabel {
    margin-right: 35px;
  }
  .alert-msg {
    margin-top: 15px;
  }
  .input {
    padding: 0 8px;
    min-height: 30px;
    box-shadow: 0 0 0 transparent;
    border-radius: 4px;
    border: 1px solid #7e8993;
    background-color: #fff;
    color: #32373c;
  }
  .submitButton {
    background-color: #0a0202;
    color: #fff;
    text-align: center;
    letter-spacing: 0.5px;
    transition: 0.2s ease-out;
    padding: 0 2rem;
    text-decoration: none;
    border: none;
    height: 36px;
    border-radius: 2px;
  }
`;

export const anotherStyles = css`
  .desktopTable {
    display: none;
  }
  .mobileTable tr {
    border-bottom: 1px solid #f6f6f6;
  }
  table {
    border: 1px solid #ccd0d4;
    border-collapse: collapse;
    width: 100%;
    position: relative;
    font-size: 13px;
    line-height: 1.4em;
  }
  table:nth-child(2) td:nth-of-type(odd) {
    background-color: #f6f6f6;
  }
  .contents {
    padding: 5px;
  }
  .order {
    font-size: 15px;
    margin-bottom: 5px;
  }
  .icon {
    border: 1px solid black;
    border-radius: 2px;
    background-color: transparent;
  }
  .rotated {
    transform: rotate(180deg);
  }
  .buttonWrap {
    margin-top: 10px;
    margin-left: 85%;
  }
  .deleteB {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .add-icon {
    margin-left: 10px;
  }
  details[open] summary ~ * {
    animation: open 0.3s ease-in-out;
  }
  @keyframes open {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  details summary::-webkit-details-marker {
    display: none;
  }
  details summary {
    border: 1px solid #ccd0d4;
    padding: 5px 0px 5px 5px;
  }
  .dataRows:nth-of-type(even) details {
    background-color: #f6f6f6;
  }
  details summary:after {
    transform-origin: center;
    transition: 200ms linear;
  }
  details[open] summary {
    border: none;
    outline: none;
  }
  details[open] summary .add-icon {
    transform: rotate(45deg);
  }
  details[open] summary span:nth-of-type(-n + 4) {
    visibility: hidden;
  }
  details summary span:nth-of-type(-n + 3):nth-of-type(odd) {
    font-weight: bolder;
  }
  @media (min-width: 768px) {
    .responsiveTable {
      display: none;
    }
    .desktopTable {
      display: block;
    }
    .desktopTable table tr,
    .desktopTable table th,
    .desktopTable table td {
      display: revert;
    }
  }
  @media (min-width: 1440px), (min-width: 1120px) {
    .dataRows {
      width: 35%;
    }
    .buttonsWrap {
      width: 100%;
    }
    details {
      cursor: pointer;
    }
    details[open] {
      cursor: default;
    }
    details[open] summary {
      cursor: pointer;
      outline: none;
    }
  }
  @media (min-width: 890px) {
    .buttonsWrap {
      width: 100%;
    }
  }
`;
