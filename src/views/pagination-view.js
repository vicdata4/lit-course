import { LitElement, html } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import '../components/common-header';
import '../components/pagination-component';

const data = [
  { id: 1, name: 'Ana', phone: '654123123' },
  { id: 2, name: 'Luis', phone: '345634563' },
  { id: 3, name: 'Pedro', phone: '34563456345' },
  { id: 4, name: 'Sonia', phone: '345634563' },
  { id: 5, name: 'Antonio', phone: '345634564' },
  { id: 6, name: 'Pepe', phone: '654365445' },
  { id: 7, name: 'Javi', phone: '345634555' },
  { id: 8, name: 'Miguel', phone: '555655555' },
  { id: 9, name: 'Nacho', phone: '545646464' },
  { id: 10, name: 'Elena', phone: '666462626464' },
  { id: 11, name: 'Lucia', phone: '2653456455' },
  { id: 12, name: 'Carla', phone: '113452345' },
  { id: 13, name: 'Alvaro', phone: '634563456' },
  { id: 14, name: 'Luis', phone: '3456345655' },
  { id: 15, name: 'Roberto', phone: '6543654355' },
  { id: 16, name: 'Claudia', phone: '654123123' },
  { id: 17, name: 'Ramon', phone: '345634563' },
  { id: 18, name: 'Lucia', phone: '34563456345' },
  { id: 19, name: 'Cristina', phone: '345634563' },
  { id: 20, name: 'Jose', phone: '345634564' },
  { id: 21, name: 'Elvira', phone: '654365445' },
  { id: 22, name: 'Marina', phone: '345634555' },
  { id: 23, name: 'Franciso', phone: '555655555' },
  { id: 24, name: 'Pablo', phone: '545646464' },
  { id: 25, name: 'Carlos', phone: '666462626464' },
  { id: 26, name: 'Belen', phone: '2653456455' },
  { id: 27, name: 'Fatima', phone: '113452345' }
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
