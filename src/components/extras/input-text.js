import { LitElement, html, css } from 'lit-element';

class InputText extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: auto 20px;
      }

      form {
        padding: 10px, 0;
      }
    `;
  }

  static get properties() {
    return {};
  }

  consulta(ev) {
    ev.preventDefault();
    const cartaBuscada = this.shadowRoot.querySelector('#inputTexto');
    const evBusq = new CustomEvent('evBusq', {
      detail: {
        mensaje: cartaBuscada.value,
      },
    });
    this.dispatchEvent(evBusq);
    cartaBuscada.value = '';
  }

  render() {
    return html`
      <form @submit="${this.consulta}" id="formulario">
        <slot></slot>
        <input type="text" id="inputTexto" />
        <button type="submit" id="botonSubm">Consulta</button>
      </form>
    `;
  }
}

customElements.define('input-text', InputText);
