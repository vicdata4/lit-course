import { LitElement, html, css } from 'lit-element';

class CommonHeader extends LitElement {
  static get styles() {
    return css`
      :host {
        --dark-color: #3c3b3b;
      }

      header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 30px;
        color: white;
        background-color: var(--dark-color);
      }

      .logo {
        width: 50px;
      }

      .title {
        margin: 0;
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <header>
         <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
      <!-- iconos: fontawesone -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
        <a href="/"><img class="logo" src="/assets/images/polymer.png"></a>
      </header>
    `;
  }
}

window.customElements.define('common-header', CommonHeader);
