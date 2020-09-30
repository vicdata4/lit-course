import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class Andresclase1234Home extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      css``
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <h2>Andresclase1234Home view</h2>
    `;
  }
}

window.customElements.define('andresclase1234-home', Andresclase1234Home);
