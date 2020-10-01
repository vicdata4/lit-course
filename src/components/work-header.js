import { LitElement, html, css } from 'lit-element';
import { github } from '../utils/svg-icons';

class WorkHeader extends LitElement {
  static get styles() {
    return css`
      .container {
        border-bottom: 1px solid#d6d6d6;
      }

      h1 {
        color: #0c7da0;
      }

      .github-icon {
        fill: #9c927d;
        margin-right: 10px;
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <h1>${github}<slot></slot></h1>
      </div>
    `;
  }
}

window.customElements.define('work-header', WorkHeader);
