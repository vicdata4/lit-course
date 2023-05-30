import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { navigatorStyles } from '../utils/custom-styles';
import { styles } from '../utils/home-styles';

class Extras extends LitElement {
    
    static get styles() {
        return [commonStyles, navigatorStyles, styles, css`
            #hdos {
                border-radius: 15px;
                // border: 3px solid #2e0587;
                // background-color: #5017cb;
                // color: white;
                padding: 5px;
                margin: 20px 10px;
                text-align: center;
                font-weight: 200;
            }
        `];
    }

    constructor(){
        super();
    }

    render(){
        return html`
            <common-header></common-header>
            <navigation-wc></navigation-wc>
            <sub-navigation></sub-navigation>

            <div><h2 id="hdos">Página principal de extras</h2></div>
        `;
    }
}

customElements.define('extras-view', Extras);