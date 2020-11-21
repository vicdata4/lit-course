import { LitElement, html, css } from 'lit-element';

class StorybookView extends LitElement {
  static get styles() {
    return css`
      iframe {
        border: none;
      }
    `;
  }

  render() {
    return html`
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
