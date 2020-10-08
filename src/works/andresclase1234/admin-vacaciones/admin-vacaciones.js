/* eslint-disable eqeqeq */
import { LitElement, css, html } from 'lit-element';

export class AdminVacaciones extends LitElement {
  static get styles() {
    return css`
            table {
                border-collapse: collapse;
                border-spacing: 0;
                width: 90%;
                border: 1px solid #ddd;
                margin-left: 5%;
                margin-right: 5%;
            }
            td {
                text-align: left;
                padding: 8px;
                border: 1px solid black;
            }
            tr:nth-child(even){background-color: #f2f2f2}
            .menu-list {
                width:90%;
                margin:auto
            }
            `;
  }

  static get properties() {
    return {
      table: { type: Array },
      aproved: { type: String },
      asc: { type: Boolean },
      pendiente: { type: String },
      aprobado: { type: String },
      nAprobado: { type: String }
    };
  }

  constructor() {
    super();
    this.table = [];
    this.aproved = 'Pendiente  de aprobación';
    this.pendiente = ' Pendiente de aprobación';
    this.asc = true;
  };

  /**
         * Añade un nuevo elemento al array.
         */
  add() {
    const input1 = new Date();
    const input2 = this.shadowRoot.querySelector('#start');
    const input3 = this.shadowRoot.querySelector('#end');
    const input4 = this.shadowRoot.querySelector('#nombre');
    const item = {
      request: input1.getDate() + '/' + (input1.getMonth() + 1) + '/' + input1.getFullYear(),
      start: input2.value,
      finish: input3.value,
      nombre: input4.value,
      estado: this.pendiente,
      aproved: this.aproved
    };
    this.table = [...[item], ...this.table];
  }

  /**
         * Ordena por fecha de inicio
         */
  sortStart() {
    if (this.asc == true) {
      const fechas = this.table;
      fechas.sort(function(a, b) {
        if (a.start > b.start) {
          return 1;
        }
        if (a.start < b.start) {
          return -1;
        }
        return 0;
      });
      this.table = [...fechas];
      this.asc = !this.asc;
    } else {
      const fechas = this.table;
      fechas.sort(function(a, b) {
        if (a.start < b.start) {
          return 1;
        }
        if (a.start > b.start) {
          return -1;
        }
        return 0;
      });
      this.table = [...fechas];
      this.asc = !this.asc;
    }
  }

  /**
         * Ordena por fecha de fin
         */
  sortEnd() {
    if (this.asc == true) {
      const fechas = this.table;
      fechas.sort(function(a, b) {
        if (a.finish > b.finish) {
          return 1;
        }
        if (a.finish < b.finish) {
          return -1;
        }
        return 0;
      });
      this.table = [...fechas];
      this.asc = !this.asc;
    } else {
      const fechas = this.table;
      fechas.sort(function(a, b) {
        if (a.finish < b.finish) {
          return 1;
        }
        if (a.finish > b.finish) {
          return -1;
        }
        return 0;
      });
      this.table = [...fechas];
      this.asc = !this.asc;
    }
  }

  /**
         * Ordena por nombre
         */
  nameRequest() {
    if (this.asc == true) {
      const name = this.table;
      name.sort(function(a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
      this.table = [...name];
      this.asc = !this.asc;
    } else {
      const name = this.table;
      name.sort(function(a, b) {
        if (a.nombre < b.nombre) {
          return 1;
        }
        if (a.nombre > b.nombre) {
          return -1;
        }
        return 0;
      });
      this.table = [...name];
      this.asc = !this.asc;
    }
  }

  /**
         * Ordena por fecha de solicitud
         */
  sortRequest() {
    if (this.asc == true) {
      const fechas = this.table;
      fechas.sort(function(a, b) {
        if (a.request > b.request) {
          return 1;
        }
        if (a.request < b.request) {
          return -1;
        }
        return 0;
      });
      this.table = [...fechas];
      this.asc = !this.asc;
    } else {
      const fechas = this.table;
      fechas.sort(function(a, b) {
        if (a.request < b.request) {
          return 1;
        }
        if (a.request > b.request) {
          return -1;
        }
        return 0;
      });
      this.table = [...fechas];
      this.asc = !this.asc;
    }
  }

  render() {
    return html`
            <div class="menu-list">
                <h2 title="Solicitud de vacaciones">Solicitud de vacaciones admin</h2>
                <p> 
                    Nombre del empleado <input type="text" id="nombre">
                    Fecha Inicio <input type="date" id="start" min="2020-01-01" max="2021-12-31">
                    Fecha Fin <input type="date" id="end" min="2020-01-01" max="2021-12-31">
                    <button @click="${this.add}">Agregar</button>
                </p>
            </div>
            <table>
                <tr>
                    <td>Nombre del empleado <button @click="${() => this.nameRequest()}">Ordenar</button></td>
                    <td> Fecha de Solicitud <button @click="${() => this.sortRequest()}">Ordenar</button></td>
                    <td> Fecha de Inicio  <button @click="${() => this.sortStart()}">Ordenar</button></td>
                    <td> Fecha de Fin  <button @click="${() => this.sortEnd()}">Ordenar</button></td>
                    <td> Estado de la solicitud </td>
                    <td> Fecha de estado  </td>
                </tr>
                ${this.table.map((item, i) => html`
                <tr>
                    <td>${item.nombre}</td>
                    <td>${item.request}</td>
                    <td>${item.start}</td>
                    <td>${item.finish}</td>
                    <td>
                        <select id="estado">
                            <option selected>Pendiente de aprobación</option>
                            <option> Aprobado </option>
                            <option> No aprobado</option>
                        </select>
                    </td>
                    <td>${item.request}</td>
                </tr>
                    `)}
            </table>
            `;
  }
}
customElements.define('admin-vacaciones', AdminVacaciones);
