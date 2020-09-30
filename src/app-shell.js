import { LitElement, html } from 'lit-element';
import { routing } from './routing';

class AppShell extends LitElement {
  firstUpdated() {
    routing.call(this);
  }

  render() {
    return html`
        <div id="root"></div>
    `;
  }
}

window.customElements.define('app-shell', AppShell);
