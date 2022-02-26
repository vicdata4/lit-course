import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { styles } from '../utils/home-styles';
import '../components/common-header';
import '../components/searcher/news-searcher';
import '../components/navigation/navigation-wc.js';

class SearcherView extends LitElement {
  static get styles() {
    return [styles, commonStyles];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <section class="container">
        <news-searcher></news-searcher>
      </section>
    `;
  }
}

window.customElements.define('searcher-view', SearcherView);
