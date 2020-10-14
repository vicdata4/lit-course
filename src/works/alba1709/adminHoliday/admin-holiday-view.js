import { LitElement, html } from 'lit-element';
import './table-admin';
import { viewHoliday } from './utils/styles-admin-holidays';

export class AdminHolidayView extends LitElement {
  static get styles() {
    return [
      viewHoliday
    ];
  }

  render() {
    return html`
            <h2>Solicitud de vacaciones</h2>
            <table-admin></table-admin>
        `;
  }
}
customElements.define('admin-holiday-view', AdminHolidayView);