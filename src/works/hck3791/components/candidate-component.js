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
      params: { type: Array },
      candidateToFind: { type: Array },
      foundCandidate: { type: Object }
    };
  }

  constructor() {
    super();
    this.candidateToFind = [];
  }

  connectedCallback() {
    super.connectedCallback();
    const urlParams = new URLSearchParams(window.location.search);
    this.params = urlParams.get('id');
    this.candidate = candidates[this.params - 1];
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
        if (optionList[i].value === this.foundCandidate.profile.toLowerCase()) {
          optionList[i].selected = 'selected';
        } else if (optionList[i].value === this.foundCandidate.language.toLowerCase()) {
          optionList[i].selected = 'selected';
        }
      }
    } else {
      this.shadowRoot.querySelector('form').reset();
      for (let i = 0; i < optionList.length; i++) {
        if (optionList[i].value === 'default') {
          optionList[i].selected = 'selected';
        }
      }
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
                <option value="default"></option>
                <option value="programmer">Programmer</option>
                <option value="arquitect">Arquitect</option>
                <option value="rrhh">RRHH</option>
                <option value="analyst">Analyst</option>
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
