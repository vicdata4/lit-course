import { LitElement, html } from 'lit-element';

class CheckBoxes extends LitElement {
  static get properties() {
    return {
      boxOptions: { type: Array },
    };
  }

  constructor() {
    super();
    this.boxOptions = [];
  }

  cambioCheckbox(ev) {
    const event = new CustomEvent('box-event', {
      detail: {
        nombre: ev.target.value,
      },
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`
      ${this.boxOptions.map(
        (item, i) => html`
          <input
            type="checkbox"
            @change="${this.cambioCheckbox}"
            id="checkbox_${i}"
            name="opciones"
            value="${item.nombre}"
          />
          <label for="checkbox_${i}">${item.nombre}</label><br />
        `,
      )}
    `;
  }
}

customElements.define('check-boxes', CheckBoxes);
