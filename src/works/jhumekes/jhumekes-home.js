import { LitElement, html, css } from 'lit-element';
import { navigatorStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class JhumekesHome extends LitElement {
  static get styles() {
    return [
      navigatorStyles,
      css``
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <h2>Jhumekes view</h2>
    `;
  }
}

window.customElements.define('jhumekes-home', JhumekesHome);
