import { LitElement, html, css } from 'lit-element';

class PagNav extends LitElement {

    static get styles(){
        return css`
            :host {
                margin: 0 70px;
            }

            #pagNav {
                display: flex;
                justify-content: center;
                flex-wrap: wrap
            }

            a {
                margin: 0 3px;
            }

            .visible {
                visibility: visible;
            }

            .oculto {
                visibility: hidden;
            }
        `;
    }

    static get properties() {
        return {
            nPags: { type: Number },
        }
    }

    constructor() {
        super();
        this.nPags = 1;
    }

    buscaPag(ev) {
        const event = new CustomEvent('href-event', {
            detail: {
                url: ev.target.textContent
            }
        });
        
        this.dispatchEvent(event);
    }

    render() {
        return html`
            <div id="pagNav" class=${this.nPags != 1 ? 'visible' : 'oculto' }>
                ${Array.from({ length: this.nPags }).map((_, i) => html`
                    ${i != 0 ? ' - ' : ''}
                    <a @click="${this.buscaPag}" href="javascript:void(0)">${i + 1}</a>
                `)}
            </div>
        `;
    }
}

customElements.define('pag-nav', PagNav);