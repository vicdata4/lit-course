import { css } from 'lit-element';

export const commonStyles = css`
  html{
    line-height: 1.5;
    font-family: Roboto,sans-serif;
    font-weight: 400;
    color: rgba(0,0,0,.87);
  }
  button {
    background-color: #010101;
    color: white;
    font-style: cursive;
  }
  .order {
    padding: 0;
    background-color: white;
    border: none;
    margin-bottom: 10px;
    cursor: pointer;
    width: 10px;
    height: 4px;
    margin-top: 8px;
    margin-left: 7px;
  }

  .stepper {
    margin: 10px 0;
    color: #a0a5aa!important;
    border-color: #ddd!important;
    box-shadow: none!important;
    text-shadow: 0 1px 0 #fff!important;
    cursor: default;
    transform: none!important;
}
  }

  .stepper .step:hover {
    background-color: #f1f1f1;
  }

  .step {
    display: inline-block;
    padding: 5px;
    border: 1px solid #d8d7d7;
    width: 20px;
    height: auto;
    text-align: center;
    cursor: pointer;
  }

  .step:hover .order:hover {
    color: #444;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  }
  .step.active {
    background-color: #535353 !important;
    color: white;
  }

  .step.left {
    transform: rotate(180deg);
  }

  .stepper,
  .step {
    user-select: none;
  }

  .svg_sort,
  .svg_trash {
    width: 15px;
    height: auto;
    margin: 0;
    cursor: pointer;
    overflow: visible;
    fill: #000;
  }
`;
