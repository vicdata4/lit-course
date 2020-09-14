import { LitElement, html } from 'lit-element';
import { navigatorStyles, commonStyles } from '../utils/custom-styles';
import '../components/common-header';
import '../components/form-example';

class FormExampleView extends LitElement {
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
        <form-example></form-example>
      </section>
    `;
  }
}

window.customElements.define('form-example-view', FormExampleView);
