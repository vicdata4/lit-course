import { LitElement, html } from 'lit-element';
import { material } from '../utils/fonts';
import { styles } from '../utils/home-styles.js';
import { html5Svg, css3Svg, jsSvg, githubSvg } from '../utils/svg-icons';
import '../components/navigation/navigation-wc';

class HomeView extends LitElement {
  static get styles() {
    return [material, styles];
  }

  renderMainSection() {
    return html`
      <section aria-label="Web design best practices" tabindex="0">
        <div class="hall">
          <div class="main-container">
            <h1 class="main-title">WEB DESIGN<br />BEST PRACTICES</h1>
            <hr class="separator separator-main" />
            <div class="main-icons-container">
              <span class="material-icons main-icon">touch_app</span>
              <span class="material-icons main-icon">favorite_border</span>
            </div>
          </div>
          <div class="column"></div>
          <div class="column right"></div>
          <div class="column-bottom"></div>
        </div>
      </section>
    `;
  }

  renderTechnologies() {
    return html`
      <section aria-label="Web development technologies" tabindex="0">
        <h2 class="section-title centered">NATIVE <span class="section-title-decorator">TECHNOLOGIES</span></h2>
        <div class="technologies">
          <div class="tech-card" aria-label="HTML5" tabindex="0">
            ${html5Svg}
            <p class="card-text" tabindex="0">
              HTML5 is a software solution stack that defines the properties and behaviors of
              <b class="card-decorator">web page content</b> by implementing a markup-based pattern to it
            </p>
            <hr class="separator sm red" />
          </div>
          <div class="tech-card" aria-label="CSS3" tabindex="0">
            ${css3Svg}
            <p class="card-text" tabindex="0">
              Cascading Style Sheets (CSS) is a style sheet language used for describing the
              <b class="card-decorator">presentation</b>
              of a document written in a markup language like HTML
            </p>
            <hr class="separator sm blue" />
          </div>
          <div class="tech-card" aria-label="Javascript" tabindex="0">
            ${jsSvg}
            <p class="card-text" tabindex="0">
              JavaScript is a programming language that conforms to the
              <b class="card-decorator">ECMAScript specification</b>. JavaScript is high-level, often just-in-time
              compiled, and multi-paradigm
            </p>
            <hr class="separator sm green" />
          </div>
        </div>
      </section>
    `;
  }

  renderDesign() {
    return html`
      <section aria-label="About dsign project" tabindex="0">
        <div class="information">
          <div class="info-header">
            <h2 class="section-title">DSIGN</h2>
            <div class="info-icons">
              <button type="button"><i class="material-icons favourite-red">favorite_border</i></button>
              <button type="button"><i class="material-icons share-purple">share</i></button>
            </div>
          </div>
          <hr class="separator sm green" />
          <p class="info-text" tabindex="0">
            This project includes a <b>responsive web layout</b> following best practices about presentation, layout and
            accessibility using HTML5 and CSS3. <br /><br />
            A basic example about how a simple web layout can be developed from the skeleton to the style, respecting
            the most important aspects about user experience and accesibility such as
            <b>tab navigation, color contrast ratio, text readability, content distribution</b> and also non-visual
            aspects like <b>semantic elements, attributes, clean code</b> in order to build a more diverse and powerful
            Web site or application.
          </p>
          <hr class="separator centered" />
          <a href="https://github.com/vicdata4/lit-course" class="github_link" target="_blank">${githubSvg}</a>
        </div>
      </section>
    `;
  }

  renderDisciplines() {
    return html`
      <section aria-label="Web design disciplines" tabindex="0">
        <div class="areas">
          <article class="area-card">
            <h2 class="area-title" tabindex="0">User experience</h2>
            <p class="info-text" tabindex="0">
              User experience (UX) is a <b>person's emotions and attitudes about using a particular product</b>, system
              or service. It includes the practical, experiential, affective, meaningful and valuable aspects of
              human–computer interaction and product ownership. <br /><br />Additionally, it includes a person's
              perceptions of system aspects such as utility, ease of use and efficiency.
            </p>
          </article>
          <article class="area-card center">
            <h2 class="area-title" tabindex="0">Accesibility</h2>
            <p class="info-text" tabindex="0">
              Web accessibility is the inclusive practice of <b>ensuring there are no barriers</b> that prevent
              interaction with, or access to, websites on the World Wide Web
              <b
                >by people with physical disabilities, situational disabilities, and socio-economic restrictions on
                bandwidth and speed.</b
              >
              <br /><br />When sites are correctly designed, developed and edited, generally all users have equal access
              to information and functionality.
            </p>
          </article>
          <article class="area-card">
            <h2 class="area-title" tabindex="0">User interface</h2>
            <p class="info-text" tabindex="0">
              The user interface (UI), in the industrial design field of human-computer interaction, is the
              <b>space where interactions between humans and machines occur.</b> <br /><br />The goal of this
              interaction is to allow effective operation and control of the machine from the human end, whilst the
              machine simultaneously feeds back information that aids the operators' decision-making process.
            </p>
          </article>
        </div>
      </section>
    `;
  }

  renderFooter() {
    return html`
      <footer aria-label="Footer section" tabindex="0">
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Menu links" tabindex="0">CONTINENTS</li>
          <li><a href="#" class="footer-link">Africa</a></li>
          <li><a href="#" class="footer-link">Europe</a></li>
          <li><a href="#" class="footer-link">Asia</a></li>
          <li><a href="#" class="footer-link">America</a></li>
          <li><a href="#" class="footer-link">Antarctica</a></li>
          <li><a href="#" class="footer-link">Oceania</a></li>
        </ul>
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Technologies links" tabindex="0">TECHNOLOGIES</li>
          <li><a href="#" class="footer-link">HTML5</a></li>
          <li><a href="#" class="footer-link">CSS3</a></li>
          <li><a href="#" class="footer-link">Javascript</a></li>
        </ul>
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Dependencies links" tabindex="0">DEPENDENCIES</li>
          <li><a href="#" class="footer-link">LitElement</a></li>
          <li><a href="#" class="footer-link">Vaadin</a></li>
        </ul>
        <ul class="footer-list">
          <li class="footer-link title" aria-label="Recomendations links" tabindex="0">RELATED</li>
          <li><a href="#" class="footer-link">Git</a></li>
          <li><a href="#" class="footer-link">Flex-box</a></li>
          <li><a href="#" class="footer-link">Grid Layout</a></li>
          <li><a href="#" class="footer-link">ES6</a></li>
          <li><a href="#" class="footer-link">Web Components</a></li>
          <li><a href="#" class="footer-link">Npm</a></li>
        </ul>
        <div class="footer-line" aria-label="Website links" tabindex="0">
          <a href="#" class="footer-link">lit-course.site</a>
        </div>
      </footer>
    `;
  }

  render() {
    return html`
      <header>
        <img class="logo" src="assets/images/logo.png" alt="logo" />
      </header>
      <navigation-wc></navigation-wc>
      <main>
        ${this.renderMainSection()} ${this.renderTechnologies()} ${this.renderDesign()} ${this.renderDisciplines()}
        ${this.renderFooter()}
      </main>
    `;
  }
}

window.customElements.define('home-view', HomeView);
