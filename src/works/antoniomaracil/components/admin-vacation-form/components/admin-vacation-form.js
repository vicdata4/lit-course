/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { formatDate } from '../../../utils/functions';

export class AdminVacationForm extends LitElement {
  static get styles() {
    return [css`
    .component-box{
        margin: 1rem;
        font-family: "Comic Sans MS", cursive, sans-serif;
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
      arrVacation: { type: Array },
      arrTableView: { type: Array },
      arrOptions: { type: Array },
      actualDate: { type: Object },
      arrTr: { type: Array },
      viewIsFull: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.arrTr = new Array(10).fill({});
    this.arrVacation = [];
    this.arrTableView = [];
    this.pagination = 10;
    this.arrOptions = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
    this.actualDate = new Date();
  }

  /**
  * @desc Actualiza el array de visualizacion
  */
  updateView() {
    this.arrTableView = [];
    const page = Math.trunc((this.arrVacation.length - 1) / this.pagination);
    for (let i = 0; i < this.pagination; i++) {
      if ((this.arrVacation.length - 1) < this.pagination) {
        // La primera hoja se llena sin calcular la posicion del elemento
        this.arrTableView[i] = this.arrVacation[i];
      } else {
        if (this.arrVacation.length % this.pagination === 0) {
          // Si la tabla esta llena volvemos true el flag
          this.viewIsFull = true;
          // Calculo de la posicion del elemento
          this.arrTableView[i] = this.arrVacation[(page * this.pagination) + i];
        } else {
          this.arrTableView[i] = this.arrVacation[(page * this.pagination) + i];
          this.viewIsFull = false;
        }
      }
    }
    this.pointer = Math.trunc(this.arrVacation.length / this.pagination);
  }

  /**
  * @desc Mueve a izquierda y a derecha la view
  * @param event
  */
  movePage(e) {
  // Rectificamos el pointer si la pagina esta llena
    if (this.viewIsFull) {
      this.pointer--;
      this.viewIsFull = false;
    }

    // Caso hacia la izquierda
    if (e.target.id === 'left') {
      this.pointer--;

      // Comprobamos el pointer
      if (this.pointer < 0) {
        this.pointer = 0;
      };

      // Mostramos el array
      this.arrTableView = [];
      for (let i = 0; i < this.pagination; i++) {
        this.arrTableView[i] = this.arrVacation[(this.pointer * this.pagination) + i];
      }

    // Caso hacia la derecha
    } else if (e.target.id === 'right') {
      this.pointer++;
      // Comprobamos el pointer
      if (this.pointer > Math.trunc((this.arrVacation.length - 1) / this.pagination)) {
        this.pointer = Math.trunc((this.arrVacation.length - 1) / this.pagination);
      }

      // Mostramos el array
      this.arrTableView = [];
      for (let i = 0; i < this.pagination; i++) {
        this.arrTableView[i] = this.arrVacation[(this.pointer * this.pagination) + i];
      }
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'arrVacation') {
        this.updateView();
      }
    });
  }

  sendData() {
    const event = new CustomEvent('update-array', {
      detail: {
        applications: this.arrVacation
      }
    });
    this.dispatchEvent(event);
  }

  changeStatus(id) {
    const select = this.shadowRoot.getElementById('sel-' + id).value;
    for (let i = 0; i < this.arrVacation.length; i++) {
      if (this.arrVacation[i].id === id) {
        if (select === '0') { this.arrVacation[i].estado = 'Pendiente de aprobación'; };
        if (select === '1') { this.arrVacation[i].estado = 'Aprobado'; };
        if (select === '2') { this.arrVacation[i].estado = 'No aprobado'; };
        this.arrVacation[i].festado = formatDate(new Date(), true);
      }
    }
    this.sendData();
  }

  render() {
    return html`
    <div class="component-box">
        
          <div class="table-cntr">
            <button id="left" @click=${this.movePage}><</button> 
            <button id="right" @click=${this.movePage}>></button>
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
              ${this.arrTr.map((value, i) => html`
                <tr>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].solicitud : nothing}</td>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].inicio : nothing}</td>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].fin : nothing}</td>
                  <td>
                    <select id="sel-${i}"class="selectOptions" @change="${() => this.changeStatus(this.arrVacation[i].id)}">
                      <option value="0">Pendiente de aprobación</option>
                      <option value="1">Aprobado</option>
                      <option value="2">No aprobado</option>
                    </select>
                  </td>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].festado : nothing}</td>
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
