import {LitElement, html} from 'lit-element';

export default class ElementTrello007 extends LitElement {

    static get properties() {
        return {
          listaPeticion: {type: Array},
          peticionDatos : {type: Object}
        }
      }
      
    constructor() {
        super();
        this.peticionDatos = {};
        this.listaPeticion = [];
        this.addPeticion = this.addPeticion.bind(this);
    }

    addPeticion(){
          let storedPeticion = JSON.parse(window.localStorage.getItem('list-peticion'));
          storedPeticion = storedPeticion === null ? [] : storedPeticion;
          console.log(storedPeticion);

          const inputTitulo = this.shadowRoot.querySelector('#peticionTitulo');
          const inputDescripcion = this.shadowRoot.querySelector('#peticionDescripcion');
          const inputPublicar = this.shadowRoot.querySelector('#peticionPublicar');
          const fechaPublicacion = new Date();

          storedPeticion.push({
            id: new Date().valueOf(),
            titulo: inputTitulo.value,
            descripcion: inputDescripcion.value,
            fecha: (fechaPublicacion.getDate() + "/" + (fechaPublicacion.getMonth() +1) + "/" +  fechaPublicacion.getFullYear()),
            publicar: inputPublicar.checked 
          });

          localStorage.setItem('list-peticion', JSON.stringify(storedPeticion));
          this.listaPeticion = [...[storedPeticion], ...this.listaPeticion];

          this.dispatchEvent(new CustomEvent('addPeticion', { bubbles: true, composed: true, detail: { listaPeticion: storedPeticion } }));
          
    }   
    

    render() {
        return html`
          <div class="form-group titulo">
              <label for="peticionTitulo">TITULO DE LA PETICIÓN: </label>
              <input type="text" id="peticionTitulo" name="peticionTitulo" placeholder="TITULO DE LA PETICIÓN" @keyup="${this.change}">
              <br>
            <div class="form-group descripcion">
                <textarea id="peticionDescripcion" name="peticionDescripcion" rows="4" cols="50" placeholder="Descripcion" @keyup="${this.change}"></textarea>
            </div>
              <br>
                <input type="checkbox" id="peticionPublicar">
                <label for="peticionPublicar">PUBLICAR</label>
              <br>
              <button @click="${() => this.addPeticion()}">enviar</button>
          </div>
        `;
    }
}

window.customElements.define('element-007', ElementTrello007);