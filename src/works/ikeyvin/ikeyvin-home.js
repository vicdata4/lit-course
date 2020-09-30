import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class IkeyvinHome extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      css``
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <h2>IkeyvinHome view</h2>
    `;
  }
}

window.customElements.define('ikeyvin-home', IkeyvinHome);
