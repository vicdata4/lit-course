import { LitElement, html, css } from 'lit-element';

export class adminVacationDetail extends LitElement {
  static get styles() {
    return css`
      .table-box{
        border-top: solid 2px black;
        border-bottom: solid 2px black;
        margin-top: 1.5rem;
      }
      .history-box{
          display: flex
      }
      .history-table{
          border: 1px solid black;
          margin-top: 10px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
      }
      .data-table {
        border-collapse: collapse;
        font-size: 0.8rem;
        empty-cells: hide;
        width: 100%;
      }
      .data-table tr:nth-child(even) {
        background-color: #EEEEEE;
      }
      .data-table th{
        border-left: solid 2px black;
        border-right: solid 2px black;
        background-color: #CCCCCC;
        font-size: 0.7rem;
        text-align: left;
      }
      .data-table td{
        border-right: solid 2px black;
        border-left: solid 2px black;
      }
      td{
        height: 2rem;
      }
      @media (max-width: 768px) {
        .history-box{
          display: block;
          overflow-x: auto;
      }
      }
    `;
  }

  static get properties() {
    return {
      list: { type: Array },
      history: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = [];
    this.history = [];
  }

  render() {
    return html`
        <div class="container">
            <div class="history-box">
                <p>Historial de vacaciones:</p>
                <table class="history-table">
                    <tr>
                        <th>Año</th>
                        <th>Asignadas</th>
                        <th>Generadas</th>
                        <th>Disfrutadas</th>
                        <th>Acumuladas</th>
                    </tr>
                    ${this.history.map(item => html`
                    <tr>
                        <td>${item.year}</td>
                        <td>${item.total}</td>
                        <td>${item.generated}</td>                    
                        <td>${item.used}</td>
                        <td>${item.reserved}</td>
                    </tr>
                    `)}
                </table>
            </div>
            <p>Detalle de vacaciones: </p>
            <div class="table-box">
                <table class="data-table"> 
                    <tr>
                        <th>Día de inicio de vacaciones</th>
                        <th>Día de fin de vacaciones</th>
                        <th>Días tomados</th>
                    </tr>
                    ${this.list.map(item => html`
                    <tr>
                        <td>${item.startDate}</td>
                        <td>${item.endDate}</td>
                        <td>${item.range}</td>
                    </tr>
                    `)}
                </table>
            </div>
        
        </div>
    `;
  }
}
customElements.define('admin-vacation-detail', adminVacationDetail);
