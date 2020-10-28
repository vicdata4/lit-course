import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './petitions-visualization';
import '../jhumekes/petitions-description';

const components = {
  petitionsVisualization: () => html`<petitions-visualization>Submit</petitions-visualization>`,
  petitionsDescription: () => html`<petitions-description></petitions-description>`,
};

class JhumekesPage extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.current = 'petitionsVisualization';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>Jhumekes</work-header>
        <div class="common-list">
          ${Object.keys(components).map(
            (item) => html` <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button> `,
          )}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('jhumekes-page', JhumekesPage);
