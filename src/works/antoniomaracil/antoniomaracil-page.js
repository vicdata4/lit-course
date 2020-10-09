/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/vacation-form/components/vacation-form';
import './components/admin-vacation-form/components/admin-vacation-form';
import './components/pagination-component/pagination-view';

class AntoniomaracilPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      arrVacation: { type: Array }
    };
  }

  constructor() {
    super();
    this.arrVacation = [];
  }

  updateArray(e) {
    this.arrVacation = [...e.detail.applications];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>antoniomaracil</work-header>
        <pagination-view></pagination-view>
        <h2 style="text-align:center;">Vacation Form</h2>
        <hr>
        <vacation-form @update-array="${this.updateArray}" .arrVacation="${this.arrVacation}"></vacation-form>
        <hr>
        <h2 style="text-align:center;">Admin vacation Form</h2>
        <hr>
        <admin-vacation-form .arrVacation="${this.arrVacation}" @update-array="${this.updateArray}"></admin-vacation-form>
      </section>
    `;
  }
}

window.customElements.define('antoniomaracil-page', AntoniomaracilPage);
