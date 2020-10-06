import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './item008-lista-pe/item008-lista-pe';

class XbeniPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>XBeni</work-header>
        <item012-lista-pe></item012-lista-pe>
      </section>
    `;
  }
}

window.customElements.define('xbeni-page', XbeniPage);
