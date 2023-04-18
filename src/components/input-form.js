/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';

class InputFrom extends LitElement {
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

  sendData(e) {
    const input = this.shadowRoot.querySelector('#message');

    if (input.value) {
      const event = new CustomEvent('my-event', {
        detail: {
          message: input.value,
          date: new Date(),
        },
      });

      this.dispatchEvent(event);
      input.value = '';
    } else {
      alert('Empty field');
    }

    e.preventDefault();
  }

  render() {
    return html`
      <form @submit="${this.sendData}">
        <input id="message" type="text" class="input-text" placeholder="write here.." />
        <button type="submit" @click="${this.sendData}" class="btn-submit"><slot></slot></button>
      </form>
    `;
  }
}

window.customElements.define('input-form', InputFrom);
