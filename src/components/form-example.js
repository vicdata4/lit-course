/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { emailValidator } from '../utils/functions';
import '../components/common-header';

class FormExample extends LitElement {
  static get styles() {
    return [
      css`
        form {
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
        }

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

        .form-submit:hover {
            background-color: #108db3;
        }

        .alert-succesfull {
            display: inline-block;
            color: white;
            padding: 0;
            background-color: transparent;
            margin-left: 10px;
        }

        @media (min-width: 768px) {
            form {
                flex-flow: row wrap;
                justify-content: center;
            }
        }
      `
    ];
  }

  static get properties() {
    return {
      validated: { type: Boolean, attrbute: false }
    };
  }

  constructor() {
    super();
    this.validated = false;
  }

  passwordValidator(pw) {
    return pw !== '' && pw.length === 8;
  }

  onSubmit(e) {
    const email = this.shadowRoot.querySelector('#email');
    const password = this.shadowRoot.querySelector('#password');

    if (!emailValidator(email.value)) {
      alert('Enter a valid email');
      return false;
    }

    if (!this.passwordValidator(password.value)) {
      alert('Your password must contain 8 characters');
      return false;
    }

    this.validated = true;
  }

  render() {
    return html`
        <form onsubmit="return false">
            <input id="email" type="text" class="form-field" placeholder="email">
            <input id="password" type="password" class="form-field" placeholder="password">
            <input type="submit" @click="${this.onSubmit}" class="form-submit" value="Acceder">
            ${this.validated ? html`<div class="alert-succesfull">&#9989;</div>` : nothing}
        </form>
    `;
  }
}

window.customElements.define('form-example', FormExample);
