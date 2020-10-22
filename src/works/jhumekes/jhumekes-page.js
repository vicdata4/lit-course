import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './visualizacion-peticiones';

class JhumekesPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>Jhumekes</work-header>
        <visualizacion-peticiones></visualizacion-peticiones>
        <permit-report></permit-report>
      </section>
    `;
  }
}

window.customElements.define('jhumekes-page', JhumekesPage);
