import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../utils/custom-styles';
import { styles } from '../utils/home-styles';
import * as users from '../profiles/profiles.json';
import '../components/common-header';
import '../components/navigation/navigation-wc.js';

class ProfilesView extends LitElement {
  static get styles() {
    return [
      styles,
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
      <navigation-wc></navigation-wc>
      <nav>
        <ul class="menu-list">
          ${users.list.map((user) => html`
            <li><a href="/profiles/${user.toLowerCase()}" class="user-link">${user}</a></li>
          `)}
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('profiles-view', ProfilesView);
