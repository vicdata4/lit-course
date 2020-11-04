import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { buttons } from './styles/buttons-styles';
import { hours, months, projects, years } from './data/hours-data';
import { requests } from './data/request-employee-data';
import '../../components/common-header';
import '../../components/work-header';
import './components/hours-component';
import './components/requests-component';

const components = {
  hours: () =>
    html`<hours-component .data=${hours} .months=${months} .projects=${projects} .years=${years}></hours-component>`,
  request: () => html`<requests-component .data=${requests}></requests-component>`,
};

class Hck3791Page extends LitElement {
  static get styles() {
    return [commonStyles, buttons];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.current = 'hours';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>hck3791</work-header>
        <div id="generateButtons" class="common-list">
          ${Object.keys(components).map(
            (item) =>
              html`
                <button id="generateComponent" class="common-btn" @click="${() => this.setComponent(item)}">
                  ${item}
                </button>
              `,
          )}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('hck3791-page', Hck3791Page);
