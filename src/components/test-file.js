import { LitElement, html } from 'lit-element';

class TestFile extends LitElement {
  render() {
    return html`
      Test file
    `;
  }
}

window.customElements.define('test-file', TestFile);
