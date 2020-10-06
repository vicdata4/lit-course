import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/common-header';
import '../components/pagination-component';

const data = [
  { id: 1, name: 'Zna', phone: '654 12 31 23' },
  { id: 2, name: 'Luis', phone: '345 63 45 63' },
  { id: 3, name: 'Pedro', phone: '545 63 45 63' },
  { id: 4, name: 'Sonia', phone: '845 63 45 63' },
  { id: 5, name: 'Antonio', phone: '945 63 45 64' },
  { id: 6, name: 'Pepe', phone: '654 36 54 45' },
  { id: 7, name: 'Javi', phone: '345 63 45 55' },
  { id: 8, name: 'Miguel', phone: '555 65 55 55' },
  { id: 9, name: 'Nacho', phone: '545 64 64 64' },
  { id: 10, name: 'Elena', phone: '666 46 26 26' },
  { id: 11, name: 'Lucia', phone: '265 34 56 45' },
  { id: 12, name: 'Carla', phone: '113 45 23 45' },
  { id: 13, name: 'Alvaro', phone: '634 56 34 56' },
  { id: 14, name: 'Luis', phone: '345 63 45 65' },
  { id: 15, name: 'Roberto', phone: '654 36 54 55' },
  { id: 16, name: 'Claudia', phone: '654 12 31 23' },
  { id: 17, name: 'Ramon', phone: '345 63 45 63' },
  { id: 18, name: 'Lucia', phone: '345 63 45 65' },
  { id: 19, name: 'Cristina', phone: '345 63 45 63' },
  { id: 20, name: 'Jose', phone: '345 63 45 64' },
  { id: 21, name: 'Elvira', phone: '654 36 54 45' },
  { id: 22, name: 'Marina', phone: '345 63 45 55' },
  { id: 23, name: 'Franciso', phone: '655 65 55 55' },
  { id: 24, name: 'Pablo', phone: '545 64 64 64' },
  { id: 25, name: 'Carlos', phone: '666 46 26 24' },
  { id: 26, name: 'Belen', phone: '265 34 56 45' },
  { id: 27, name: 'Fatima', phone: '113 45 23 45' }
];

class PaginationView extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <h1>Pagination</h1>
        <pagination-component .list="${data}" .nElements="${5}"></pagination-component>
      </section>
    `;
  }
}

window.customElements.define('pagination-view', PaginationView);
