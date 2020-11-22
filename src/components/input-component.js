/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';

class InputComponent extends LitElement {
  static get styles() {
    return [
      css`
        .input-text {
          padding: 10px;
          border: 1px solid #b6c3c4;
        }

        .btn-submit {
          height: 37px;
          background-color: transparent;
          border: 1px solid grey;
          padding: 10px;
          outline: none;
          cursor: pointer;
        }

        .btn-submit:hover {
          background-color: #f1f1f1;
        }
      `,
    ];
  }

  sendData() {
    const inputValue = this.shadowRoot.querySelector('#message');
    if (inputValue.value) {
      const event = new CustomEvent('my-event', {
        detail: {
          message: inputValue.value,
          date: new Date(),
        },
      });
      this.dispatchEvent(event);
      inputValue.value = '';
    } else {
      alert('Empty field');
    }
  }

  render() {
    return html`
      <input id="message" type="text" class="input-text" placeholder="write here.." />
      <button class="btn-submit" @click="${this.sendData}"><slot></slot></button>
    `;
  }
}

window.customElements.define('input-component', InputComponent);
