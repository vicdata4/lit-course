import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';

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
        <work-header>alba1709</work-header>
      </section>
    `;
  }
}

window.customElements.define('alba1709-home', Alba1709Home);
