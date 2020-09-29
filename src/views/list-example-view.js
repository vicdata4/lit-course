import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { dateFormatter } from '../utils/functions';
import '../components/common-header';

class ListExampleView extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      list: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  addItem() {
    const input = this.shadowRoot.querySelector('#message');
    const item = {
      message: input.value,
      date: new Date()
    };

    this.list = [...[item], ...this.list];
    input.value = '';
  }

  deleteItem(index) {
    const array = this.list;
    array.splice(index, 1);
    this.list = [...array];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <input id="message" type="text" placeholder="escribe aqui..">
        <button @click="${this.addItem}">Guardar</button>
        <ul>
          ${this.list.map((item, i) => {
            return html`
              <li>
                <button @click="${() => this.deleteItem(i)}">&times;</button>
                ${dateFormatter(item.date).hour}
                ${item.message}
              </li>`;
          })}
        </ul>
      </section>
    `;
  }
}

window.customElements.define('list-example-view', ListExampleView);
