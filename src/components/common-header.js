import { LitElement, html, css } from 'lit-element';
import { logo } from '../utils/svg-icons.js';
class CommonHeader extends LitElement {
  static get styles() {
    return css`
      :host {
        --dark-color: #3c3b3b;
        --header-background: rgb(50, 50, 50);
        --header-height: 120px;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--header-background);
        height: var(--header-height);
      }

      .title {
        margin: 0;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <header>
        <a href="/lit-course/">${logo}</a>
      </header>
    `;
  }
}

window.customElements.define('common-header', CommonHeader);
