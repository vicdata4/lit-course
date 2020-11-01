import { LitElement, html } from 'lit-element';
import { navList } from '../../utils/constants';
import { disableScrolling, enableScrolling } from '../../utils/functions';
import { navigationStyles } from './styles';
import { material } from '../../utils/fonts';

class NavigationWc extends LitElement {
  static get styles() {
    return [navigationStyles, material];
  }

  mobileMenuSwitch(scroll_ = null) {
    const type = scroll_ ? { scroll: 'scroll-', fixed: '-fixed' } : { scroll: '', fixed: '' };
    const icon = this.shadowRoot.querySelector(`.${type.scroll}menu-icon`).classList;
    const menu = this.shadowRoot.querySelector('.nav-list').classList;
    const menuButton = this.shadowRoot.querySelector(`.${type.scroll}menu-btn`);
    const isClosed = !menu.contains(`opened${type.fixed}`);
    menuButton.disabled = true;

    if (isClosed) {
      disableScrolling();
      menu.add(`opened${type.fixed}`);
      icon.remove('no-transition');
      icon.add('rotate');
    } else {
      enableScrolling();
      if (!type.fixed) menu.remove('opened');
      menu.add('closed');
      icon.add('rclose');
    }

    setTimeout(() => {
      menuButton.disabled = false;

      if (!isClosed) {
        icon.add('no-transition');
        icon.remove('rotate');
        icon.remove('rclose');
        menu.remove('closed');

        if (type.fixed) menu.remove('opened-fixed');
      }
    }, 1000);
  }

  render() {
    return html`
      <nav>
        <ul class="nav-list">
          ${navList.map((info) => html`<li><a href="${info.path}" class="nav-link">${info.name}</a></li>`)}
        </ul>
        <div class="scroll-menu">
          <img class="logo" src="assets/images/logo.png" alt="logo" />
          <ul class="nav-list">
            ${navList.map(
              (info) => html`<li><a href="${info.path}" class="nav-link fixed" tabindex="-1">${info.name}</a></li>`,
            )}
          </ul>
          <button type="button" class="scroll-menu-btn" @click="${() => this.mobileMenuSwitch(true)}">
            <i class="material-icons scroll-menu-icon">expand_more</i>
          </button>
        </div>
        <button type="button" class="menu-btn" @click="${() => this.mobileMenuSwitch()}">
          <i class="material-icons menu-icon">expand_more</i>
        </button>
      </nav>
    `;
  }
}

window.customElements.define('navigation-wc', NavigationWc);
