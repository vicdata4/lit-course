import { LitElement, html } from 'lit-element';
import { navList } from '../../utils/constants';
import { scrollMode } from '../../utils/functions';
import { navigationStyles } from './styles';
import { material } from '../../utils/fonts';

class NavigationWc extends LitElement {
  static get styles() {
    return [navigationStyles, material];
  }

  static get properties() {
    return {
      scroll: { type: Number },
    };
  }

  constructor() {
    super();
    this.scroll = 0;

    window.addEventListener('scroll', () => {
      const arrowBtn = this.shadowRoot.querySelector('.scrolltop-arrow');
      const scrollMenu = this.shadowRoot.querySelector('.scroll-menu');
      const opened = scrollMenu.style.top === '0px' && this.shadowRoot.querySelector('.opened-fixed');

      arrowBtn.style.opacity = window.scrollY > window.innerHeight ? '1' : '0';
      scrollMenu.style.top = window.scrollY > 170 || opened ? '0' : '-70px';
    });
  }

  mobileMenuSwitch(scroll_ = null) {
    const type = scroll_ ? { scroll: 'scroll-', fixed: '-fixed' } : { scroll: '', fixed: '' };
    const icon = this.shadowRoot.querySelector(`.${type.scroll}menu-icon`).classList;
    const menu = this.shadowRoot.querySelector('.nav-list').classList;
    const menuButton = this.shadowRoot.querySelector(`.${type.scroll}menu-btn`);
    const isClosed = !menu.contains(`opened${type.fixed}`);

    menuButton.disabled = true;

    if (isClosed) {
      if (!scroll_) {
        scrollMode('fixed', '0px');
      } else {
        this.scroll = window.scrollY;
        scrollMode('fixed', `-${window.scrollY}px`);
      }

      menu.add(`opened${type.fixed}`);
      icon.remove('no-transition');
      icon.add('rotate');
    } else {
      scrollMode('unset', 'unset');
      if (type.fixed) window.scrollTo(0, this.scroll);
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

  goTo(url) {
    scrollMode('unset', '0px');
    location.href = url;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  render() {
    return html`
      <nav>
        <ul class="nav-list">
          ${navList.map(
            (info) => html`<li><a @click="${() => this.goTo(info.path)}" class="nav-link">${info.name}</a></li>`,
          )}
        </ul>
        <div class="scroll-menu">
          <img class="logo" src="assets/images/logo.png" alt="logo" />
          <ul class="nav-list">
            ${navList.map(
              (info) =>
                html`<li>
                  <a @click="${() => this.goTo(info.path)}" class="nav-link fixed" tabindex="-1">${info.name}</a>
                </li>`,
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
      <button aria-label="Scroll to top" class="scrolltop-arrow" @click="${this.scrollToTop}">
        <i class="material-icons">arrow_upward</i>
      </button>
    `;
  }
}

window.customElements.define('navigation-wc', NavigationWc);
