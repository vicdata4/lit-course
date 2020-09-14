import { LitElement, html } from 'lit-element';
import { navigatorStyles, commonStyles } from '../utils/custom-styles';
import { dateFormatter } from '../utils/functions';
import '../components/common-header';

class FormOneView extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <nav>
        <ul class="menu-list">
          <li><a href="/">Volver</a></li>
        </ul>
      </nav>
      <section class="container">
        <h1>Form One View</h1>
        <p>
          ${dateFormatter(new Date()).default}
        </p>
      </section>
    `;
  }
}

window.customElements.define('form-one-view', FormOneView);
