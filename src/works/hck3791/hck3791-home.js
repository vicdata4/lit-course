import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class Hck3791Home extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      css``
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <h2>Hck3791Home view</h2>
    `;
  }
}

window.customElements.define('hck3791-home', Hck3791Home);
