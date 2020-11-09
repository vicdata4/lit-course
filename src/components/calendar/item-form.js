import { LitElement, html, css } from 'lit-element';

class ItemForm extends LitElement {
  static get styles() {
    return css`
      :host {
      }
    `;
  }

  addItem() {
    const { text, date } = this.getQuerySelectors();

    if (text.value && date.value) {
      const event = new CustomEvent('add-item', {
        detail: {
          name: text.value,
          date: new Date(date.value),
        },
      });

      this.dispatchEvent(event);

      text.value = '';
      date.value = '';
      this.setSubmit();
    }
  }

  getQuerySelectors() {
    return {
      text: this.shadowRoot.querySelector('input[type=text]'),
      date: this.shadowRoot.querySelector('input[type=date]'),
    };
  }

  setSubmit() {
    const { text, date } = this.getQuerySelectors();
    this.shadowRoot.querySelector('input[type=submit]').disabled = !(text.value && date.value);
  }

  render() {
    return html`
      <form onsubmit="return false">
        <input type="text" @keyup="${() => this.setSubmit()}" />
        <input type="date" @change="${() => this.setSubmit()}" />
        <input type="submit" @click="${this.addItem}" value="Add item" disabled />
      </form>
    `;
  }
}

window.customElements.define('item-form', ItemForm);
