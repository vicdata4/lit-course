import { LitElement, html } from 'lit-element';

class  SolicitudList extends LitElement {
  static get properties() {
    return {
      list: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  deleteItem(i) {
    const event = new CustomEvent('delete-event', {
      detail: {
        index: i
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
    <head>
        <!-- iconos: fontawesone -->
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
       <!-- Bootstrap CSS -->
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      <style>
        * {
            box-sizing: border-box;
        }
    
        .btn-wrp {
            border: 1px solid #dadada;
            display: inline-block;
            width: 100%;
            position: relative;
            z-index: 10;
        }
    
        .btn-clck {
            border: none;
            background: transparent;
            width: 100%;
            padding: 8px;
        }
    
        .btn-clck::-webkit-calendar-picker-indicator {
            right: -10px;
            position: absolute;
            width: 58px;
            height: 30px;
            color: rgba(204, 204, 204, 0);
            opacity: 0
        }
    
        .btn-clck::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        .btn-clck::-webkit-clear-button {
            margin-right:75px;
        }
        .bton {
            height: 100%;
            background: #efe;
            border: none;
            color: #555;
            position: absolute;
            right: 0;
            top: 0;
        }
        .contFechas{
          display:inline-flex;
        }
        .dias{
          color: green;
          font-size: 1.15em;
          margin-left: 10px;
          margin-right: 10px;
        }
        .exmp-wrp {
            margin-top: 0px;
            position: relative;
            width: 155px;
        }
        label {
          font-size: 1.3em;
          font-weight: bold;
          margin-left: 25px;
          margin-right: 5px;
        }
        table{
          margin-top: 40px;
        }
      </style> 
    </head>
      <table id="tabla" class="table table-striped">
        ${this.list.map((item, i) => {
          return html`<td>${item} <button @click="${() => this.deleteItem(i)}">&times;</button></td>`;
        })}
      </table>
    `;
  }
}

window.customElements.define('solicitud-list', SolicitudList);
