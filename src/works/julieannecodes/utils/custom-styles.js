import { css } from 'lit-element';
export const mediaQueries = css`
  @media (min-width: 768px) {
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
    .stepper {
      margin-top: 20px;
    }
    .responsiveTable {
      display: none;
    }
    .desktopTable {
      display: inline-table;
      margin-top: 20px;
    }
    .desktopTable td {
      text-align: center;
    }
    .desktopTable tr td,
    .desktopTable th {
      padding: 8px 10px;
    }
    .desktopTable tr:nth-child(even) {
      background-color: #f6f6f6;
    }
  }
`;

export const stepperStyles = css`
  .bSteps {
    margin-left: 2px;
    margin-right: 2px;
    width: 30px;
    height: 22px;
    border-radius: 4px;
    border: 1px solid #7e8993;
    background-color: #fff;
    color: #32373c;
  }
  .btOrder {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
  .selected {
    background-color: #0071a1;
    color: white;
    border: none;
  }
  .stepper {
    margin-top: 20px;
  }
  .left,
  .right {
    border: none;
    color: #0071a1;
    border-radius: 4px;
    height: 30px;
    font-size: 16px !important;
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
  .input:focus {
    outline: none !important;
    box-shadow: 0 0 0 1px #0071a1;
    color: #0071a1;
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

export const requestTableS = css`
  .desktopTable {
    display: none;
  }
  h3 {
    font-size: 23px;
    line-height: 1.3;
    color: #23282d;
    font-weight: 400;
  }
  .mobileTable tr {
    border-bottom: 1px solid #f6f6f6;
  }
  .mobileTable tr td {
    padding: 4px 5px;
  }
  .mobileTable tr td:nth-of-type(odd) {
    background-color: #f6f6f6;
  }
  table {
    border: 1px solid #ccd0d4;
    border-collapse: collapse;
    width: 100%;
    position: relative;
    font-size: 13px;
    line-height: 1.4em;
  }
  .contents {
    padding: 5px;
  }
  .order {
    letter-spacing: 0.5px;
    text-decoration: none;
    height: 30px;
    margin: 0px 8px 8px 0px;
    display: inline-flex;
    align-items: center;
  }
  .icon {
    margin-left: 5px;
    font-size: 18px !important;
    color: #0071a1;
    background-color: #f6f6f6;
    border: none;
    border-radius: 2px;
  }
  .icon:focus,
  .deleteB:focus {
    outline: none !important;
    box-shadow: 0 0 0 1px #0071a1;
  }
  .dataRows:nth-of-type(1) {
    margin-top: 23px;
  }
  .rotated {
    transform: rotate(180deg);
  }
  .buttonWrap {
    margin-top: 10px;
    margin-left: 90%;
  }
  .deleteB {
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 2px;
  }
  .add-icon {
    position: absolute;
    right: 10px;
  }
  .dataRows:nth-of-type(odd) details summary {
    background-color: #f6f6f6;
  }
  .dataRows:nth-of-type(odd) details[open] summary {
    background-color: transparent;
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
  details summary:after {
    transform-origin: center;
    transition: 200ms linear;
  }
  details summary span:nth-of-type(2) {
    margin-right: 8px;
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
`;
