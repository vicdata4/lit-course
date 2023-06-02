import { LitElement, html } from 'lit-element';

class RangeNumber extends LitElement {
  static get styles() {}

  static get properties() {
    return {
      num: { type: Number },
    };
  }

  constructor() {
    super();
    this.num = 50;
  }

  cambiaValor() {
    const valorRango = this.shadowRoot.querySelector('#rango');
    this.num = parseInt(valorRango.value);
  }

  render() {
    return html`
      <input type="range" @input="${this.cambiaValor}" id="rango" min="0" max="100" />
      <input type="text" id="valor" value="${this.num}" readonly />
    `;
  }
}

customElements.define('range-number', RangeNumber);
