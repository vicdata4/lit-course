import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../utils/custom-styles';
import { users } from '../utils/constants';
import { github } from '../utils/svg-icons';
import '../components/common-header';

class WorksView extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      css`
        .github-icon {
          display: none;
        }

        @media (min-width: 768px) {
          .github-icon {
            display: block;
            position: absolute;
            margin: 10px;
            fill: #a29b83;
          }

          li:hover > .github-icon {
            fill: white;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <nav>
        <ul class="menu-list">
          ${users.map(
            (user) => html` <li>${github}<a href="/${user.toLowerCase()}" class="user-link">${user}</a></li> `,
          )}
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('works-view', WorksView);
