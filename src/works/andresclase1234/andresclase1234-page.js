import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { dates } from './utils/data';
import './holidays-info/holidays-info';
import '../../components/common-header';
import '../../components/work-header';

const components = {
  infoVacaciones: () => html`<holidays-info .list="${dates}" .nElements="${4}"></holidays-info>`
};

class Andresclase1234Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false }
    };
  }

  constructor() {
    super();
    this.current = 'infoVacaciones';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
        <common-header></common-header>
        <section class="container">
          <work-header>andresclase1234</work-header>
          <div class="common-list">
            ${Object.keys(components).map(item => html`
              <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button>
            `)}
          </div>
          ${components[this.current]()}
        </section>
      `;
  }
}

window.customElements.define('andresclase1234-page', Andresclase1234Page);
