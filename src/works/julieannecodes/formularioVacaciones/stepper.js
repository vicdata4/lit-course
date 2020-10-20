import { LitElement, html } from 'lit-element';
import { stepperStyles, mediaQueries } from '../utils/custom-styles';

class Stepper extends LitElement {
  static get styles() {
    return [stepperStyles, mediaQueries];
  }

  static get properties() {
    return {
      nEmployees: { type: Number },
      steps: { type: Array },
      from: { type: Number, attribute: false },
      index: { type: Number },
      to: { type: Number, attribute: false },
      listLength: { type: Number },
      stepB: { type: Number }
    };
  }

  constructor() {
    super();
    this.steps = [];
    this.nEmployees = 2;
    this.from = 0;
    this.index = 0;
    this.to = this.nEmployees;
    this.listLength = 0;
    this.stepB = 0;
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.bSteps').forEach(cButton => {
      if (parseInt(cButton.id) === index) {
        cButton.classList.add('selected');
      } else {
        cButton.classList.remove('selected');
      }
    });
  }

  showPartOf(index) {
    this.index = index;
    this.from = this.nEmployees * this.index;
    this.to = this.from + this.nEmployees;

    this.setActiveStep(index);
    const event = new CustomEvent('interval-values', {
      detail: {
        values: [this.from, this.to]
      }
    });
    this.dispatchEvent(event);
  }

  prevOrNext(e) {
    if (e.target.id === 'leftB' && this.index > 0) {
      this.index -= 1;
    }
    if (e.target.id === 'rightB' && this.index < this.steps.length - 1) {
      this.index += 1;
    }
    this.showPartOf(this.index);
  }

  async firstUpdated() {
    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  render() {
    const nPages = Math.ceil(this.listLength / this.nEmployees);
    this.steps = new Array(nPages).fill({});
    return html`
        <div class="stepper">
            <button class="left" id="leftB" @click="${this.prevOrNext}">&#x25C0;</button>
            ${this.steps.map((step, i) => html`<button id="${i}" class="bSteps" @click="${() => this.showPartOf(i)}">${i + 1}</button>`)}
            <button class="right" id="rightB" @click="${this.prevOrNext}">&#x25BA;</button>
       </div>
      `;
  }
}
window.customElements.define('stepper-component', Stepper);
