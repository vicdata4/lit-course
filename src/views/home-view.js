import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../utils/custom-styles';
import '../components/common-header';

class HomeView extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      css``
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <nav>
        <ul class="menu-list">
          <li><a href="/form-example-view">Form Example</a></li>
          <li><a href="/form-one-view">Form one</a></li>
          <li><a href="/form-two-view">Form two</a></li>
          <li><a href="/form-three-view">Form three</a></li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('home-view', HomeView);
