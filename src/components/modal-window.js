import { LitElement, html, css } from 'lit-element';

class ModalWindow extends LitElement {

    static get styles(){
        return css`
            :host {
                --transition-time: .2s;
                --modal-backdrop: rgba(0, 0, 0, 0.5);
            }
    
            .modal {
                position: fixed;
                z-index: 999;
                background-color: var(--modal-backdrop);
                top: -10px;
                left: 0;
                width: 100%;
                height: 100%;
                padding: 20px;
            
                display: flex;
                justify-content: center;
                align-items: center;
                
                visibility: hidden;
                opacity: 0;
                transition:
                visibility var(--transition-time),
                opacity var(--transition-time);
            }
        
            .content {
                width: 100%;
                height: auto;
                
                background-color: white;
                text-align: center;
                padding: 40px 40px 0px 40px;
                font-size: 16px;
                overflow: hidden;
                
                margin-top: -50px;
                transition: margin-top 0.5s;
            }
        
            .open {
                visibility: visible;
                opacity: 1;
            }
            
            .open > .content {
                margin: 0px;
            }
            
            .text {
                margin-bottom: 20px;
                padding: 10px;
                border: 2px solid black;
                border-radius: 25px;
                box-shadow: 0 2px 14px rgba(0, 0, 0, 0.7);
            }
            
            @media (min-width: 800px) {
                .content {
                width: 50%;
                }
            }

            #botAcept, #botCancel {
                padding: 12px 35px;
                border-radius: 15px;
                margin: 20px 0;
            }

            #botAcept {

            }

            #botCancel {
                
            }
        `;
    }

    static get properties() {
        return {
            
        }
    }

    constructor() {
        super();
    }

    closeModal() {
        const modal = this.shadowRoot.querySelector('.modal');
        modal.classList.remove('open');
    }
  
    openModal(){
        const modal = this.shadowRoot.querySelector('.modal');
        modal.classList.add('open');
    }

    render() {
        return html`
            <div class="modal">
                <div class="content">
                    <div class="text">
                        <slot></slot>
                    </div>
                    <button id="botAcept" @click="${()=>this.closeModal()}">
                        Accept
                    </button>
                    <button id="botCancel" @click="${()=>this.closeModal()}">
                        Cancel
                    </button>                    
                </div>
            </div>
        `;
    }
}

customElements.define('modal-window', ModalWindow);