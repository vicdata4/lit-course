import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { store } from '../store/store';
import { connect } from 'pwa-helpers';
import { addNote, deleteNote } from '../store/actions/notes.actions.js';
import '../components/input-component';
import '../components/list-component';

class DataBinding extends connect(store)(LitElement) {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      messageList: { type: Array },
    };
  }

  addMessage(e) {
    store.dispatch(addNote(e.detail.message));
  }

  deleteMessage(e) {
    store.dispatch(deleteNote(e.detail.index));
  }

  stateChanged(state) {
    this.messageList = state.notes.list;
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
