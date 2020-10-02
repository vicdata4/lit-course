/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { getDate, formatDate, minMaxDate } from '../utils/functions';

class VacationForm extends LitElement {
  static get styles() {
    return [
      css`
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
        `
    ];
  }

  static get properties() {
    return {
      id: { type: Number },
      pointer: { type: Number },
      pagination: { type: Number },
      vacation: { type: Object },
      arrVacation: { type: Array },
      arrTableView: { type: Array },
      arrTr: { type: Array },
      viewIsFull: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.id = 0;
    this.pointer = 0;
    this.pagination = 10;
    this.vacation = {};
    this.arrVacation = [];
    this.arrTableView = [];
    this.arrTr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.viewIsFull = false;
    this.actualDate = new Date();
  }

  /**
  * @desc Añade un nuevo registro al array de fechas
  */
  add() {
    const start = getDate(this.shadowRoot.getElementById('start').value);
    const end = getDate(this.shadowRoot.getElementById('end').value);
    // Comprobamos que las fechas tengan valor
    const dateHasValue = start !== null && start !== '' && end !== null && end !== '';
    if (dateHasValue) {
      // Comprobamos que la fecha elegida sea mayor que la actual
      if ((start.getTime() > this.actualDate.getTime())) {
        // Comprobamos que la fecha de inicio sea menor que la de final
        if ((start.getTime() < end.getTime())) {
          this.vacation = {
            id: this.id,
            solicitud: formatDate(this.actualDate),
            inicio: formatDate(start),
            fin: formatDate(end),
            estado: 'Pendiente de aprobación',
            festado: formatDate(this.actualDate, true)
          };

          this.arrVacation.push(this.vacation);
          this.id++;

          // Visualizar los datos
          this.arrTableView = [];
          const page = Math.trunc((this.arrVacation.length - 1) / this.pagination);
          for (let i = 0; i < this.pagination; i++) {
            if ((this.arrVacation.length - 1) < this.pagination) {
              this.arrTableView[i] = this.arrVacation[i];
            } else {
              if (this.arrVacation.length % this.pagination === 0) {
                // Si la tabla esta llena volvemos true el flag
                this.viewIsFull = true;
                this.arrTableView[i] = this.arrVacation[(page * this.pagination) + i];
              } else {
                this.arrTableView[i] = this.arrVacation[(page * this.pagination) + i];
                this.viewIsFull = false;
              }
            }
          }
        }
      }
      // Colocamos el puntero en la pagina adecuada
      this.pointer = Math.trunc(this.arrVacation.length / this.pagination);
    }
  }

  /**
  * @desc Elimina un registro del array y de la view
  * @param String id del registro a eliminar
  */
  removeRow(e) {
    // Buscamos la posicion de la id proprocionada por parametro
    let index = 0;
    for (let i = 0; i < this.arrVacation.length; i++) {
      if (this.arrVacation[i].id === e) {
        index = i;
        break;
      }
    }

    // Sacamos del array
    this.arrVacation.splice(index, 1);

    // Comprobamos si la pagina a cambiado
    const pageHasChanged = this.pointer === Math.trunc((this.arrVacation.length - 1) / this.pagination);

    if (pageHasChanged) {
      this.pointer = Math.trunc((this.arrVacation.length - 1) / this.pagination);
    }

    // Reiniciamos el array de visualizacion y rellenamos de nuevo
    this.arrTableView = [];
    for (let i = 0; i < this.pagination; i++) {
      this.arrTableView[i] = this.arrVacation[(this.pointer * this.pagination) + i];
    }
  }

  /**
  * @desc Mueve a izquierda y a derecha la view
  * @param event
  */
  move(e) {
    // Rectificamos el pointer si la triad esta llena
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

  /**
  * @desc Organiza el array segun fechas
  * @param event
  */
  dateOrg(col, order) {
    this.arrVacation.sort((o1, o2) => {
      if (
        getDate(o1[col], true).getTime() >
        getDate(o2[col], true).getTime()
      ) {
        return 1;
      } else if (
        getDate(o1.col, true).getTime() <
        getDate(o2.col, true).getTime()) {
        return -1;
      }
      return 0;
    });

    this.pointer = 0;
    this.arrTableView = [];
    for (let i = 0; i < 3; i++) {
      this.arrTableView[i] = this.arrVacation[(this.pointer * 3) + i];
    }
    /*
    switch (type) {
      case 1:
        console.log('case ' + type);
        this.arrVacation.sort(function(o1, o2) {
          if (ths.getDate(o1.solicitud, true).getTime() > ths.getDate(o2.solicitud, true).getTime()) {
            return 1;
          } else if (ths.getDate(o1.solicitud, true).getTime() < ths.getDate(o2.solicitud, true).getTime()) {
            return -1;
          }
          return 0;
        });
        break;
      case 2:
        console.log('case ' + type);
        this.arrVacation.sort(function(o1, o2) {
          if (ths.getDate(o1.solicitud, true).getTime() < ths.getDate(o2.solicitud, true).getTime()) {
            return 1;
          } else if (ths.getDate(o1.solicitud, true).getTime() > ths.getDate(o2.solicitud, true).getTime()) {
            return -1;
          }
          return 0;
        });
        break;
      case 3:
        console.log('case ' + type);
        this.arrVacation.sort(function(o1, o2) {
          if (ths.getDate(o1.inicio, true).getTime() > ths.getDate(o2.inicio, true).getTime()) {
            return 1;
          } else if (ths.getDate(o1.inicio, true).getTime() < ths.getDate(o2.inicio, true).getTime()) {
            return -1;
          }
          return 0;
        });
        break;
      case 4:
        console.log('case ' + type);
        this.arrVacation.sort(function(o1, o2) {
          if (ths.getDate(o1.inicio, true).getTime() < ths.getDate(o2.inicio, true).getTime()) {
            return 1;
          } else if (ths.getDate(o1.inicio, true).getTime() > ths.getDate(o2.inicio, true).getTime()) {
            return -1;
          }
          return 0;
        });
        break;
      case 5:
        console.log('case ' + type);
        this.arrVacation.sort(function(o1, o2) {
          if (ths.getDate(o1.fin, true).getTime() > ths.getDate(o2.fin, true).getTime()) {
            return 1;
          } else if (ths.getDate(o1.fin, true).getTime() < ths.getDate(o2.fin, true).getTime()) {
            return -1;
          }
          return 0;
        });
        break;
      case 6:
        console.log('case ' + type);
        this.arrVacation.sort(function(o1, o2) {
          if (ths.getDate(o1.fin, true).getTime() < ths.getDate(o2.fin, true).getTime()) {
            return 1;
          } else if (ths.getDate(o1.fin, true).getTime() > ths.getDate(o2.fin, true).getTime()) {
            return -1;
          }
          return 0;
        });
        break;
    } */
  }

  render() {
    return html`
        <div class="component-box">
          <div class="inp-box">
            <p>Solicitud de vacaciones:</p>
            <div class="inp-controls">
              <p>Fecha de inicio</p>
              <input id="start" type="date" min="${minMaxDate(this.actualDate)}">
              <p>Fecha de final</p>
              <input id="end" type="date" max="${minMaxDate(this.actualDate, true)}">
              <button @click="${this.add}">Agregar</button>
            </div>
          </div>
        
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
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
              ${this.arrTr.map(i => html`
                <tr>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].solicitud : nothing}</td>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].inicio : nothing}</td>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].fin : nothing}</td>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].estado : nothing}</td>
                  <td>${this.arrTableView[i] ? this.arrTableView[i].festado : nothing}</td>
                  <td>${this.arrTableView[i] ? html`<button
                      @click="${() => this.removeRow(this.arrTableView[i].id)}">Eliminar</button>` : nothing}</td>
                </tr>             
              `)}
              </tbody>
            </table>
          </div>
        </div>
      `;
  }
}

window.customElements.define('vacation-form', VacationForm);
