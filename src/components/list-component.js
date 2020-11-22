import { LitElement, html } from 'lit-element';
import { dateFormatter } from '../utils/functions';

class ListComponent extends LitElement {
  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  deleteItem(i) {
    const event = new CustomEvent('delete-event', {
      detail: {
        index: i,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <ul>
        ${this.list.map(
          (item, i) =>
            html`
              <li>
                ${dateFormatter(item.date).hour} ${item.message}
                <button @click="${() => this.deleteItem(i)}">&times;</button>
              </li>
            `,
        )}
      </ul>
    `;
  }
}

window.customElements.define('list-component', ListComponent);
