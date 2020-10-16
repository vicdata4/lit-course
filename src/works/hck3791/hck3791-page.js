import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/hours-component';
import './components/candidates-component';
import './components/requestlist-component';
import './components/permissions-component';

const components = {
  hoursComponent: () => html`<hours-component>Submit</hours-component>`,
  candidatesComponent: () => html`<candidates-component></candidates-component>`,
  permissionsComponent: () => html`<permissions-component></permissions-component>`,
  requestlistComponent: () => html`<requestlist-component></requestlist-component>`
};

class Hck3791Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      current: { type: String }
    };
  }

  constructor() {
    super();
    this.current = 'inputComponent';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>hck3791</work-header>
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

window.customElements.define('hck3791-page', Hck3791Page);
