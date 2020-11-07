import { LitElement, html } from 'lit-element';
import { vacationDates } from '../utils/vacation-dates';
import { dateFormatter, vacationDays } from '../utils/functions';
import { historyStyles } from '../utils/history-styles';
import '../components/stepper';
class VacationHistory extends LitElement {
  static get styles() {
    return [historyStyles];
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
    this.nDates = 6;
    this.to = this.nDates;
  }

  getValues(e) {
    this.from = e.detail[0];
    this.to = e.detail[1];
  }

  table() {
    const stepper = html`<stepper-component
      .nEmployees="${this.nDates}"
      .listLength="${this.vacationDates.length}"
      @interval-values="${this.getValues}"
    ></stepper-component>`;

    return html`
      <h2>Detalle de vacaciones</h2>
      ${this.vacationDates.length >= this.nDates ? stepper : null}
      <div class="tableContainer">
        <table class="historyTable">
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

  render() {
    return html`${this.vacationDates.length === 0 ? html`<h1>No hay historial de vacaciones aún</h1>` : this.table()}`;
  }
}
window.customElements.define('vacation-history', VacationHistory);
