import { LitElement, css, html } from 'lit-element';

export class SolicitudVacaciones extends LitElement {

    static get styles() {
        return css`
        .menu-list {
            margin: auto;
            width: 90%;
        }
        table{
            align-items: center;
            margin-left: auto;
            margin-right: auto;
        }
        table, td, tr {
            border: 1px solid black;
        }
        td {
            padding:0.5em;
        }
        .trGris {
            background-color: #EEEEEE;
            color: BLACK;
        }

        @media (min-width: 768px) {
            .table {
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
            }
        `;
    }

    static get properties() {
        return {
            table  : { type:Array },
            aproved : {type: String},
            asc : {type: Boolean}
        };
    }
    
    constructor() {
        super();
        this.table=[];
        this.aproved  = 'Pendiente  de aprobación';
        this.asc = true;
    };

    
    add(){
        const input1 = new Date();
        const input2= this.shadowRoot.querySelector('#start');
        const input3 = this.shadowRoot.querySelector('#end');
        const  item  =  {
            request: input1.getDate()+  '/'+ (input1.getMonth()+1)+  '/'  + input1.getFullYear(),
            start: input2.value,
            finish: input3.value,
            aproved :  this.aproved
        }
        this.table =  [...[item],  ...this.table];
    }

    sortStart(){
        if ( this.asc == true ) {
            const fechas = this.table;
            fechas.sort(function (a, b) {
            if (a.start > b.start) {
                return 1;
            }
            if (a.start < b.start) {
                return -1;
            }
            return 0;
            });
            this.table =  [...fechas];
            this.asc = !this.asc;
        } else {
            const fechas = this.table;
            fechas.sort(function (a, b) {
            if (a.start < b.start) {
                return 1;
            }
            if (a.start > b.start) {
                return -1;
            }
            return 0;
        });
        this.table =  [...fechas];
        this.asc = !this.asc;
        }   
    }

    sortEnd(){
        if ( this.asc == true ) {
            const fechas = this.table;
            fechas.sort(function (a, b) {
            if (a.finish > b.finish) {
                return 1;
            }
            if (a.finish < b.finish) {
                return -1;
            }
            return 0;
            });
            this.table =  [...fechas];
            this.asc = !this.asc;
        } else {
            const fechas = this.table;
            fechas.sort(function (a, b) {
            if (a.finish < b.finish) {
                return 1;
            }
            if (a.finish > b.finish) {
                return -1;
            }
            return 0;
        });
        this.table =  [...fechas];
        this.asc = !this.asc;
        } 
    }

    sortRequest(){
        if ( this.asc == true ) {
            const fechas = this.table;
            fechas.sort(function (a, b) {
            if (a.request > b.request) {
                return 1;
            }
            if (a.request < b.request) {
                return -1;
            }
            return 0;
            });
            this.table =  [...fechas];
            this.asc = !this.asc;
        } else {
            const fechas = this.table;
            fechas.sort(function (a, b) {
            if (a.request < b.request) {
                return 1;
            }
            if (a.request > b.request) {
                return -1;
            }
            return 0;
        });
        this.table =  [...fechas];
        this.asc = !this.asc;
        } 
    }
    
    deleteItem(index) {
        const array = this.table;
        if ( this.table[index].aproved === 'Pendiente  de aprobación') {
            array.splice(index, 1);
            this.table = [...array];
        }  else {
            alert ('Operación imposible. Solicitud ya aceptada.')
        }
    }

    render() {
        return html`
        <div class="menu-list">
        <h2 title="Solicitud de vacaciones">Solicitud de vacaciones</h2>
            <p> 
                Fecha Inicio <input type="date" id="start" min="2020-01-01" max="2021-12-31">
                Fecha Fin <input type="date" id="end" min="2020-01-01" max="2021-12-31"> 
                <button @click="${this.add}">Agregar</button>
            </p>
            <table>
                <tr>
                    <td> Fecha de Solicitud <button @click="${() => this.sortRequest()}">Ordenar</button></td>
                    <td> Fecha de Inicio  <button @click="${() => this.sortStart()}">Ordenar</button></td>
                    <td> Fecha de Fin  <button @click="${() => this.sortEnd()}">Ordenar</button></td>
                    <td> Estado de la solicitud </td>
                    <td> Fecha de estado  </td>
                    <td> Eliminar </td>
                </tr>
                ${this.table.map((item,i) => html `
                <tr class="trGris">
                    <td>${item.request}</td>
                    <td>${item.start}</td>
                    <td>${item.finish}</td>
                    <td>${item.aproved}</td>
                    <td>${item.request}</td>
                    <td><button @click="${() => this.deleteItem(i)}">&times;</button></td>
                </tr>
                    `)}
            </table>
        </div>
        `;
    }
}
customElements.define('solicitud-vacaciones', SolicitudVacaciones);