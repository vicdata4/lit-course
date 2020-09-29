import { LitElement, html } from 'lit-element';

class InputComponent extends LitElement {
  sendData() {
    const inputValue = this.shadowRoot.querySelector('#message');
    const event = new CustomEvent('my-event', {
      detail: {
        message: inputValue.value
      }
    });
    this.dispatchEvent(event);
    inputValue.value = '';
  }

  render() {
    return html`
      <input id="message" type="text" placeholder="escribe aqui..">
      <button @click="${this.sendData}">Guardar</button>
    `;
  }
}

window.customElements.define('input-component', InputComponent);
