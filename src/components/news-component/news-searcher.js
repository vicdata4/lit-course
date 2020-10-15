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

      .centered {
        display: flex;
        justify-content: center;
      }

      .spinner {
        margin: 50px 0px;
      }

      .search-info {
        text-align: center;
        margin-bottom: 20px;
        color: rgb(40, 86, 89);
        font-size: 14px;
      }

      .search-light {
        color: #0489aa;
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
      nbHits: { type: Number },
      hitsPerPage: { type: Number }
    };
  }

  constructor() {
    super();
    this.list = [];
    this.page = 0;
    this.search = '';
    this.showSpinner = false;
    this.nbHits = 0;
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
      this.setLoader(true, 'reset');
    } else {
      this.page = this.page + 1;
      this.setLoader(true);
    }

    const data = await this.getDataFromApi();
    this.nbHits = data.nbHits;

    if (!data.error) {
      this.list = !e.detail ? [...this.list, ...data.hits] : [...data.hits];
    }

    this.setLoader(false);
  }

  setLoader(state, reset = null) {
    const listComponent = this.shadowRoot.querySelector('news-list');
    listComponent.style.display = reset ? 'none' : 'block';

    this.showSpinner = state;
    listComponent.showMore = !state;
  }

  render() {
    return html`
      <div class="centered">
        <input-component @my-event="${this.searchNews}">Search posts</input-component>
      </div>
      ${!this.showSpinner ? html`
        <div class="search-info">
          ${this.nbHits} results about <span class="search-light">${this.search}</span>
        </div>` : nothing}

      <news-list .list="${this.list}" @show-more="${this.searchNews}"></news-list>
      ${this.showSpinner ? html`<div class="centered spinner">${spinner}</div>` : nothing}
    `;
  }
}

window.customElements.define('news-searcher', NewsSearcher);
