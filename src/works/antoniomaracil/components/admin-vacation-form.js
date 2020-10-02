import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

export class AdminVacationForm extends LitElement {
  static get styles() {
    return [css`
    .component-box{
        margin: 1rem;
        font-family: "Comic Sans MS", cursive, sans-serif;
    }
    .inp-controls{
        display:flex;
        align-items: center;
    }
    .inp-controls p{
        margin-right: 1rem;
    }
    .inp-controls input+p{
        margin-left: 1rem;
    }
    .inp-controls button{
        margin-right: 1.5rem;
        margin-left: 1.5rem;
    }
    .table-box{
        border: solid 2px black;
        margin-top: 1.5rem;
    }
    table {
        border-collapse: collapse;
        width: 100%;
        height: 100%;
        font-size: 0.8rem;
        overflow: scroll;
        overflow-y: auto;
        empty-cells: hide;
    }
    tr:nth-child(even) {
        background-color: #EEEEEE;
    }
    .inp-table th{
        border-left: solid 2px black;
        border-right: solid 2px black;
        background-color: #CCCCCC;
        font-size: 0.7rem;
        text-align: left;
    }
    .inp-table td{
        border-right: solid 2px black;
        border-left: solid 2px black;
    }
    td{
        height: 2rem;
    }
    span span{
      cursor: pointer;
    }

    .table-cntr{
      display: flex;
      justify-content: space-between;
    }
    @media (min-width: 768px) {

    }
    `];
  }

  static get properties() {
    return {
      id: { type: Number },
      pointer: { type: Number },
      pagination: { type: Number },
      vacation: { type: Object },
      arrVacation: { type: Array },
      list: { type: Array },
      arrTr: { type: Array },
      viewIsFull: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.arrTr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.list = [];
  }

  render() {
    return html`
    <div class="component-box">
        
          <div class="table-cntr">
            <button id="left" @click=${this.move}><</button> 
            <button id="right" @click=${this.move}>></button>
          </div>
        
          <div class="table-box">
            <table class="inp-table">
              <thead>
                <tr id="head">
                  <th>Fecha solicitud 
                    <span>
                      <span @click="${() => this.dateOrg('solicitud', 'asc')}">&#9652;</span>
                      <span @click="${() => this.dateOrg('solicitud', 'desc')}">&#9662;</span>
                    </span>
                  </th>
                  <th>Fecha inicio
                  <span>
                      <span @click="${() => this.dateOrg('inicio', 'asc')}">&#9652;</span>
                      <span @click="${() => this.dateOrg('inicio', 'desc')}">&#9662;</span>
                    </span>
                  </th>
                  <th>Fecha fin
                  <span>
                      <span @click="${() => this.dateOrg('fin', 'asc')}">&#9652;</span>
                      <span @click="${() => this.dateOrg('fin', 'desc')}">&#9662;</span>
                    </span>
                  </th>
                  <th>Estado solicitud</th>
                  <th>Fecha estado</th>
                </tr>
              </thead>
              <tbody>
              ${this.arrTr.map(i => html`
                <tr>
                  <td>${this.list[i] ? this.list[i].solicitud : nothing}</td>
                  <td>${this.list[i] ? this.list[i].inicio : nothing}</td>
                  <td>${this.list[i] ? this.list[i].fin : nothing}</td>
                  <td>${this.list[i] ? this.list[i].estado : nothing}</td>
                  <td>${this.list[i] ? this.list[i].festado : nothing}</td>
                </tr>             
              `)}
              </tbody>
            </table>
          </div>
        </div>
    `;
  }
}
customElements.define('admin-vacation-form', AdminVacationForm);
