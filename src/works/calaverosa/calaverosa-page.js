import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';

class CalaverosaPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>Calaverosa</work-header>
      </section>
    `;
  }
}

window.customElements.define('calaverosa-page', CalaverosaPage);
