import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { buttons } from './styles/buttons-styles';
import { getHours, getRequests } from '../../utils/api/hck3791/api-request';
import { months, projects, years } from './data/hours-data';
// import { requests } from './data/request-employee-data';
import '../../components/common-header';
import '../../components/work-header';
import './components/hours-component';
import './components/requests-component';

const components = {
  hours: (data) =>
    html` <hours-component .data=${data} .months=${months} .projects=${projects} .years=${years}></hours-component>`,
  request: (data) => html`<requests-component .data=${data}></requests-component>`,
};

class Hck3791Page extends LitElement {
  static get styles() {
    return [commonStyles, buttons];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
      hours: { type: Array },
      requests: { type: Array },
    };
  }

  constructor() {
    super();
    this.current = 'hours';
  }

  setComponent(component) {
    this.current = component;
  }

  async firstUpdated() {
    await this.getHoursData();
    await this.getRequestsData();
  }

  async getHoursData() {
    const request = await getHours();
    if (!request.error) {
      this.hours = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  async getRequestsData() {
    const request = await getRequests();
    if (!request.error) {
      this.requests = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
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
        ${this.current === 'hours' ? components[this.current](this.hours) : components[this.current](this.requests)}
      </section>
    `;
  }
}

window.customElements.define('hck3791-page', Hck3791Page);
