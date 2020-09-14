import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { dateFormatter } from '../utils/functions';
import '../components/common-header';

class FormThreeView extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
      <h1>Form Three View</h1>
        <p>
          ${dateFormatter(new Date()).default}
        </p>
      </section>
    `;
  }
}

window.customElements.define('form-three-view', FormThreeView);
