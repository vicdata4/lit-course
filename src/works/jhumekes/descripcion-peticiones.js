import { LitElement, html } from 'lit-element';
import {peticiones} from './peticiones';
import { peticionesCSS } from './styles/peticionesCSS';
export class DescripcionPeticiones extends LitElement {

    static get styles(){
        return[
            peticionesCSS
        ];
    }

    static get properties(){
        return{
            desc:{type:Array},
            id:{type:Number},
            peticiones:{type:Object}
        };
    }

    constructor(){
        super();
        this.desc=peticiones;
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        this.peticiones = peticiones[id-1];
    }

    render() {
        return html`
        <div id ='divdesc'>
            <section>
                <div id = 'titulo'>
                    <h2>Título:${this.peticiones.Titulo}</h2>
                    <h2>Fecha de publicacion: ${this.peticiones.FechaPublicacion}</h2>
                </div>
                <div>
                    <h2>Descripción:</h2>
                    <div>
                        <p>Requisitos:</p>
                        <p>${this.peticiones.Descripcion[0]}</p>
                        <p>Lugar de trabajo:${this.peticiones.Descripcion[1]}</p>
                        <p>Actividades:</p>
                        <p>${this.peticiones.Descripcion[2]}</p>
                    </div>
                </div>
            </section>
        </div>
        `;
    }
}

customElements.define('descripcion-peticiones', DescripcionPeticiones);