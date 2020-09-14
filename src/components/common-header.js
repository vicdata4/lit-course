import { LitElement, html, css } from 'lit-element';

class CommonHeader extends LitElement {
  static get styles() {
    return css`
      :host {
        --dark-color: #3c3b3b;
      }

      header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 30px;
        color: white;
        background-color: var(--dark-color);
      }

      .logo {
        width: 50px;
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
        <img class="logo" src="/assets/images/polymer.png">
      </header>
    `;
  }
}

window.customElements.define('common-header', CommonHeader);
