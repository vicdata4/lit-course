import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/common-header';
import '../components/form-example';

class FormExampleView extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <form-example></form-example>
      </section>
    `;
  }
}

window.customElements.define('form-example-view', FormExampleView);
