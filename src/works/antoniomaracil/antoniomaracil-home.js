import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class AntoniomaracilHome extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h2>antoniomaracil</h2>
      </section>
    `;
  }
}

window.customElements.define('antoniomaracil-home', AntoniomaracilHome);
