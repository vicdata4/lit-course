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
  
    .name {
      width: 50%;
      color: #285659;
    }

    .statusDate{
      display: none;
      width: 20%;
    }

    .status{
      width: 50%;
    }
  
    .applicationDate {
      display: none;
      width: 20%;
    }

    .startDate {
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
  
    .date {
      width: 10%;
    }
  
    .date-container {
      display: block;
    }
  
    .row.data {
        margin-bottom: 20px;
    }
  
  
    @media (min-width: 768px) {
      .name {
        width: 15%;
      }
  
      .startDate {
        width: 20%;
      }
  
      .index { 
        display: block;
        width: auto;
        min-width: 30px;
      }
  
      .applicationDate {
        display: block;
      }
      
      .startDate {
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
              <div class="statusDate">Fecha de estado</div>
            </div>

            ${this.list.map((item, i) => html`
              <div class="date-container">
                <span class="blue">${formatDate(item.startDate)}</span> -
                <span class="light-grey">${formatDate(item.endDate)}</span>
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

              <div class="statusDate">${formatDate(item.statusDate)}</div>
              
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
