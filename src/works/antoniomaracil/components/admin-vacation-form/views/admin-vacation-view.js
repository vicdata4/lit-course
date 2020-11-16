import { LitElement, html } from 'lit-element';
import { getInfo, updateItem } from '../../../utils/api/api-request';
import '../components/admin-vacation-form';

class AdminVacationView extends LitElement {
  static get styles() {}

  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  async firstUpdated() {
    await this.getList();
  }

  async getList() {
    const request = await getInfo();
    if (!request.error) {
      this.list = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  async updateItem(e) {
    const request = await updateItem(e.detail.body);
    debugger;
    if (!request.error) {
      await this.getList();
    }
  }

  render() {
    return html`
      <admin-vacation-form
        .list="${this.list}"
        .nElements="${10}"
        @update-item="${this.updateItem}"
      ></admin-vacation-form>
    `;
  }
}

window.customElements.define('admin-vacation-view', AdminVacationView);
