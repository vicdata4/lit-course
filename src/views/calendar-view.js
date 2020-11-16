import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { getInfo, addItem, deleteItem, updateItem } from '../utils/api/api-request';
import '../components/calendar/item-list';
import '../components/calendar/item-form';

class CalendarView extends LitElement {
  static get styles() {
    return [commonStyles];
  }

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

  async addItem(e) {
    const request = await addItem(e.detail);

    if (!request.exist && !request.error) {
      await this.getList();
    } else {
      // eslint-disable-next-line no-alert
      alert('La fecha introducida ya existe');
    }
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
        <h1>Calendar</h1>
        <item-form @add-item="${this.addItem}"></item-form>
        <item-list .list="${this.list}" @delete-item="${this.deleteItem}" @update-item="${this.updateItem}"></item-list>
      </section>
    `;
  }
}

window.customElements.define('calendar-view', CalendarView);
