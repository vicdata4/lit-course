import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { getInfo, addItem, deleteItem, updateItem } from './api/api-request';
import '../../components/common-header';
import '../../components/work-header';
import './components/vacation-approval/vacation-approval';
import './components/vacation-detail/vacation-detail-admin';

const components = {
  vacationApproval: () =>
    html`<vacation-approval
      .listaDatos="${this.listaDatos}"
      @update-item="${(e) => this.updateItem(e)}"
    ></vacation-approval>`,
  vacationDetail: () => html`<vacation-detail-admin .listaDatos="${this.listaDatos}"></vacation-detail-admin>`,
};

class Efim93Page extends LitElement {
  static get styles() {
    return [commonStyles];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false },
      listaDatos: { type: Array },
    };
  }

  constructor() {
    super();
    this.current = 'vacationApproval';
  }

  setComponent(component) {
    this.current = component;
  }

  async firstUpdated() {
    await this.getList();
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

  async addItem(e) {
    const request = await addItem(e.detail);
    if (!request.error) await this.getList();
  }

  async deleteItem(e) {
    const request = await deleteItem(e.detail);
    if (!request.error) await this.getList();
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
          ${Object.keys(components).map(
            (item) => html` <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button> `,
          )}
        </div>
        ${components[this.current]()}
      </section>
    `;
  }
}

window.customElements.define('efim93-page', Efim93Page);
