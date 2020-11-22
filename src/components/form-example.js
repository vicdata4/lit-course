/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { emailValidator } from '../utils/functions';
import { seedStyle } from '@seed-catalog/styles';
import '../components/common-header';

class FormExample extends LitElement {
  static get styles() {
    return [
      seedStyle,
      css`
        :host {
          width: fit-content;
        }

        .form-field {
          padding: 10px;
          border-radius: 0;
          border: 1px solid grey;
          margin: 3px;
        }

        .alert-succesfull {
          display: inline-block;
          color: white;
          padding: 0;
          background-color: transparent;
          margin-left: 10px;
        }

        .alert-msg {
          color: black;
          padding: 10px;
        }

        @media (min-width: 768px) {
          form {
            flex-flow: row wrap;
            justify-content: center;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      validated: { type: Boolean, attribute: false },
      message: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.validated = false;
    this.message = '';
  }

  passwordValidator(pw) {
    return pw !== '' && pw.length === 8;
  }

  onSubmit(e) {
    const email = this.shadowRoot.querySelector('#email');
    const password = this.shadowRoot.querySelector('#password');

    if (!emailValidator(email.value)) {
      this.message = 'Enter a valid email';
      return false;
    }

    if (!this.passwordValidator(password.value)) {
      this.message = 'Your password must contain 8 characters';
      return false;
    }

    this.validated = true;
    this.message = '';
  }

  render() {
    return html`
      <form onsubmit="return false">
        <input id="email" type="text" class="form-field" placeholder="email" />
        <input id="password" type="password" class="form-field" placeholder="password" />
        <input type="submit" @click="${this.onSubmit}" class="sd-btn black" value="Check" />
        ${this.validated && this.message === '' ? html`<div class="alert-succesfull">&#128077;</div>` : nothing}
      </form>
      ${this.message !== '' ? html`<div class="alert-msg">${this.message}</div>` : nothing}
    `;
  }
}

window.customElements.define('form-example', FormExample);
