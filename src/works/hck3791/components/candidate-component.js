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
      candidates: { type: Array },
      params: { type: Array }
    };
  }

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    this.params = urlParams.get('id');
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
              <input type="text" id="name">
            </div>
            <div>
              <label for="email">Correo electrónico</label>
              <input type="email">
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
                <option value="0"></option>
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
              <input type="text">
            </div>
            <div class="custom-checkbox">
              <label for="onStaff">En plantilla</label>
              <input type="checkbox" id="onStaff">
            </div>
            <div class="custom-select">
              <label for="language">Nivel de inglés</label>
              <select id="language">
                <option value="0"></option>
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
