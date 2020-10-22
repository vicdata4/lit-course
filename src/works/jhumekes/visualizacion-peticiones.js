import { LitElement, html } from 'lit-element';
import { peticiones } from './peticiones';
import { peticionesCSS } from './styles/peticionesCSS';
export class VisualizacionPeticiones extends LitElement {

    static get styles(){
        return[
            peticionesCSS
        ];
    }
   
    static get properties(){
        return{
            data:{type:Array}
        };
    }
    constructor() {
        super();
        this.data = peticiones;
        const params = new URLSearchParams(window.location.search);
    }
    render() {
        return html`
        <section>
            <table>
                <caption>Lista de peticiones</caption>
                <thead>
                    <tr><td>Título</td><td>Fecha de Publicación</td></tr>
                </thead>
                <tbody>
                ${this.data.map(peticiones => {return html`<tr><td><a href="/descripcion-peticiones?id=${peticiones.id}">${peticiones.Titulo}</a></td><td>${peticiones.FechaPublicacion}</td></tr>`})}
                </tbody>
            </table>
        </section>
        `;
    }
}
customElements.define('visualizacion-peticiones', VisualizacionPeticiones); 