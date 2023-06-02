import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

class ApiMtg extends LitElement {
  static get styles() {
    return css`
      .card {
        border: 1px solid rgba(0, 0, 0, 0.155);
        border-radius: 0.55rem;
        background-color: #fff;
        box-shadow: 1 1.5rem 1rem rgba(0, 0, 0, 0.35);
        padding: 1rem;
        width: 300px;
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

      .table-container {
        display: table;
        width: 100%;
        border-collapse: collapse;
      }

      .table-row {
        display: table-row;
      }

      .table-header {
        font-weight: bold;
        background-color: #ddd;
      }
    `;
  }

  static get properties() {
    return {
      hits: { type: Array },
      cardStyle: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.hits = [];
    this.cardStyle = false;
  }

  render() {
    return html`
      <div id="mainDiv" class="${this.cardStyle ? 'card-container' : 'table-container'}">
        ${this.hits.cards.map(
          (item) => html`
            <div class="${this.cardStyle ? 'card' : 'table'}">
              <div class="${this.cardStyle ? 'card-header' : 'table-header'}">
                <h2>${item.name}</h2>
                <h4>${item.setName}</h4>
              </div>
              <div class="${this.cardStyle ? 'card-body' : 'table-row'}">
                <!-- <img src="{item.imageUrl}"> -->
                <p>${item.type}</p>
                <p>Mana cost: (${item.manaCost}) - CMC:(${item.cmc})</p>
              </div>
              <div class="${this.cardStyle ? 'card-footer' : 'table-header'}">
                <div>
                  <p>${item.text}</p>
                  <p style="text-align: right">
                    <strong>${item.power ? item.power : nothing}/${item.toughness ? item.toughness : nothing}</strong>
                  </p>
                  <hr />
                  <p style="font-style: italic">${item.flavor}</p>
                </div>
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }
}

customElements.define('api-mtg', ApiMtg);
