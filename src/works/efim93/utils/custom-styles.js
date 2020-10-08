import { css } from 'lit-element';

/**
 * estilos css customisados por mi
 */
export const commonStyles = css`
  .container {
    padding: 20px;
  }
   
  #alerta {
    margin-top:15px;
    display: none;
  }

  #tabla {
    margin-top: 15px;
  }
  table {
    border: 1px solid #e4e4e4;
    padding: 10px;
  }
  tr {
    text-align: left;
  }
  td {
    min-width: 200px; 
  }
  .order {
    padding: 0;
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
    cursor: pointer;
  }
    
  .stepper {
    margin: 10px 0;
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
  .step.active {
    background-color: #535353 !important;
    color: white;
  }
  .step.left {
    transform: rotate(180deg);
  }
  .stepper, .step {
    user-select: none;
  }  
`;
