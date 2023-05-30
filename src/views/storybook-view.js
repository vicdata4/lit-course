import { LitElement, html, css } from 'lit-element';
import { styles } from '../utils/home-styles';
import '../components/navigation/navigation-wc.js';
import '../components/common-header.js';

class StorybookView extends LitElement {
  static get styles() {
    return [
      styles,
      css`
        iframe {
          border: none;
        }
      `,
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <iframe
        src="../../storybook-build/index.html"
        height="100%"
        width="100%"
        name="storybook"
        title="LitCourse Storybook"
      ></iframe>
    `;
  }
}

window.customElements.define('storybook-view', StorybookView);
