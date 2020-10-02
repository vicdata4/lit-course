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
            td {
              border: 1px solid black;
            }
            #tablaSoli {
              border-collapse: collapse;
            }
            #tablaSoli tr:nth-child(odd) {
              background-color: #ebebeb;
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
              font-family: cursive;
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

  render() {
    return html`
          <table id="tablaSoli">
              <tr>
                <th>Fecha de solicitud</th>
                <th>Fecha inicio</th>
                <th>Fecha Fin</th>
                <th>Estado de la solicitud</th>
                <th>Fecha de estado</th>
                <th>Eliminar</th>
              </tr>
            ${this.miTabla.map((item, i) => {
    return html`
              <tr>
                <td>${item.fHoy.split('-').reverse().join('-')}</td>
                <td>${item.infoFI.split('-').reverse().join('-')}</td>
                <td>${item.infoFF.split('-').reverse().join('-')}</td>
                <td></td>
                <td></td>
                <td> <button id="btnPapelera" @click="${() => this.deleteItem(i)}"><img id = "papelera" src="/assets/images/papelera.png"></img></button></td>
              </tr>`;
  })}
          </table>
        `;
  }
}
customElements.define('tabla-solicitud', TablaSolicitud);