/* eslint-disable no-console */
import { LitElement, html, css } from 'lit-element';
import { styles } from '../utils/home-styles';
import { commonStyles, navigatorStyles } from '../utils/custom-styles';

import { navigationStyles } from '../components/navigation/styles';
import '../components/common-header.js';
import '../components/navigation/navigation-wc.js';
import '../components/navigation/sub-navigation.js';
import '../components/form-validation.js';
import '../components/extras/img-comp.js';
import '../components/extras/input-text.js';
import '../components/extras/switch-button.js';
import '../components/extras/radio-options.js';
import '../components/extras/stat-bar.js';

class ExtrasViewAPI extends LitElement {
  static get styles() {
    return [
      styles,
      commonStyles,
      navigatorStyles,
      navigationStyles,
      css`
        #sub-container {
          display: flex;
          justify-content: center;
        }
      `,
    ];
  }

  static get properties() {
    return {
      cardStyle: { type: Boolean },
      hits: { type: Array },
      optionsList: { type: Array },
      searchValue: { type: String },
    };
  }

  constructor() {
    super();
    this.cardStyle = false;
    this.hits = [];
    this.optionsList = [
      { value: 'mtg', name: 'Magic the Gathering', url: 'https://api.magicthegathering.io/v1/cards?name=' },
      {
        value: 'lol',
        name: 'League of Legends',
        url: 'http://ddragon.leagueoflegends.com/cdn/13.9.1/data/es_ES/champion/',
      },
      { value: 'pok', name: 'Pokemon', url: 'https://pokeapi.co/api/v2/pokemon/' },
    ];
    this.searchValue = this.optionsList[0].value;
  }

  async consulta(ev) {
    let urlBusqueda;

    this.optionsList.map((item) => {
      if (item.value === this.searchValue) {
        urlBusqueda = item.url;
      }
    });

    urlBusqueda += ev.detail.mensaje;
    urlBusqueda += urlBusqueda.includes('ddragon') ? '.json' : '';

    fetch(urlBusqueda)
      .then((response) => response.json())
      .then((data) => {
        this.hits = data;
      })
      .catch((error) => console.error(error));
  }

  changeView(ev) {
    this.cardStyle = ev.detail.valor;
  }

  changeSearchOpt(ev) {
    this.searchValue = ev.detail.value;
    this.hits = [];
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>
      <sub-navigation></sub-navigation>

      <section class="container">
        <div id="sub-container">
          <input-text @evBusq="${this.consulta}">Consulta</input-text>
          <radio-options @change="${this.changeSearchOpt}" .radioOptions="${this.optionsList}"></radio-options>
          <switch-button @change="${this.changeView}"><strong>Modo: </strong>Tabla / Cartas</switch-button>
        </div>
        <img-comp .resultados="${this.hits}" .cardStyle="${this.cardStyle}" .category="${this.searchValue}"></img-comp>
      </section>
    `;
  }
}

customElements.define('extras-viewapi', ExtrasViewAPI);
