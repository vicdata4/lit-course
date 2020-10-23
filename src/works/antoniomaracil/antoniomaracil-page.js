/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { empData, empDocument } from './utils/constants';
import '../../components/common-header';
import '../../components/work-header';
import './components/admin-vacation-form/components/admin-vacation-form';
import './components/document-list/components/document-list';

const components = {
  adminVacationForm: () =>
    html`<admin-vacation-form
      .list="${empData}"
      .nElements="${10}"
      @update-array="${this.updateArray}"
    ></admin-vacation-form>`,
  documentList: () => html`<document-list .list="${empDocument}"></document-list>`,
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
    this.current = 'adminVacationForm';
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
