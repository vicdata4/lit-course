import { LitElement, html, css } from 'lit-element';
import { getDate } from './utils/functions';

export class TablaSolicitud extends LitElement {
  static get styles() {
    return [
      css`
            #tablaSoli {
              border: 3px solid black;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
            }
            td, th {
              border-right: solid 3px black;
              border-left: solid 3px black;
            }
            #tablaSoli {
              border-collapse: collapse;
              width: 100%;
              height: 100%;
              font-size: 0.8rem;
              overflow: scroll;
              overflow-x: auto;
            }
            #tablaSoli tr:nth-child(odd) {
              background-color: #eeeeee;
            }
            #papelera {
                width: 30px;
                height:30px;
            }
            #papelera:hover {
                cursor: pointer;
            }
            #btnPapelera {
              background-color: #ffffff00;
              border: 0px;
              margin-left: 7px;
            }
            td, th {
              font-family: "Comic Sans MS", cursive, sans-serif;
              white-space: nowrap;
            }
            .btnOrder {
              cursor: pointer;
              background-color: #cccccc;
              border: #cccccc;
            }
            .btnOrder:hover {
              background-color: #eeeeee;
            }
            th {
              background-color: #cccccc;
            }
            @media (min-width: 768px) {
              #tablaSoli {
                width: 52%;
            }
            }
            @media screen and (max-width: 768px) {
              #tablaSoli {
                display: block;
                overflow-x: auto;
              }
            }
          `
    ];
  }

  static get properties() {
    return {
      miTabla: { type: Array }
    };
  }

  constructor() {
    super();
    this.miTabla = [];
  }

  deleteItem(i) {
    const event = new CustomEvent('delete-event', {
      detail: {
        index: i
      }
    });
    this.dispatchEvent(event);
  }

  orderDate(col, order) {
    const orderedList = this.miTabla.sort((a, b) => {
      if (
        getDate(a[col], true).getTime() >
        getDate(b[col], true).getTime()
      ) {
        return 1;
      } else if (
        getDate(a[col], true).getTime() <
        getDate(b[col], true).getTime()) {
        return -1;
      }
      return 0;
    });
    this.miTabla = order === 'asc' ? [...orderedList] : [...orderedList.reverse()];
  }

  render() {
    return html`
          <table id="tablaSoli">
              <tr>
                <th>Fecha de solicitud
                  <span>
                    <button class = "btnOrder" @click="${() => this.orderDate('fHoy', 'asc')}">&#9652;</button>
                    <button class = "btnOrder" @click="${() => this.orderDate('fHoy', 'desc')}">&#9662;</button>
                  </span>
                </th>
                <th>Fecha Inicio
                  <span>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFI', 'asc')}">&#9652;</button>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFI', 'desc')}">&#9662;</button>
                  </span>
                </th>
                <th>Fecha Fin
                  <span>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFF', 'asc')}">&#9652;</button>
                    <button class = "btnOrder" @click="${() => this.orderDate('infoFF', 'desc')}">&#9662;</button>
                  </span>
                </th>
                <th>Estado de la solicitud</th>
                <th>Fecha de estado</th>
                <th>Eliminar</th>
              </tr>
            ${this.miTabla.map((item, i) => {
    return html`
              <tr>
                <td class="first">${item.fHoy.split('-').reverse().join('-')} ${item.hActual}</td>
                <td>${item.infoFI.split('-').reverse().join('-')}</td>
                <td>${item.infoFF.split('-').reverse().join('-')}</td>
                <td>Pendiente de aprobación</td>
                <td>${item.fHoy.split('-').reverse().join('-')}</td>
                <td> <button id="btnPapelera" @click="${() => this.deleteItem(i)}"><img id = "papelera" src="/assets/alba1709/papelera.png"></img></button></td>
              </tr>`;
  })}
          </table>
        `;
  }
}
customElements.define('tabla-solicitud', TablaSolicitud);