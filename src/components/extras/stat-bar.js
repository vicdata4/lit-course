import { LitElement, html, css } from 'lit-element';

class StatBar extends LitElement {
  static get styles() {
    return css`
      .barraTotal {
        background-color: gray;
        border: 1px solid black;
        border-radius: 25px;
        position: relative;
        top: 3px;
        display: none;
      }

      .barraLlena {
        border: 1px solid black;
        border-radius: 25px;
        position: relative;
        top: 3px;
      }
    `;
  }

  static get properties() {
    return {
      widthBar: { type: Number },
      filled: { type: Number },
      heightBar: { type: Number },
    };
  }

  constructor() {
    super();
    this.widthBar = 250;
    this.heightBar = 15;
    this.filled = 5;
  }

  colorCalc() {
    let color = '';

    color += 'linear-gradient(to right, #000000, #ff0000';
    color += this.filled > 50 ? ', #ffff00' : '';
    color += this.filled > 100 ? ', #00ff00' : '';
    color += this.filled > 150 ? ', #0000ff' : '';
    color += this.filled > 200 ? ', #ffffff' : '';
    color += ')';

    return color;
  }

  render() {
    return html`
      <div>
        <div class="barraTotal" style="width: ${this.widthBar}px; height: ${this.heightBar}px;" id="widthBar">
          &nbsp;
        </div>
        <div
          class="barraLlena"
          style="width: ${this.filled}px; height: ${this.heightBar}px; background: ${this.colorCalc()};"
          id="filled"
        >
          &nbsp;
        </div>
      </div>
    `;
  }
}

customElements.define('stat-bar', StatBar);
