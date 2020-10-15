import { LitElement, html, css } from 'lit-element';

export class VacationDetail extends LitElement {
  static get styles() {
    return css`
      .table-box{
        border-top: solid 2px black;
        border-bottom: solid 2px black;
        margin-top: 1.5rem;
      }
      table {
        border-collapse: collapse;
        font-size: 0.8rem;
        empty-cells: hide;
        width: 100%;
      }
      tr:nth-child(even) {
        background-color: #EEEEEE;
      }
      table th{
        border-left: solid 2px black;
        border-right: solid 2px black;
        background-color: #CCCCCC;
        font-size: 0.7rem;
        text-align: left;
      }
      table td{
        border-right: solid 2px black;
        border-left: solid 2px black;
      }
      td{
        height: 2rem;
      }
    `;
  }

  static get properties() {
    return {
      list: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  render() {
    return html`
        <div class="container">
            <div class="table-box">
                <table>
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
customElements.define('vacation-detail', VacationDetail);
