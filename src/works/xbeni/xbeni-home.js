import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class XbeniHome extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      css``
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <h2>XbeniHome view</h2>
    `;
  }
}

window.customElements.define('xbeni-home', XbeniHome);
