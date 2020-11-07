import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { info } from '../utils/svg-icons';
import { newListStyles } from './searcher/searcher-list-style';

class CountryList extends LitElement {
  static get styles() {
    return [newListStyles];
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

  render() {
    return this.list.length > 0
      ? html`
          <div class="container">
            <div class="row header">
              <div class="index"></div>
              <div class="title">City</div>
              <div class="date">Country</div>
              <div class="points">Latitude</div>
              <div class="points">Longitude</div>
              <div class="info"></div>
            </div>
            ${this.list.map(
              (item, i) => html`
                <div class="row data">
                  <div class="index">${i + 1}</div>
                  <div class="title">${item.name}</div>
                  <div class="date light-grey">${item.country}</div>
                  <div class="points yellow">${item.lat}°</div>
                  <div class="points blue">${item.lng}°</div>
                  <div class="info">
                    <a target="_blank" href="${`https://en.wikipedia.org/wiki/${item.name}`}">${info}</a>
                  </div>
                </div>
              `,
            )}
          </div>
        `
      : nothing;
  }
}

window.customElements.define('country-list', CountryList);
