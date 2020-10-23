import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { dateFormatter } from '../../utils/functions';
import { info } from '../../utils/svg-icons';
import { newListStyles } from './news-list-style';

const domain = 'https://news.ycombinator.com/';
const urlUserProfile = `${domain}user?id=`;
const urlPost = `${domain}item?id=`;

class NewsList extends LitElement {
  static get styles() {
    return [newListStyles];
  }

  static get properties() {
    return {
      list: { type: Array },
      showMore: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.showMore = true;
  }

  showMoreNews() {
    this.dispatchEvent(new CustomEvent('show-more'));
  }

  render() {
    return this.list.length > 0
      ? html`
          <div class="container">
            <div class="row header">
              <div class="index"></div>
              <div class="title">Title</div>
              <div class="date">Date</div>
              <div class="points">Points</div>
              <div class="author">Author</div>
              <div class="info"></div>
            </div>
            ${this.list.map(
              (item, i) => html`
                <div class="info-container">
                  <span class="blue">@${item.author}</span> -
                  <span class="light-grey">${dateFormatter(new Date(item.created_at)).default}</span>
                </div>
                <div class="row data">
                  <div class="index">${i + 1}</div>
                  <div class="title">${item.title}</div>
                  <div class="date light-grey">${dateFormatter(new Date(item.created_at)).default}</div>
                  <div class="points yellow">${item.points}</div>
                  <div class="author blue">
                    <a target="_blank" class="blue" href="${urlUserProfile}${item.author}">@${item.author}</a>
                  </div>
                  <div class="info">
                    <a target="_blank" href="${urlPost}${item.objectID}">${info}</a>
                  </div>
                </div>
              `,
            )}
          </div>
          ${this.showMore
            ? html` <div class="show-more-container">
                <button @click="${this.showMoreNews}" class="show-more">Show more</button>
              </div>`
            : nothing}
        `
      : nothing;
  }
}

window.customElements.define('news-list', NewsList);
