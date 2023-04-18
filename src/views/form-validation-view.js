import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { styles } from '../utils/home-styles';
import '../components/common-header';
import '../components/form-validation';
import '../components/navigation/navigation-wc.js';

class FormValidationView extends LitElement {
  static get styles() {
    return [styles, commonStyles];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <section class="container">
        <form-validation></form-validation>
      </section>
    `;
  }
}

window.customElements.define('form-validation-view', FormValidationView);
