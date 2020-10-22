import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';

class Andresclase1234Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>Andresclase1234</work-header>
      </section>
    `;
  }
}

window.customElements.define('andresclase1234-page', Andresclase1234Page);
