import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { dateFormatter } from '../utils/functions';
import '../components/common-header';

class ListExampleView extends LitElement {
  static get styles() {
    return [
      commonStyles,
      css`
        .form-field {
          padding: 10px;
          border-radius: 0;
          border: 1px solid grey;
          margin: 3px;
        }

        .form-submit {
          background-color: #10acda;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px;
          cursor: pointer;
        }
      `
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
        <input id="message" class="form-field" type="text" placeholder="escribe aqui..">
        <button @click="${this.addItem}" class="form-submit">Guardar</button>
        <ul>
          ${this.list.map((item, i) => html`
            <li>
              <button @click="${() => this.deleteItem(i)}">&times;</button>
              ${dateFormatter(item.date).hour}
              Mensaje: ${item.message}
            </li>
          `)}
        </ul>
      </section>
    `;
  }
}

window.customElements.define('list-example-view', ListExampleView);
