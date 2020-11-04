import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/common-header';
import '../components/searcher/news-searcher';

class SearcherView extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <news-searcher></news-searcher>
      </section>
    `;
  }
}

window.customElements.define('searcher-view', SearcherView);
