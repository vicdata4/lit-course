import { LitElement, html } from 'lit-element';
import { vacationDates } from '../utils/vacation-dates';
import { dateFormatter } from '../utils/functions';
import { tableStyles } from '../utils/custom-styles';
class VacationHistory extends LitElement {
  static get styles() {
    return [tableStyles];
  }

  static get properties() {
    return {
      vacationDates: { type: Array }
    };
  }

  constructor() {
    super();
    this.vacationDates = [...vacationDates];
  }

  render() {
    return html`
            <h2>Detalle de vacaciones</h2>
            <table>
              <tr>
                <th>Día Inicio de Vacaciones</th>
                <th>Día Fin de Vacaciones</th>
                <th>Días Tomados</th>
              </tr>
              ${this.vacationDates.map(dates => html`
              <tr>
                <td>${dateFormatter(dates.startDate).slashDate}</td>
                <td>${dateFormatter(dates.endDate).slashDate}</td>
              </tr>
              `)}
            </table>
        `;
  }
}
window.customElements.define('vacation-history', VacationHistory);
