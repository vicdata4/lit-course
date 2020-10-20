import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/reporte-pe/reporte-pe';

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
        <div>
          <reporte-pe></reporte-pe>
        </div>
      </section>
    `;
  }
}

window.customElements.define('xbeni-page', XbeniPage);
