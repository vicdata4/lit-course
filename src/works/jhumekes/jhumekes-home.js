import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';

class JhumekesHome extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h2>Jhumekes</h2>
      </section>
    `;
  }
}

window.customElements.define('jhumekes-home', JhumekesHome);
