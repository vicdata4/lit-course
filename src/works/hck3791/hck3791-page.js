import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { hoursData } from './data/hours-data';
import '../../components/common-header';
import '../../components/work-header';
import './components/hours-component';

class Hck3791Page extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      hoursData: { type: Array }
    };
  }

  constructor() {
    super();
    this.hoursData = hoursData;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>hck3791</work-header>
        <hours-component .data="${this.hoursData}"></hours-component>
      </section>
    `;
  }
}

window.customElements.define('hck3791-page', Hck3791Page);
