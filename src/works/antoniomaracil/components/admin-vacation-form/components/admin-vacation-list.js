import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { formatDate } from '../../../utils/functions';
import { empData } from './../../../utils/constants';

export class AdminVacationList extends LitElement {
  static get styles() {
    return css`
    .container {
      width: 100%;
      font-family: "Open Sans", sans-serif, Arial;
      letter-spacing: 0.4px;
    }
  
    .row > * {
      text-align: left;
      padding-right: 10px;
  
      height: 30px;
      line-height: 30px;   
    }
  
    .row > *, .status-container {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    .row.header {
        margin-bottom: 20px;
    }
  
    .row.header > * {
      letter-spacing: 1.2px;
      color: #959595;
    }
  
    .row {
      display: flex;
      flex-flow: row nowrap;
      border-bottom: 1px solid #ebebeb;
      padding: 10px 0px;
    }
  
    .row:first-child {
      border: none;
    }
  
    .clear-btn {
      padding: 0;
      border: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
    }
  
    .index {
      display: none;
      padding-left: 20px;
      color: #999999;
    }
  
    .name {
      width: 70%;
      color: #285659;
    }
  
    .applicationDate {
      display: none;
      width: 15%;
    }
  
    .endDate {
      display: none;
      width: 15%;
    }
  
    .light-grey {
      color: #747474;
    }
  
    .blue {
      color: #0589aa;
      text-decoration: none;
    }
  
    .yellow {
      color: #878943;
    }
  
    .startDate {
      width: 15%;
    }
  
    .status {
      width: 20%;
    }
  
    .status-container {
      display: block;
    }
  
    .row.data {
        margin-bottom: 40px;
    }
  
    .show-more-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin: 50px 0px;
    }
  
    .show-more {
        background-color: transparent;
        border: 1px solid grey;
        padding: 10px;
        outline: none;
        cursor: pointer;
    }
  
    .show-more:hover {
      background-color: #f1f1f1;
    }
  
    @media (min-width: 768px) {
      .name {
        width: 15%;
      }
  
      .startDate {
        width: 15%;
      }
  
      .index { 
        display: block;
        width: auto;
        min-width: 30px;
      }
  
      .applicationDate {
        display: block;
      }
  
      .endDate {
        display: block;
      }
  
      .status-container {
        display: none;
      }
  
      .row {
        padding: 20px 0px;
      }
  
      .row.header {
        margin-bottom: 0px;
      }
  
      .row.data {
        margin-bottom: 0px;
      }
  
      .row.data:hover {
        background-color: #f5f6f7;
      }
    }
  `;
  }

  static get properties() {
    return {
      list: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = empData;
  }

  render() {
    return this.list.length > 0 ? html`
          <div class="container">
            <div class="row header">
              <div class="name">Nombre</div>
              <div class="applicationDate">Fecha de solicitud</div>
              <div class="startDate">Fecha de inicio</div>
              <div class="endDate">Fecha de fin</div>
              <div class="status">Estado</div>
              <div class="status">Fecha de estado</div>
            </div>
            ${this.list.map((item, i) => html`
              <div class="status-container">
                <span class="blue">${item.name}</span> -
                <span class="light-grey">${formatDate(item.applicationDate)}</span>
              </div>
              <div class="row data">
                <div class="name">${item.name}</div>
                <div class="applicationDate light-grey">${formatDate(item.applicationDate)}</div>
                <div class="startDate yellow">${formatDate(item.startDate)}</div>
                <div class="endDate blue">${formatDate(item.endDate)}
                </div>
                <div class="status">
                <select id="sel-${item.id}"class="selectOptions">
                  <option value="0">Pendiente de aprobación</option>
                  <option value="1">Aprobado</option>
                  <option value="2">No aprobado</option>
                </select>
                </div>
                <div class="status">${formatDate(item.statusDate)}</div>
              </div>
            `)}
          </div>
          ${this.showMore ? html`
            <div class="show-more-container">
              <button @click="${this.showMoreNews}" class="show-more">Show more</button>
            </div>` : nothing}
          ` : nothing;
  }
}
customElements.define('admin-vacation-list', AdminVacationList);
