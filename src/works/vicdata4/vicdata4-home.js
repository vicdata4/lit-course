import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class Vicdata4Home extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h2>vicdata4</h2>
      </section>
    `;
  }
}

window.customElements.define('vicdata4-home', Vicdata4Home);
