import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/country-list';

const url = 'http://localhost:3000';

const errorHandler = (response) => {
  if (!response.ok) {
    return { error: response.statusText, errorCode: response.status };
  }
  return response.json();
};

class CitiesView extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  async firstUpdated() {
    await this.getInfo();
  }

  async getInfo() {
    const info = await fetch(`${url}/cities-data`, { method: 'GET' })
      .then(errorHandler)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return { error };
      });

    if (!info.error) {
      this.list = [...info.data];
    } else if (info.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(info.error);
    }
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h1>Countries</h1>
        <country-list .list="${this.list}"></country-list>
      </section>
    `;
  }
}

window.customElements.define('cities-view', CitiesView);
