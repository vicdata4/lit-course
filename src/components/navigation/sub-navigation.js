import { LitElement, html, css } from 'lit-element';
import { subNavList } from '../../utils/constants';
// import { navigationStyles, transition } from './styles';
// import { material } from '../../utils/fonts';

class SubNavigation extends LitElement {

    static get styles() {
        return [css`
            :host {
                background-color: #99d1d1;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;              
            }

            #nv {
                align-items: center;
                justify-content: center;
            }

            .miClass {
                display: flex;
                list-style: none;
                align-items: center;
                justify-content: center;
            }

            .miClass2 {
                margin: 0 10px;
                list-style: none;
            }

            .miClass a {
                text-decoration: none;
                color: rgb(66, 66, 66);
            }
              
        `];
    }

    constructor(){
        super();
    }

    render() {
        return html`
            <div id="nv">
                <ul class="miClass">
                    ${subNavList.map((item) => html`
                        <li class="miClass2">
                            <a href="${item.path}" class="">${item.name}</a>
                        </li>
                    `)}
                </ul>
            </div>
        `;
    }
}

customElements.define('sub-navigation', SubNavigation);