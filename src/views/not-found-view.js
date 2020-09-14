import { LitElement, html } from 'lit-element';

class NotFoundView extends LitElement {
  static get styles() {
    return [];
  }

  render() {
    return html`
      <section>
        <h1>Not found view</h1>
      </section>
    `;
  };
}

window.customElements.define('not-found-view', NotFoundView);
