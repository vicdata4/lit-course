import { css } from 'lit-element';

export const mediaQueries = css`
    @media (min-width: 768px) {
      .container {
        width: 90%;
        margin: auto;
        }
      .startWrap, .endWrap {
        display: inline;
        margin-right: 15px;
        }
      .startLabel, .endLabel {
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
    table, th { 
      border: 2px solid black;
      border-collapse: collapse;
    }
    .rotated { 
      transform: rotate(180deg);
      }
    .order, .deleteB {
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
    .stepper {
      margin-top: 20px;
      }
`;

export const formStyles = css`
    .startWrap, .endWrap {
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
`;

export const anotherStyles = css`
  .contents {
    padding: 5px;
  }
  .buttonsWrap {
    display: inline-flex;
    margin-bottom: 20px;
  }
  .order{
    text-align: left;
    margin-right: 10px;
    border: 2px solid #3c3b3b;
    background-color: transparent;
  }
  .icon {
    border: none;
    background-color: transparent;
    }
  .rotated { 
    transform: rotate(180deg);
  }
  .buttonWrap {
    margin-top: 10px;
    width: 15%;
    margin-left: 85%;
  }
  .deleteB {
    border: none; 
    background-color: transparent;
    cursor: pointer;
  }
  .detailsWrap { 
    border: 2px solid black;
    padding: 10px;
    margin-bottom: 5px;
  }
  details[open] {
    border: none;
  }
  .detailsWrap > summary::-webkit-details-marker {
    display: none;
  }
  .contents > div > span, .summaryWrap > span {
    font-weight: bold;
  }
  .detailsWrap[open] > summary::-webkit-details-marker {
    display: initial;
  }
`;
