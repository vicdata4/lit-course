import { LitElement, html } from 'lit-element';
import { navList } from '../../utils/constants';
import { scrollMode } from '../../utils/functions';
import { navigationStyles, transition } from './styles';
import { material } from '../../utils/fonts';
import { logo } from '../../utils/svg-icons.js';

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

  disableEnableScrolling(isClosed, scroll, isFixed) {
    if (isClosed) {
      if (!scroll) {
        scrollMode('fixed', '0px');
      } else {
        this.scroll = window.scrollY;
        scrollMode('fixed', `-${window.scrollY}px`);
      }
    } else {
      scrollMode('unset', 'unset');
      if (isFixed) window.scrollTo(0, this.scroll);
    }
  }

  mobileMenuSwitch(scroll_ = null) {
    const type = scroll_ ? { scroll: 'scroll-', fixed: '-fixed' } : { scroll: '', fixed: '' };
    const icon = this.shadowRoot.querySelector(`.${type.scroll}menu-icon`).classList;
    const menu = this.shadowRoot.querySelector('.nav-list').classList;
    const menuButton = this.shadowRoot.querySelector(`.${type.scroll}menu-btn`);
    const isClosed = !menu.contains(`opened${type.fixed}`);

    menuButton.disabled = true;

    this.disableEnableScrolling(isClosed, scroll_, type.fixed);

    if (isClosed) {
      menu.add(`opened${type.fixed}`);
      icon.remove('no-transition');
      icon.add('rotate');
    } else {
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
    }, transition);
  }

  resetScroll() {
    scrollMode('unset', '0px');
    window.scrollTo(0, 0);
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
            (info) =>
              html`<li>
                <a href="${info.path}" @click="${() => this.resetScroll(info.path)}" class="nav-link" tabindex="0"
                  >${info.name}</a
                >
              </li>`,
          )}
        </ul>
        <div class="scroll-menu">
          ${logo}
          <ul class="nav-list">
            ${navList.map(
              (info) =>
                html`<li>
                  <a
                    href="${info.path}"
                    @click="${() => this.resetScroll(info.path)}"
                    class="nav-link fixed"
                    tabindex="-1"
                    >${info.name}</a
                  >
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
