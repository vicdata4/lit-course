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
          <li><a href="/paris-view">Paris</a></li>
          <li><a href="/dublin-view">Dublin</a></li>
          <li><a href="/data-binding">Data binding</a></li>
          <li><a href="/list-example">List example</a></li>
          <li><a href="/solicitud-vacaciones">Solicitud Vacaciones</a></li>
        </ul>
      </nav>
    `;
  }
}

window.customElements.define('home-view', HomeView);
