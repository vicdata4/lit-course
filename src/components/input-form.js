/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';

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

  static get properties() {
    return {
      fullContent: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.fullContent = false;
  }

  sendData(e) {
    const input = this.shadowRoot.querySelector('#message');
    const marca = this.shadowRoot.querySelector('#marca');
    const color = this.shadowRoot.querySelector('#color');

    const nuevaFecha = new Date();
    const inputDate = new Date(nuevaFecha.getTime());
    inputDate.setMilliseconds(0);

    if (input.value && marca.value) {
      const event = new CustomEvent('my-event', {
        detail: {
          message: input.value,
          date: inputDate,
          marca: marca.value,
          color: color.value,
        },
      });

      this.dispatchEvent(event);

      input.value = '';
      marca.value = '';
      color.value = '#000000';
    } else {
      alert('Empty field');
    }

    e.preventDefault();
  }

  render() {
    return html`
      <form @submit="${this.sendData}">
        ${this.fullContent
          ? html`
              <input type="color" id="color" @input="${this.cambiaColor}" />
              <select id="marca" @change="${this.cambiaMarca}">
                <option value="">-- Selecciona una opción --</option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            `
          : nothing}
        <input id="message" type="text" class="input-text" placeholder="write here.." />
        <button type="submit" id="btn-submit" @click="${this.sendData}" class="btn-submit"><slot></slot></button>
      </form>
    `;
  }
}

window.customElements.define('input-form', InputFrom);
