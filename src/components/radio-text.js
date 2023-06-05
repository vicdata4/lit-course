import { LitElement, html, css } from 'lit-element';

class RadioText extends LitElement {
  static get styles() {
    return css`
      .radioInputs,
      .checkInputs {
        display: inline-block;
        margin: 20px;
      }

      button {
        display: block;
      }

      .custom-bold {
        font-weight: bold;
      }

      .custom-italic {
        font-style: italic;
      }

      .custom-underline {
        text-decoration: underline;
      }
    `;
  }

  static get properties() {
    return {
      color: { type: String },
      optionsBox: { type: Array },
      selectedClass: { type: String },
    };
  }

  constructor() {
    super();
    this.color = '#000000';
    this.optionsBox = [
      { nombre: 'Negrita', valor: false },
      { nombre: 'Cursiva', valor: false },
      { nombre: 'Subrayada', valor: false },
    ];
    this.selectedClass = '';
  }

  cambiaColor(ev) {
    ev.preventDefault();
    const colores = this.shadowRoot.querySelectorAll('.inputColor');

    for (const color of colores) {
      if (color.checked) {
        this.color = color.value;
      }
    }
  }

  markedBox(ev) {
    this.selectedClass = '';

    if (ev.detail.nombre === 'Negrita') {
      this.optionsBox[0].valor = !this.optionsBox[0].valor;
    }

    if (ev.detail.nombre === 'Cursiva') {
      this.optionsBox[1].valor = !this.optionsBox[1].valor;
    }

    if (ev.detail.nombre === 'Subrayada') {
      this.optionsBox[2].valor = !this.optionsBox[2].valor;
    }

    this.selectedClass += this.optionsBox[0].valor ? ' custom-bold' : '';
    this.selectedClass += this.optionsBox[1].valor ? ' custom-italic' : '';
    this.selectedClass += this.optionsBox[2].valor ? ' custom-underline' : '';
  }

  render() {
    return html`
      <form @submit="${this.cambiaColor}" id="formulario">
        <div class="radioInputs">
          <input type="radio" class="inputColor" name="colores" id="inputnegro" value="#000000" />
          <label for="negro">Negro</label><br />

          <input type="radio" class="inputColor" name="colores" id="inputrojo" value="red" />
          <label for="rojo">Rojo</label><br />

          <input type="radio" class="inputColor" name="colores" id="inputverde" value="green" checked />
          <label for="verde">Verde</label><br />

          <input type="radio" class="inputColor" name="colores" id="inputazul" value="blue" />
          <label for="azul">Azul</label><br />
        </div>
        <button type="submit" id="boton">Cambiar fuente</button>
      </form>

      <div style="margin: 20px 0">
        <check-boxes @box-event="${this.markedBox}" .boxOptions="${this.optionsBox}"></check-boxes>
      </div>

      <p id="texto" style="color: ${this.color}" class="${this.selectedClass}">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </p>
    `;
  }
}

customElements.define('radio-text', RadioText);
