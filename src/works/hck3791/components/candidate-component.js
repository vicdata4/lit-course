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
      candidate: { type: Object },
      params: { type: Array }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    this.params = urlParams.get('id');
    this.candidate = candidates[this.params - 1];
  }

  firstUpdated() {
    const optionsProfile = this.shadowRoot.querySelectorAll('#profile option');
    const optionsLanguage = this.shadowRoot.querySelectorAll('#language option');

    for (let i = 0; i < optionsProfile.length; i++) {
      if (optionsProfile[i].getAttribute('value') === this.candidate.profile.toLowerCase()) {
        optionsProfile[i].setAttribute('selected', true);
      }
    }

    for (let i = 0; i < optionsLanguage.length; i++) {
      if (optionsLanguage[i].getAttribute('value') === this.candidate.language.toLowerCase()) {
        optionsLanguage[i].setAttribute('selected', true);
      }
    }
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
      <div id="body">
        <hr>
        <section action="" method="">
          <form>
            <h5>Información del candidato</h5>
            <div>
              <label for="name">Nombre completo</label>
              <input type="text" id="name" value="${this.candidate.name}">
            </div>
            <div>
              <label for="email">Correo electrónico</label>
              <input type="email" value="${this.candidate.email}">
            </div>
            <div>
              <label for="age">Edad</label>
              <input type="text" id="age" value="${this.candidate.age}">
            </div>
            <div>
              <label for="phone">Teléfono</label>
              <input type="text" id="phone" value="${this.candidate.phone}">
            </div>
            <div>
              <label for="location">Ubicación</label>
              <input type="text" id="location" value="${this.candidate.location}">
            </div>
            <div class="custom-select">
              <label for="profile">Perfil</label>
              <select id="profile">
                <option value="default"></option>
                <option value="programmer">Programmer</option>
                <option value="arquitect">Arquitect</option>
                <option value="rrhh">RRHH</option>
                <option value="analyst">Analyst</option>
              </select>
            </div>
            <div>
              <label for="experience">Años de experiencia</label>
              <input type="text" id="experience" value="${this.candidate.experience}">
            </div>
            <div>
              <label for="tags">Etiquetas</label>
              <input type="text" id="tags" value="${this.candidate.tags}">
            </div>
            <div>
              <label for="salary">Expectativas salariales (K)</label>
              <input type="text" value="${this.candidate.salary}">
            </div>
            <div class="custom-checkbox">
              <label for="onStaff">En plantilla</label>
              <input type="checkbox" id="onStaff" ?checked="${(this.candidate.onStaff) ? 'checked' : ''}">
            </div>
            <div class="custom-select">
              <label for="language">Nivel de inglés</label>
              <select id="language">
                <option value="0"></option>
                <option value="a1">A1</option>
                <option value="a2">A2</option>
                <option value="b1">B1</option>
                <option value="b1+">B1+</option>
                <option value="b2">B2</option>
                <option value="b2+">B2+</option>
                <option value="c1">C1</option>
                <option value="c2">C2</option>
                <option value="c2+">C2+</option>
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
