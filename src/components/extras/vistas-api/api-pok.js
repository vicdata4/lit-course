import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

class ApiPok extends LitElement {
  static get styles() {
    return css`
      .cardPok {
        border: 1px solid rgba(0, 0, 0, 0.155);
        border-radius: 0.55rem;
        background-color: #fff;
        box-shadow: 1 1.5rem 1rem rgba(0, 0, 0, 0.35);
        padding: 1rem;
        width: fit-content;
        margin: 20px;
        display: inline-block;
      }

      .card-container {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        overflow-x: auto;
        justify-content: center;
      }

      .card-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.125);
        padding: 0.5rem 1rem;
        background-color: rgba(0, 0, 0, 0.13);
        border-radius: 0.25rem 0.25rem 0 0;
        max-width: 100%;
        overflow-wrap: break-word;
      }

      .card-body {
        padding: 1rem;
      }

      .card-footer {
        border-top: 1px solid rgba(0, 0, 0, 0.125);
        padding: 0.5rem 1rem;
        background-color: rgba(0, 0, 0, 0.09);
        border-radius: 0 0 0.25rem 0.25rem;
      }

      .statBar {
        height: 10px;
        background-color: lightgray;
        width: 100%;
        // max-width: 200px;
      }
    `;
  }

  static get properties() {
    return {
      hits: { type: Array },
    };
  }

  constructor() {
    super();
    this.hits = [];
  }

  render() {
    return html`
      <div class="card-container">
        <div class="cardPok">
          <div class="card-header">
            <h2>${this.hits.name.charAt(0).toUpperCase() + this.hits.name.slice(1)}</h2>
          </div>
          <div class="card-body" style="display: flex; align-items: center;">
            <div>
              <img src="${this.hits.sprites.front_default}" />
            </div>
            <div>
              <h4>Stats</h4>
              <table>
                ${this.hits.stats.map(
                  (item) => html`
                    <tr>
                      <td>${item.stat.name}:</td>
                      <td>${item.base_stat}</td>
                      <td>
                        <stat-bar widthBar="255" filled="${item.base_stat}"></stat-bar>
                      </td>
                    </tr>
                  `,
                )}
              </table>
            </div>
          </div>
          <div class="card-footer">
            <div style="display: flex; justify-content: center;">
              <div>
                <img
                  style="display:block; margin: 0 auto;"
                  src="assets/images/Typespok/XYROZA/${this.hits.types[0].type.name}.png"
                />
              </div>
              ${this.hits.types[1]
                ? html`
                    <div style="margin-left: 10px;">
                      <img
                        style="display:block; margin: 0 auto;"
                        src="assets/images/Typespok/XYROZA/${this.hits.types[1].type.name}.png"
                      />
                    </div>
                  `
                : nothing}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('api-pok', ApiPok);
