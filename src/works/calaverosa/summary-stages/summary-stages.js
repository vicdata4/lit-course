import { LitElement, html, css } from 'lit-element';
import { sumStagesStyles } from '../utils/styles.js';
import { datos } from '../utils/datos.js';

class SummaryStages extends LitElement {
  static get properties() {
    return {
      total: { type: Number },
      staticData: { type: Array },
    };
  }

  constructor() {
    super();
    this.total = 0;
    this.staticData = datos;
  }

  static get styles() {
    return [
      sumStagesStyles,
      css`
        /***** Agregar etapa ******/
        input {
          border: 1px solid #cccccc;
          margin-right: 10px;
          line-height: 2;
        }
        button {
          background-color: black;
          width: 180px;
          color: white;
          font-size: 13px;
          font-weight: bold;
          border: solid black;
          letter-spacing: 1px;
          padding: 9px 10px;
          cursor: pointer;
          box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
          text-shadow: 0 -1px 1px #000, 1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000 !important;
          text-transform: uppercase;
          border-radious: 2px;
        }
        button:hover {
          box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
        }
        .add-fn {
          margin-top: 10px;
        }
      `,
    ];
  }

  /** Agrega nueva etapa */
  agrega() {
    const input = this.shadowRoot.querySelector('#add');
    const newData = {
      id: input.value,
      data: 1,
    };

    this.staticData = [...this.staticData, ...[newData]];
  }

  /** Suma total */
  getTotal() {
    const arrayOfNumbers = this.staticData.map((obj) => {
      return obj.data || 0;
    });

    return arrayOfNumbers.reduce((a, b) => {
      return a + b;
    }, 0);
  }

  render() {
    return html`
      <div class="container">
        <table>
          <caption>
            Candidatos por etapa
          </caption>
          <tbody>
            <tr>
              <td>Total</td>
              <td id="total">${this.getTotal()}</td>
            </tr>

            ${this.staticData.map(
              (datos) => html`
                <tr>
                  <td>${datos.id}</td>
                  <td class="suma">${datos.data || 0}</td>
                </tr>
              `,
            )}
          </tbody>
        </table>

        <!-- Agregar nueva etapa -->
        <div class="add-fn"><input id="add" /><button @click="${this.agrega}">Añadir etapa</button></div>
      </div>
    `;
  }
}
customElements.define('summary-stages', SummaryStages);
