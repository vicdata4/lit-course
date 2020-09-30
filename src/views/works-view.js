import { LitElement, html } from 'lit-element';
import { navigatorStyles } from '../utils/custom-styles';
import { users } from '../utils/constants';
import '../components/common-header';

class WorksView extends LitElement {
  static get styles() {
    return [
      navigatorStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <nav>
        <ul class="menu-list">
            ${users.map(user => html`
              <li><a href="/${user.toLowerCase()}">${user}</a></li>
            `)}
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('works-view', WorksView);
