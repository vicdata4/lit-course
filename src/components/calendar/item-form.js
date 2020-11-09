import { LitElement, html, css } from 'lit-element';

class ItemForm extends LitElement {
  static get styles() {
    return css`
      :host {
      }
    `;
  }

  addItem() {
    const text = this.shadowRoot.querySelector('input[type=text]');
    const date = this.shadowRoot.querySelector('input[type=date]');

    if (text.value && date.value) {
      const event = new CustomEvent('add-item', {
        detail: {
          name: text.value,
          date: new Date(date.value),
        },
      });

      this.dispatchEvent(event);
    }
  }

  render() {
    return html`
      <form onsubmit="return false">
        <input type="text" />
        <input type="date" />
        <input type="submit" @click="${this.addItem}" value="add" />
      </form>
    `;
  }
}

window.customElements.define('item-form', ItemForm);
