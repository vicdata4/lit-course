import { LitElement, html } from 'lit-element';
import { getVacations, updateVacation } from '../../../utils/api/api-request';
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
    const request = await getVacations();
    if (!request.error) {
      this.list = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  async updateItem(e) {
    const request = await updateVacation(e.detail.body);
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
