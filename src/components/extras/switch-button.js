import { LitElement, html, css } from 'lit-element';

class Switchbutton extends LitElement {

    static get styles(){
        return css`
            :host {
                margin: auto;
            }

            .switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
                bottom: 4px;
            }
            
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
                border-radius: 34px;
                background-color: rgb(0 209 79);
            }
            
            .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
                border-radius: 34px;
            }
            
            input:checked + .slider {
                background-color: #2196F3;
            }
            
            input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
            }
            
            input:checked + .slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(26px);
            }
        `;
    }

    static get properties(){
        return {

        }
    }

    constructor(){
        super();
    }

    switcheo(ev){
        const evento = new CustomEvent('change', {
            detail: {
                valor: ev.target.checked
            }
        });

        this.dispatchEvent(evento);
    }

    render(){
        return html`
            <slot></slot>
            <label class="switch">
                <input @change="${this.switcheo}" type="checkbox" id="switchbutton">
                <span class="slider round"></span>
            </label>
        `;
    }

}

customElements.define('switch-button', Switchbutton);