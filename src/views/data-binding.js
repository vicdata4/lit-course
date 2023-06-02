import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { store } from '../store/store';
import { styles } from '../utils/home-styles';
import { connect } from 'pwa-helpers';
import '../components/input-form';
import '../components/list-component';
import '../components/navigation/navigation-wc.js';

// eslint-disable-next-line no-unused-vars
import { addNote, deleteNote } from '../store/actions/notes.actions.js';

class DataBinding extends connect(store)(LitElement) {
  static get styles() {
    return [styles, commonStyles];
  }

  static get properties() {
    return {
      messageList: { type: Array },
    };
  }

  addMessage(e) {
    this.messageList = [...this.messageList, e.detail];
    // store.dispatch(addNote(e.detail));
  }

  deleteMessage(e) {
    this.messageList = this.messageList.filter((x, i) => i !== e.detail.index);
    // store.dispatch(deleteNote(e.detail.index));
  }

  stateChanged(state) {
    this.messageList = state.notes.list;
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <section class="container">
        <h1>Data binding</h1>
        <input-form @my-event="${this.addMessage}" .fullContent=${true}>Guardar</input-form>
        <list-component .list="${this.messageList}" @delete-event="${this.deleteMessage}"></list-component>
      </section>
    `;
  }
}

window.customElements.define('data-binding', DataBinding);
