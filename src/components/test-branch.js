import { LitElement, html, css } from 'lit-element';

class TestBranch extends LitElement {
  static get styles() {
    return css`
    `;
  }

  render() {
    return html`
      <h1>Test branch</h1>
    `;
  }
}

window.customElements.define('test-branch', TestBranch);
