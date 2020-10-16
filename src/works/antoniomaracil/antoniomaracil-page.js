/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { empData, vacationDays, empHistory } from './utils/constants';
import '../../components/common-header';
import '../../components/work-header';
import './components/vacation-form/components/vacation-form';
import './components/admin-vacation-form/components/admin-vacation-form';
import './components/vacation-detail/components/vacation-detail';
import './components/admin-vacation-detail/components/admin-vacation-detail';

const components = {
  vacationForm: () => html`<vacation-form @update-array="${this.updateArray}" .nElements="${10}"></vacation-form>`,
  adminVacationForm: () => html`<admin-vacation-form .list="${empData}" .nElements="${10}" @update-array="${this.updateArray}"></admin-vacation-form>`,
  vacationDetail: () => html`<vacation-detail .list="${vacationDays}"></vacation-detail>`,
  adminVacationDetail: () => html`<admin-vacation-detail .list="${vacationDays}" .history="${empHistory}"></admin-vacation-detail>`
};

class AntoniomaracilPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      list: { type: Array },
      current: { type: String, attribute: false }
    };
  }

  constructor() {
    super();
    this.list = [];
    this.current = 'vacationForm';
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
          ${Object.keys(components).map(item => html`
            <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button>
          `)}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('antoniomaracil-page', AntoniomaracilPage);
