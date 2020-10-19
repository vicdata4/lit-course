import { LitElement, html } from 'lit-element';
import { vacationDates } from '../utils/vacation-dates';
import { dateFormatter, vacationDays } from '../utils/functions';
import { tableStyles, mediaQueries } from '../utils/custom-styles';
class VacationHistory extends LitElement {
  static get styles() {
    return [tableStyles, mediaQueries];
  }

  static get properties() {
    return {
      vacationDates: { type: Array },
      vacationDays: { type: Array }

    };
  }

  constructor() {
    super();
    this.vacationDates = [...vacationDates];
  }

  render() {
    return html`
            <h2>Detalle de vacaciones</h2>
            <div class="tableDiv">
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
                  <td>${vacationDays(dates)}</td>
                </tr>
                `)}
              </table>
            </div>
        `;
  }
}
window.customElements.define('vacation-history', VacationHistory);
