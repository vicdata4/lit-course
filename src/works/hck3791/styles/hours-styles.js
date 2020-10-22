import { css } from 'lit-element';

export const hours_styles = css`
  
  * { box-sizing: border-box }

  #container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
  }

  #container section { width: 100% }

  #container section h3 { font-size: 0.9rem }

  #container .filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  #container .filters label { width: 40% }

  #container .filters select { width: 60% }

  #container #generateReport { margin-bottom: 5px }

  #container #generateReport button {
    padding: 5px 10px 5px 10px;
  }

  #container section table {
      width: 100%;
      border-collapse: collapse;
  }

  table thead tr { background: #ccc }

  table tbody tr:nth-child(odd) { background: #eee }

  table tbody tr:nth-child(odd) td { border-bottom: 1px solid #ccc }
  table tbody tr:nth-child(even) td { border-bottom: 1px solid #ccc }
  
  table tbody tr td:last-child { border: none }

  table, thead, tbody, th, td, tr { display: block }

  thead tr { 
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr { 
    border: 1px solid #ccc;
    margin-bottom: 10px;
    padding: 5px;
  }

  td { 
    position: relative;
    padding-left: 70%;
    height: 30px;
  }

  

  td:before { 
    position: absolute;
    top: 5px;
    left: 0;
    white-space: nowrap;
  }

  td:nth-of-type(1):before { content: "" }
  td:nth-of-type(2):before { content: "Horas trabajadas" }
  td:nth-of-type(3):before { content: "Horas de permisos" }
  td:nth-of-type(4):before { content: "Horas de intervenciones" }
  td:nth-of-type(5):before { content: "Jornadas trabajadas" }
  td:nth-of-type(6):before { content: "Jornadas de guardia" }
  td:nth-of-type(7):before { content: "Jornadas de vacaciones" }

  @media all and (min-width: 670px) {

    #container .filters {
      justify-content: flex-start;
    }

    #container .filters label { width: 200px }

    #container .filters select { width: 300px }

    thead, tbody {
      display: table-row-group;
    }

    thead tr {
      position: relative;
      display: table-row;
    }

    tbody tr {
      display: table-row;
    }

    thead tr th { 
        display: table-cell;
        text-align: left;
        padding: 5px 15px 5px 5px;
        font-size: .7em;
    }

    tbody tr td {
        display: table-cell;
        text-align: left;
        padding: 10px 15px 10px 5px;
    }

    tr { 
      margin-bottom: 0;
      padding: 5px;
    }

    td { 
      padding-left: 0;
      height: 30px;
    }

    td:before { 
      text-overflow: ellipsis;
    }

    td:nth-of-type(1):before { content: "" }
    td:nth-of-type(2):before { content: "" }
    td:nth-of-type(3):before { content: "" }
    td:nth-of-type(4):before { content: "" }
    td:nth-of-type(5):before { content: "" }
    td:nth-of-type(6):before { content: "" }
    td:nth-of-type(7):before { content: "" }

  }
  
`;
