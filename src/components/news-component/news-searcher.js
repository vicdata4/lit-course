import { LitElement, html, css } from 'lit-element';
import { spinner } from '../../utils/svg-icons';
import { nothing } from 'lit-html';
import '../input-component';
import './news-list';

const url = 'https://hn.algolia.com/api/v1/search?query=';

const errorHandler = (response) => {
  if (!response.ok) {
    return { error: response.statusText, errorCode: response.status };
  }
  return response.json();
};

class NewsSearcher extends LitElement {
  static get styles() {
    return css`

      .spinner-container {
        display: flex;
        justify-content: center;
        margin: 50px 0px;
      }

      input-component {
        display: block;
        margin-bottom: 20px;
      }
    `;
  }

  static get properties() {
    return {
      list: { type: Array },
      page: { type: Number },
      search: { type: String },
      showSpinner: { type: Boolean },
      hitsPerPage: { type: Number }
    };
  }

  constructor() {
    super();
    this.list = [];
    this.page = 0;
    this.search = '';
    this.showSpinner = false;
    this.hitsPerPage = 20;
  }

  async firstUpdated() {
    this.searchNews({ detail: { message: 'polymer' } });
  }

  async getDataFromApi() {
    return fetch(`${url}${this.search}&page=${this.page}&hitsPerPage=${this.hitsPerPage}`, { method: 'GET' })
      .then(errorHandler)
      .then(response => { return response; })
      .catch(error => { return { error }; });
  }

  async searchNews(e) {
    if (e.detail) {
      this.search = e.detail.message;
      this.page = 0;
    } else {
      this.page = this.page + 1;
    }

    this.setLoader(true);
    const data = await this.getDataFromApi();

    if (!data.error) {
      this.list = !e.detail ? [...this.list, ...data.hits] : [...data.hits];
    }

    this.setLoader(false);
  }

  setLoader(state) {
    const listComponent = this.shadowRoot.querySelector('news-list');

    this.showSpinner = state;
    listComponent.showMore = !state;
  }

  render() {
    return html`
      <input-component @my-event="${this.searchNews}">Search</input-component>
      <news-list .list="${this.list}" @show-more="${this.searchNews}"></news-list>
      ${this.showSpinner ? html`<div class="spinner-container">${spinner}</div>` : nothing}
    `;
  }
}

window.customElements.define('news-searcher', NewsSearcher);
