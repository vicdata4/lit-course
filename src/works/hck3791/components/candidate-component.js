import { LitElement, html } from 'lit-element';
import { candidateStyles } from '../styles/candidateStyles';
import { candidates } from '../cand';

class CandidateComponent extends LitElement {
  static get styles() {
    return [
      candidateStyles
    ];
  }

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
    <div id="candidate-container">
      <div id="header">
        </div id="search">
          <label>Editar el usuario</label>
          <input type="text">
        </div>
        <div id="add">
          <button>añadir nuevo</button>
        </div>
    </div> 
    `;
  }
}

customElements.define('candidate-component', CandidateComponent);
