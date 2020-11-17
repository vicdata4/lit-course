import { LitElement, html, css } from 'lit-element';

class HeaderPermissions extends LitElement {
  static get styles() {
    return [
      css`
        body {
          font-family: Roboto, 'Open Sans';
        }
        h1 {
          color: #23282d;
          font-size: 23px;
          font-weight: 400;
          margin: 0;
          padding: 9px 0 4px 0;
          line-height: 1.3;
          margin: -24px -24px 24px -24px !important;
          padding: 24px;
          background-color: #f6f6f6;
          border-bottom: solid 1px #e5e5e5;
          display: block;
          margin-bottom: 10%;
        }
      `,
    ];
  }

  render() {
    return html` <h1>Reporte de Permisos Detallado</h1> `;
  }
}
customElements.define('header-permissions', HeaderPermissions);
