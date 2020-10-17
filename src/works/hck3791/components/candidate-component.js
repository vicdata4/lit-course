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
      candidateToFind: { type: Array },
      foundCandidate: { type: Object },
      levels: { type: Array },
      profiles: { type: Array }
    };
  }

  constructor() {
    super();
    this.candidateToFind = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.params = getUrlParams('id');
    this.candidate = candidates[this.params - 1];
    this.levels = ['', 'A1', 'A2', 'B1', 'B1+', 'B2', 'B2+', 'C1', 'C2', 'C2+'];
    this.profiles = ['', 'Programmer', 'Arquitect', 'RRHH', 'Analyst'];
  }

  findCandidate(e) {
    const keyPushed = e.keyCode;
    const inputList = this.shadowRoot.querySelectorAll('input');
    const optionList = this.shadowRoot.querySelectorAll('select option');

    if (keyPushed >= 65 && keyPushed <= 90) {
      this.candidateToFind.push(e.key);
    } else if (keyPushed === 8) {
      this.candidateToFind.pop();
    } else if (keyPushed === 46) {
      const position = e.target.selectionStart;
      this.candidateToFind.splice(position, 1);
    }

    this.foundCandidate = candidates.find(obj => obj.name === this.candidateToFind.join(''));

    if (this.foundCandidate) {
      for (let i = 1; i < (inputList.length - 1); i++) {
        if (typeof (Object.values(this.foundCandidate)[i]) === 'boolean') {
          if (Object.values(this.foundCandidate)[i] === true) {
            inputList[i].setAttribute('checked', 'checked');
          } else {
            inputList[i].removeAttribute('checked');
          }
        } else {
          inputList[i].value = Object.values(this.foundCandidate)[i];
        }
      }

      for (let i = 0; i < optionList.length; i++) {
        if (optionList[i].value.toLowerCase() === this.foundCandidate.profile.toLowerCase()) {
          optionList[i].selected = 'selected';
        } else if (optionList[i].value.toLowerCase() === this.foundCandidate.language.toLowerCase()) {
          optionList[i].selected = 'selected';
        }
      }
    } else {
      this.shadowRoot.querySelector('form').reset();
      for (let i = 0; i < optionList.length; i++) {
        if (optionList[i].value === '') {
          optionList[i].selected = 'selected';
        }
      }
      this.shadowRoot.getElementById('onStaff').removeAttribute('checked');
    }
  }

  render() {
    return html`
    <div id="candidate-container">
      <div id="header">
        <div id="search">
          <label for="user">Editar el usuario</label>
          <input type="text" id="user" name="user" @keydown="${this.findCandidate}">
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
              <input type="text" id="name">
            </div>
            <div>
              <label for="email">Correo electrónico</label>
              <input type="email" id="email">
            </div>
            <div>
              <label for="age">Edad</label>
              <input type="text" id="age">
            </div>
            <div>
              <label for="phone">Teléfono</label>
              <input type="text" id="phone">
            </div>
            <div>
              <label for="location">Ubicación</label>
              <input type="text" id="location">
            </div>
            <div class="custom-select">
              <label for="profile">Perfil</label>
              <select id="profile">
                ${this.profiles.map(level => { return html`<option value='${level}'>${level}</option>`; })}
              </select>
            </div>
            <div>
              <label for="experience">Años de experiencia</label>
              <input type="text" id="experience">
            </div>
            <div>
              <label for="tags">Etiquetas</label>
              <input type="text" id="tags">
            </div>
            <div>
              <label for="salary">Expectativas salariales (K)</label>
              <input type="text" id="salary">
            </div>
            <div class="custom-checkbox">
              <label for="onStaff">En plantilla</label>
              <input type="checkbox" id="onStaff">
            </div>
            <div class="custom-select">
              <label for="language">Nivel de inglés</label>
              <select id="language">
                ${this.levels.map(level => { return html`<option value='${level}'>${level}</option>`; })}
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
