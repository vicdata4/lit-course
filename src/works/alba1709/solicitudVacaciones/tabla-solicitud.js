import { LitElement, html, css } from 'lit-element';

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
              overflow-y: auto;
              empty-cells: hide;
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
            }
            th {
              background-color: #cccccc;
            }
            @media (min-width: 768px) {
              #tablaSoli {
                width: 70%;
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

  /*ordenar() {
    let orderedDates = this.miTabla.sort(function(a, b) {
    }) 
  }*/

  /*orderDate(col, order) {
    const ths = this;
    debugger;
    this.miTabla.sort(function(o1, o2) {
      debugger;
    this.miTabla.sort((o1, o2) => {
      if (
        ths.getDate(o1[col], true).getTime() >
        ths.getDate(o2[col], true).getTime()
      ) {
        debugger;
        return 1;
      } else if (
        ths.getDate(o1[col], true).getTime() <
        ths.getDate(o2[col], true).getTime()) {
        return -1;
      }
      return 0;
    })
  }
  }*/

  render() {
    return html`
          <table id="tablaSoli">
              <tr>
                <th>Fecha de solicitud
                  <span>
                    <span @click="${() => this.orderDate('solicitud', 'asc')}">&#9652;</span>
                    <span @click="${() => this.orderDate('solicitud', 'desc')}">&#9662;</span>
                  </span>
                </th>
                <th>Fecha Inicio
                  <span>
                    <span @click="${() => this.orderDate('solicitud', 'asc')}">&#9652;</span>
                    <span @click="${() => this.orderDate('solicitud', 'desc')}">&#9662;</span>
                  </span>
                </th>
                <th>Fecha Fin
                  <span>
                    <span @click="${() => this.orderDate('solicitud', 'asc')}">&#9652;</span>
                    <span @click="${() => this.orderDate('solicitud', 'desc')}">&#9662;</span>
                  </span>
                </th>
                <th>Estado de la solicitud</th>
                <th>Fecha de estado</th>
                <th>Eliminar</th>
              </tr>
            ${this.miTabla.map((item, i) => {
    return html`
              <tr>
                <td>${item.fHoy.split('-').reverse().join('-')} ${item.hActual}</td>
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