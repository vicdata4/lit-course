import { LitElement, html } from 'lit-element';
import { nothing } from 'lit-html';
import { vacationDates } from '../utils/vacation-dates';
import { dateFormatter, vacationDays } from '../utils/functions';
import { mediaQueries } from '../utils/custom-styles';
import '../components/stepper';
class VacationHistory extends LitElement {
  static get styles() {
    return [mediaQueries];
  }

  static get properties() {
    return {
      vacationDates: { type: Array },
      vacationDays: { type: Array },
      from: { type: Number },
      to: { type: Number },
      nEmployees: { type: Number },
    };
  }

  constructor() {
    super();
    this.vacationDates = [...vacationDates];
    this.from = 0;
    this.nEmployees = 4;
    this.to = this.nEmployees;
  }

  getValues(e) {
    this.from = e.detail[0];
    this.to = e.detail[1];
  }

  render() {
    return html`
      <h2>Detalle de vacaciones</h2>
      ${this.vacationDates.length >= this.nEmployees
        ? html`<stepper-component
            .listLength="${this.vacationDates.length}"
            @interval-values="${this.getValues}"
          ></stepper-component>`
        : nothing}
      <div class="tableDiv">
        <table>
          <tr>
            <th>Día Inicio de Vacaciones</th>
            <th>Día Fin de Vacaciones</th>
            <th>Días Tomados</th>
          </tr>
          ${this.vacationDates.slice(this.from, this.to).map(
            (dates) => html`
              <tr>
                <td>${dateFormatter(dates.startDate).slashDate}</td>
                <td>${dateFormatter(dates.endDate).slashDate}</td>
                <td>${vacationDays(dates)}</td>
              </tr>
            `,
          )}
        </table>
      </div>
    `;
  }
}
window.customElements.define('vacation-history', VacationHistory);
