import { LitElement, html, css } from 'lit-element';

class RadioOptions extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: auto;
      }

      input[type='radio'] {
        display: none;
      }

      label {
        display: inline-block;
        padding: 6px;
        margin: 3px;
        background-color: #eee;
        border: 1px solid #ccc;
        border-radius: 10px;
        font-weight: bold;
      }

      input[type='radio']:checked + label {
        background-color: #007bff;
        color: #fff;
      }
    `;
  }

  static get properties() {
    return {
      radioOptions: { type: Array },
    };
  }

  constructor() {
    super();
    this.radioOptions = [];
  }

  changeRange(ev) {
    const changeEvent = new CustomEvent('change', {
      detail: {
        value: ev.target.value,
      },
    });

    this.dispatchEvent(changeEvent);
  }

  render() {
    return html`
      ${this.radioOptions.map((item, i) =>
        i === 0
          ? html`
              <div>
                <input
                  @change="${this.changeRange}"
                  type="radio"
                  name="radioInputs"
                  id="rad_opt_${i}"
                  value="${item.value}"
                  checked
                />
                <label for="rad_opt_${i}">${item.name}</label>
              </div>
            `
          : html`
              <div>
                <input
                  @change="${this.changeRange}"
                  type="radio"
                  name="radioInputs"
                  id="rad_opt_${i}"
                  value="${item.value}"
                />
                <label for="rad_opt_${i}">${item.name}</label>
              </div>
            `,
      )}
    `;
  }
}

customElements.define('radio-options', RadioOptions);
