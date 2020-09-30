import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class Alba1709Home extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h2>alba1709</h2>
      </section>
    `;
  }
}

window.customElements.define('alba1709-home', Alba1709Home);
