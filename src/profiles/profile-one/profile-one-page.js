/* eslint-disable no-alert */
import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import '../../components/input-form';
import '../../components/list-component';

const components = {
  inputComponent: () => html`
    <input-form @my-event="${(e) => alert(`Dispatched custom event called "my-event" with the following message: ${e.detail.message}`)}">
      Submit
    </input-form>
  `,
  listComponent: () => html`
    <list-component .list="${[
        { message: 'Message 1', date: new Date() },
        { message: 'Message 2', date: new Date() },
      ]}"
      @delete-event="${(e) =>
        alert(`Dispatched custom event called "delete-event" with the following index: ${e.detail.index}`)}">
    </list-component>
  `
};

class ProfileOnePage extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.current = 'inputComponent';
  }

  setComponent(component) {
    // console.log(this.shadowRoot.querySelectorAll('*'));
    this.current = component;
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>profile-one page <img src="assets/user/test_img.png" /></work-header>
        <div class="common-list">
          ${Object.keys(components).map((item) => html`
            <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button>
          `)}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('profile-one-page', ProfileOnePage);
