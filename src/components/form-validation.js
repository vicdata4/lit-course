/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { emailValidator } from '../utils/functions';
import { seedStyle } from '@seed-catalog/styles';
import '../components/common-header';
import '../components/range-number';
import '../components/radio-text';
import '../components/check-boxes';

class FormValidation extends LitElement {
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
          color: red;
          padding: 10px;
        }

        .borde-rojo{
          border: 2px solid red;
          box-shadow: 2px 2px 6px 6px rgba(255, 0, 0, 0.3);
        }

        .borde-verde{
          border: 2px solid green;
          box-shadow: 2px 2px 6px 6px rgba(0, 0, 255, 0.3);
          color: green;
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
    e.preventDefault();

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
      <div>
        <form onsubmit="${this.onSubmit}">
          <input id="email" type="text" class="form-field ${this.message.charAt(0) == 'E' ? 'borde-rojo' : nothing}" placeholder="email" />
          <input id="password" type="password" class="form-field ${this.message.charAt(0) == 'Y' ? 'borde-rojo' : nothing}" placeholder="password" />
          <input type="submit" @click="${this.onSubmit}" class="sd-btn black" value="Check" />
          ${this.validated && this.message === '' ? html`<div class="alert-succesfull">&#128077;</div>` : nothing}
        </form>
        ${this.message !== '' ? html`<div class="alert-msg">${this.message}</div>` : nothing}
      </div>

    `;
  }
}

window.customElements.define('form-validation', FormValidation);
