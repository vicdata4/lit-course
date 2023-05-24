import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../utils/custom-styles';
import { store } from '../store/store';
import { styles } from '../utils/home-styles';
import { connect } from 'pwa-helpers';
import '../components/input-form';
import '../components/list-component';
import '../components/navigation/navigation-wc.js';

// eslint-disable-next-line no-unused-vars
import { addNote, deleteNote } from '../store/actions/notes.actions.js';

class DataBinding extends connect(store)(LitElement) {
  static get styles() {
    return [styles, commonStyles, css`
    
      .card-container {
        display: flex;
        flex-flow: row;
      }

      .card {
        background-color: #ededed;
        height: 100%;
        width: 200px;
        cursor: pointer;
        display: flex;
        overflow: hidden;
      }
      
      .card-box {
        position: relative;
        margin: 10px;
      }
      
      img {
        width: 100%;
        transition: all .5s;
      }

      .overlay {
        opacity: 0;
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        background-color: #00000078;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .5s;
      }

      .card:hover img {
        transform: scale(1.2);
      }
      
      .card:hover .overlay {
        opacity: 1;
      }
    `];
  }

  static get properties() {
    return {
      messageList: { type: Array },
      cardList: { type: Array },
    };
  }

  constructor() {
    super();
    this.cardList = [
      {
        title: 'The Matrix Reloaded',
        photo: 'https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
      },
      {
        title: 'Making The Matrix',
        photo: 'https://m.media-amazon.com/images/M/MV5BMWRhNGY3NGQtMDAxMS00YjY2LTgzOTUtZjljZmUyYWQwMGI2XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_SX300.jpg'
      },
      {
        title: 'The Matrix: Path of Neo',
        photo: 'https://m.media-amazon.com/images/M/MV5BZGFiNGU4MjEtODM2ZC00OTg0LThkNmEtZTBlN2FkMmFjOWYzXkEyXkFqcGdeQXVyNTEwNDY2MjU@._V1_SX300.jpg'
      }
    ]
  }

  addMessage(e) {
    this.messageList = [...this.messageList, e.detail];
    // store.dispatch(addNote(e.detail));
  }

  deleteMessage(e) {
    this.messageList = this.messageList.filter((x, i) => i !== e.detail.index);
    // store.dispatch(deleteNote(e.detail.index));
  }

  stateChanged(state) {
    this.messageList = state.notes.list;
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <section class="container">
        <div class="card-container">

          ${this.cardList.map(x => html`

          <div class="card-box">
            <div class="card">
              <img src="${x.photo}">
              <div class="overlay">
                ${x.title}
              </div>
            </div>

          </div>
          `)}
        </div>
      </section>
    `;
  }
}

window.customElements.define('data-binding', DataBinding);
