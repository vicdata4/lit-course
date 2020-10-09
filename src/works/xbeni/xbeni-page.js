import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/item008-lista-pe/item008-lista-pe';
import './components/item002_lista-cipa/item002_lista-cipa';

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
        <item008-lista-pe></item008-lista-pe>
        <item002_lista-cipa></item002_lista-cipa>
      </section>
    `;
  }
}

window.customElements.define('xbeni-page', XbeniPage);
