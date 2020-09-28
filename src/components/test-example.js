import { LitElement, html } from 'lit-element';

class TestExample extends LitElement {
  render() {
    return html`
      Test example2
    `;
  }
}

window.customElements.define('test-example', TestExample);
