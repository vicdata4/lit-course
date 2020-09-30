import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class Andresclase1234Home extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h2>Andresclase1234</h2>
      </section>
    `;
  }
}

window.customElements.define('andresclase1234-home', Andresclase1234Home);
