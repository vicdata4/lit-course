import { LitElement, html } from 'lit-element';

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
          (item, i) => html` <li>${item} <button @click="${() => this.deleteItem(i)}">&times;</button></li> `,
        )}
      </ul>
    `;
  }
}

window.customElements.define('list-component', ListComponent);
