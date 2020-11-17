import { LitElement, html } from 'lit-element';
import { deleteFile, getFiles } from '../../../utils/api/api-request';
import '../components/document-list';

class DocumentListView extends LitElement {
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
    const request = await getFiles();
    if (!request.error) {
      this.list = [...request.data];
    } else if (request.errorCode === 500) {
      // eslint-disable-next-line no-alert
      alert(request.error);
    }
  }

  async deleteItem(e) {
    const request = await deleteFile(e.detail);
    if (!request.error) await this.getList();
  }

  render() {
    return html` <document-list .list="${this.list}" @delete-item="${this.deleteItem}"></document-list> `;
  }
}

window.customElements.define('document-list-view', DocumentListView);
