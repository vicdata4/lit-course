import { LitElement, html } from 'lit-element';
import { candidateStyles } from '../styles/candidateStyles';
import { candidates } from '../resources/cand';
import { getUrlParams } from '../resources/functions';

class CandidateComponent extends LitElement {
  static get styles() {
    return [
      candidateStyles
    ];
  }

  static get properties() {
    return {
      candidate: { type: Object },
      params: { type: Array },
      levels: { type: Array },
      profiles: { type: Array }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.params = getUrlParams('id');
    this.candidate = candidates[this.params - 1];
    this.levels = ['', 'A1', 'A2', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C2', 'C2+'];
    this.profiles = ['', 'Programmer', 'Arquitect', 'RRHH', 'Analyst'];
  }

  render() {
    return html`
    <div id="candidate-container">
      <div id="header">
        <div id="search">
          <label for="user">Editar el usuario</label>
          <input type="text" id="user" name="user" .value="${this.candidate.name}">
        </div>
        <div id="add">
          <button>añadir nuevo</button>
        </div>
      </div>
      <div id="body">
        <hr>
        <section>
          <form action="" method="">
            <h5>Información del candidato</h5>
            <div>
              <label for="name">Nombre completo</label>
              <input type="text" id="name" .value="${this.candidate.name}">
            </div>
            <div>
              <label for="email">Correo electrónico</label>
              <input type="email" id="email" id="$1" .value="${this.candidate.email}">
            </div>
            <div>
              <label for="age">Edad</label>
              <input type="text" id="age" .value="${this.candidate.age}">
            </div>
            <div>
              <label for="phone">Teléfono</label>
              <input type="text" id="phone" .value="${this.candidate.phone}">
            </div>
            <div>
              <label for="location">Ubicación</label>
              <input type="text" id="location" .value="${this.candidate.location}">
            </div>
            <div class="custom-select">
              <label for="profile">Perfil</label>
              <select id="profile">
                ${this.profiles.map(profile => { return html`<option value='${profile}' ?selected="${profile === this.candidate.profile}">${profile}</option>`; })}
              </select>
            </div>
            <div>
              <label for="experience">Años de experiencia</label>
              <input type="text" id="experience" .value="${this.candidate.experience}">
            </div>
            <div>
              <label for="tags">Etiquetas</label>
              <input type="text" id="tags" .value="${this.candidate.tags.join(', ')}">
            </div>
            <div>
              <label for="salary">Expectativas salariales (K)</label>
              <input type="text" id="salary" .value="${this.candidate.salary}">
            </div>
            <div class="custom-checkbox">
              <label for="onStaff">En plantilla</label>
              <input type="checkbox" id="onStaff" ?checked="${this.candidate.onStaff ? 'checked' : ''}">
            </div>
            <div class="custom-select">
              <label for="language">Nivel de inglés</label>
              <select id="language">
                ${this.levels.map(level => { return html`<option value='${level}' ?selected=${level === this.candidate.language}>${level}</option>`; })}
              </select>
            </div>
            <div>
              <label for="cv">Subir CV</label>
              <input type="file" id="custom-input-file">
            </div>
          </form>
        </section>
      </div>
    </div> 
    `;
  }
}

customElements.define('candidate-component', CandidateComponent);
