import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import '../extras/vistas-api/api-mtg';
import '../extras/vistas-api/api-pok';
import '../extras/vistas-api/api-omd';
import '../modal-window';

class ImgComp extends LitElement {

    static get styles(){
        return css`

        `;
    }

    static get properties(){
        return {
            resultados: { type: Array},
            cardStyle: { type: Boolean },
            category: { type: String },
        }
    }

    constructor() {
        super();
        this.resultados = [];
        this.cardStyle = false;
        this.category = "";
    }
    
    render(){
        if(this.resultados != ""){
            if(this.category == "mtg"){
                return html`
                    <api-mtg .hits="${this.resultados}" .cardStyle="${this.cardStyle}"></api-mtg>
                `;
            }else if(this.category == "pok"){
                return html`
                    <api-pok .hits="${this.resultados}"></api-pok>
                `;
            }else if (this.category == "mov"){
                return html`
                    <api-omd .hits="${this.resultados}"></api-omd>
                `;
            }
        }else{
            nothing;
        };
    }
}

customElements.define('img-comp', ImgComp);