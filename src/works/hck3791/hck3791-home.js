import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class Hck3791Home extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h2>hck3791</h2>
      </section>
    `;
  }
}

window.customElements.define('hck3791-home', Hck3791Home);
