import { LitElement, html } from 'lit-element';
import { candidateStyles } from '../styles/candidateStyles';

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

  render() {
    return html`
    <div id="candidate-container">
      <div id="header">
        <div id="search">
          <label for="user">Editar el usuario</label>
          <input type="text" id="user" name="user">
        </div>

        <div id="add">
          <button>añadir nuevo</button>
        </div>
      </div>
    </div> 
    `;
  }
}

customElements.define('candidate-component', CandidateComponent);
