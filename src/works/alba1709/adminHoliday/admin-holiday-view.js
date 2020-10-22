import { LitElement, html } from 'lit-element';
import './table-admin';
import { viewHoliday } from './utils/styles-admin-holidays';
import { employeeRequest } from './utils/constants';

export class AdminHolidayView extends LitElement {
  static get styles() {
    return [
      viewHoliday
    ];
  }

  render() {
    return html`
            <h2>Solicitud de vacaciones</h2>
            <table-admin .adminTable="${employeeRequest}" .numEmp="${10}"></table-admin>
        `;
  }
}
customElements.define('admin-holiday-view', AdminHolidayView);
