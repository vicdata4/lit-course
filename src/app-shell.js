import { LitElement, html } from 'lit-element';
import { routing } from './routing';

class AppShell extends LitElement {
  constructor() {
    super();
    // Github deployment config
    const path = localStorage.getItem('path');
    if (path) {
      localStorage.removeItem('path');
      this.router.navigate([path]);
    }
  }

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
