/* eslint-disable indent */
import { LitElement, html } from 'lit-element';
import { candidates } from '../cand';

class CandidatesComponent extends LitElement {
  static get properties() {
    return {
      candidates: { type: Array }
    };
  }

  constructor() {
    super();
    this.candidates = candidates;
  }

  render() {
    return html`
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Teléfono</th>
          <th>Perfil</th>
          <th>En plantilla</th>
          <th>Fecha de última actualización de datos</th>
          <th>Fecha de vencimiento</th>
          <th>Semáforo</th>
        </tr>
      </thead>
      <tbody>
       ${this.candidates.map(candidate => {
           let count = 0;
           // eslint-disable-next-line indent
           return html`
           <tr>
             ${(Object.values(candidate)).map(value => {
                if (typeof (value) !== 'boolean') {
                    return html`
                        <td>${value}</td>
                    `;
                } else {
                    if (count === 0) {
                        count++;
                        return html`
                        <td><input type='checkbox' ?checked='${value}'></td>
                        `;
                    } else {
                        if (value === true) {
                            return html`
                              <td><img src='/assets/hck3791/icons/green_circle.png'></td>
                            `;
                        } else {
                            return html`
                              <td><img src='/assets/hck3791/icons/red_circle.png'></td>
                            `;
                        }
                    }
                }
             })}
           </tr>
        `})}
      </tbody>
    </table>
    `;
  }
}

customElements.define('candidates-component', CandidatesComponent);
