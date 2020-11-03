import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/input-component';
import '../components/list-component';

class DataBinding extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      messageList: { type: Array },
    };
  }

  constructor() {
    super();
    this.messageList = [];
  }

  addMessage(e) {
    this.messageList = [...[e.detail.message], ...this.messageList];
  }

  deleteMessage(e) {
    const array = this.messageList;
    array.splice(e.detail.index, 1);
    this.messageList = [...array];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h1>Data binding</h1>
        <input-component @my-event="${this.addMessage}">Guardar</input-component>
        <list-component .list="${this.messageList}" @delete-event="${this.deleteMessage}"></list-component>
      </section>
    `;
  }
}

window.customElements.define('data-binding', DataBinding);
