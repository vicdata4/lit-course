import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { getInfo, getInfoDetail, updateItem } from './api/api-request';
import '../../components/common-header';
import '../../components/work-header';
import './components/vacation-approval/vacation-approval';
import './components/vacation-detail/vacation-detail-admin';

class Efim93Page extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
      listaDatos: { type: Array },
      listaDatosD: { type: Array },
      components: { type: String },
    };
  }

  constructor() {
    super();
    this.listaDatos = this.getList();
    this.listaDatosD = [];
    this.current = 'vacationApproval';
    this.components = {
      vacationApproval: () =>
        html`<vacation-approval
          .listaDatos="${this.listaDatos}"
          @update-item="${(e) => this.updateItem(e)}"
        ></vacation-approval>`,
      vacationDetail: () => html`<vacation-detail-admin .listaDatos="${this.listaDatosD}"></vacation-detail-admin>`,
    };
  }

  setComponent(component) {
    this.current = component;
  }

  async updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName.includes('current')) {
        this.getListDetail();
      }
    });
  }

  async getList() {
    const request = await getInfo();
    if (!request.error) {
      this.listaDatos = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  async getListDetail() {
    const request = await getInfoDetail();
    if (!request.error) {
      this.listaDatosD = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  async updateItem(e) {
    const request = await updateItem(e.detail.body);
    if (!request.error) {
      await this.getList();
      this.shadowRoot
        .querySelector('item-list')
        .shadowRoot.querySelector(`#_${e.detail.index}`)
        .classList.remove('edit');
    }
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>efim93</work-header>
        <div class="common-list">
          ${Object.keys(this.components).map(
            (item) => html` <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button> `,
          )}
        </div>
        ${this.components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('efim93-page', Efim93Page);
