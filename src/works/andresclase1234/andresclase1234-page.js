import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './empleado-vacaciones/solicitud-vacaciones';
import './admin-vacaciones/admin-vacaciones';
import './info-holidays/info-holidays';

const dates = [
  { id: 1, name: 'Andres', holidayFrom: new Date('2020-10-15'), holidayTo: new Date('2020-10-19') },
  { id: 2, name: 'Juan', holidayFrom: new Date('2020-11-15'), holidayTo: new Date('2020-11-20') },
  { id: 3, name: 'Eva', holidayFrom: new Date('2020-12-15'), holidayTo: new Date('2020-12-22') },
  { id: 4, name: 'Luis', holidayFrom: new Date('2020-10-19'), holidayTo: new Date('2020-10-23') }
];

class Andresclase1234Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>Andresclase1234</work-header>
      </section>
      <info-holidays .list="${dates}" .nElements="${2}"></info-holidays>
    `;
  }
}

window.customElements.define('andresclase1234-page', Andresclase1234Page);
