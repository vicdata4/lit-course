/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/admin-vacation-form/views/admin-vacation-view';
import './components/document-list/views/document-list-view';

const components = {
  adminVacationForm: () => html` <admin-vacation-view> </admin-vacation-view>`,
  documentList: () => html`<document-list-view></document-list-view>`,
};

class AntoniomaracilPage extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      list: { type: Array },
      current: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.current = 'documentList';
  }

  setComponent(component) {
    this.current = component;
  }

  updateArray(e) {
    this.list = [...e.detail.applications];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>antoniomaracil</work-header>
        <div class="common-list">
          ${Object.keys(components).map(
            (item) => html` <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button> `,
          )}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('antoniomaracil-page', AntoniomaracilPage);
