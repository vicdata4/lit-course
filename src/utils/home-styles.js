import { css } from 'lit-element';

const areaSectionStyles = css`
  .areas {
    display: grid;
    grid-template-columns: 1fr;

    row-gap: 2px;
    column-gap: 10px;

    padding: 0 40px;
  }

  .area-card {
    min-height: 100px;
    padding: 20px 0;
  }

  .area-card.center {
    border-top: 1px solid var(--border-grey);
    border-bottom: 1px solid var(--border-grey);
  }

  .area-title {
    margin-top: 0;
    color: #2196f3;
    letter-spacing: 4px;
    font-weight: 600;
    font-family: 'Raleway';
    font-variant: petite-caps;
  }

  @media (min-width: 540px) {
    .area-card {
      padding: 20px 0;
    }
  }

  @media (min-width: 768px) {
    .areas {
      padding: 0px 65px;
      margin: 0 0 80px 0;
    }
  }

  @media (min-width: 1136px) {
    .areas {
      grid-template-columns: repeat(3, 1fr);
      padding: 0;
    }

    .area-card {
      padding: 20px 40px;
    }

    .area-card > p {
      font-size: 18px;
    }

    .area-card.center {
      border: none;
      border-left: 1px solid var(--border-grey);
      border-right: 1px solid var(--border-grey);
    }
  }
`;

const technologiesSectionStyles = css`
  .technologies {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2px;
    row-gap: 2px;
    padding: 0 15px 0 15px;
  }

  .tech-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    height: auto;
    background-color: var(--nav-background);
  }

  .card-text {
    text-align: center;
    font-size: 15px;
    letter-spacing: 0.5px;
    line-height: 21px;
  }

  .tech-card > svg {
    width: 130px;
  }

  @media (min-width: 414px) {
    .card-text {
      font-size: 16px;
      line-height: 28px;
    }
  }

  @media (min-width: 540px) {
    .card-text {
      font-size: 18px;
    }

    .technologies {
      margin: 0 20px 0 20px;
    }
  }

  @media (min-width: 768px) {
    .tech-card {
      min-height: 200px;
    }

    .technologies {
      margin: 0 60px 0 60px;
    }

    .card-text {
      padding: 0 80px 0 80px;
    }
  }

  @media (min-width: 1136px) {
    .technologies {
      grid-template-columns: repeat(3, 1fr);
      margin: 0 90px 0 90px;
      padding: 0;
    }

    .card-text {
      line-height: 28px;
      padding: unset;
    }
  }
`;

const footerStyles = css`
  footer {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px 40px;
    background-color: var(--header-background);
  }

  .footer-list {
    color: #fff;
    list-style: none;
    margin: 0;
    padding: 0;
    margin: 0 20px;
  }

  .footer-list > li {
    margin: 5px 0;
  }

  .footer-link {
    color: #fff;
    text-decoration: none;
    letter-spacing: 1.3px;
  }

  .footer-link.title {
    color: rgb(179 179 179);
    margin: 15px 0;
    font-weight: 400;
    font-size: 15px;
  }

  .footer-line {
    width: 100%;
    text-align: center;
    padding-top: 40px;
  }

  .footer-line > a {
    display: inline-block;
    margin: 10px 20px;
  }

  @media (min-width: 540px) {
    footer {
      justify-content: space-around;
    }
  }

  @media (min-width: 768px) {
    footer {
      padding: 30px 100px;
    }
  }

  @media (min-width: 1136px) {
    footer {
      padding: 30px 200px;
    }
  }
`;

const navigatorStyles = css`
  nav {
    font-family: 'Sen', sans-serif;
    background-color: var(--nav-background);
    letter-spacing: 1.6px;
    font-size: 16px;
  }

  .nav-link:hover {
    border-bottom: 1px solid #59868c;
  }

  .menu-btn {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    overflow: hidden;
    outline: none;
    cursor: pointer;
  }

  .menu-icon,
  .scroll-menu-icon {
    font-size: 40px;
    color: #716a6f;
    transition: transform 1s;
  }

  .menu-icon.rotate {
    transform: rotate(180deg);
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: var(--header-nav-height);

    width: 100%;
    height: 0;

    margin: 0;
    padding: 0;

    background-color: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    list-style: none;
    z-index: 1;
  }

  .opened {
    height: calc(100% - var(--header-nav-height));
  }

  .closed {
    height: 0;
  }
  .nav-list.opened,
  .nav-list.closed {
    transition: height 1s;
  }

  .nav-list > li {
    margin: 20px 0;
  }

  .nav-link {
    text-decoration: none;
    color: #fff;
  }

  .scroll-menu {
    position: fixed;
    top: -70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    background-color: var(--header-background);
    opacity: 0.98;
    transition: top 0.5s;
    z-index: 2;
  }

  .scroll-menu > .nav-list {
    margin-right: 30px;
  }

  .scroll-menu > img {
    width: 40px;
    margin-left: 20px;
  }

  .nav-link.fixed {
    color: #fff;
  }

  .scroll-menu-btn {
    margin-right: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .scroll-menu-btn > i {
    color: white;
  }

  @media (min-width: 850px) {
    .nav-list {
      all: unset;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      height: 100%;
      list-style: none;
    }

    .nav-list > li {
      margin: 0 15px 0 15px;
    }

    .nav-list.opened {
      transition: unset;
    }

    .nav-link {
      color: #424242;
    }

    .menu-btn,
    .scroll-menu-btn {
      display: none;
    }
  }
`;

const informationSectionStyles = css`
  .information {
    display: flex;
    flex-direction: column;
    padding: 50px 40px 20px 40px;
  }

  .info-text {
    color: #232323;
    font-size: 16px;
    line-height: 1.5;
  }

  .info-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .github_link {
    width: fit-content;
    align-self: center;
    margin: 50px 0;
  }

  .github_link > svg {
    width: 130px;
  }

  .info-icons > button {
    padding: 0;
    margin: 0 5px;
    background-color: transparent;
    border: none;
  }

  .info-icons > button > i {
    font-size: 30px;
  }

  .favourite-red {
    color: #ca6b33;
  }

  .share-purple {
    color: #5e5ea5;
  }

  @media (min-width: 414px) {
    .info-text {
      font-size: 20px;
      line-height: 1.6;
    }
  }

  @media (min-width: 768px) {
    .information {
      padding: 50px 20%;
    }
  }
`;

const headerStyles = css`
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--header-background);
  }

  .logo {
    width: 155px;
    height: auto;
  }
`;

const mainStyles = css`
  .hall {
    display: flex;
    justify-content: center;
    background-color: rgba(104, 132, 128, 0.97);
    height: var(--main-height);
  }

  .main-title {
    color: white;
    font-size: 40px;
    font-weight: 700;
    font-family: 'Raleway', sans-serif;
    margin-top: 130px;
    margin-bottom: 0;
  }

  .main-icon {
    color: white;
    font-size: 50px;
  }

  .separator-main {
    border-bottom-left-radius: 0;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  cube-component {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .column-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    border-top: 1px solid #8d9c9b;
    background-color: rgba(255, 255, 255, 0.02);
  }

  @media (min-width: 768px) {
    .main-title {
      font-size: 60px;
    }

    .main-container {
      border-left: 1px solid white;
      border-right: 1px solid white;
      padding: 0 120px;
    }

    .main-icon {
      font-size: 70px;
    }
  }

  @media (min-width: 1136px) {
    .column {
      position: absolute;
      left: 0;
      top: 0;
      width: 150px;
      height: 100%;
      background-color: var(--nav-background);
    }

    .right {
      left: unset;
      right: 0;
    }
  }

  @media (min-width: 1800px) {
    .column-bottom {
      height: 200px;
    }
  }
`;

export const styles = css`
  :host {
    --header-height: 120px;
    --nav-height: 50px;
    --header-nav-height: calc(var(--header-height) + var(--nav-height));
    --main-height: calc(100vh - var(--header-nav-height));

    --nav-background: rgba(0, 0, 0, 0.05);
    --header-background: rgb(50, 50, 50);
    --border-grey: #c7c4c4;

    display: grid;
    grid-template-rows: var(--header-height) var(--nav-height) auto;
    font-family: 'Open Sans', sans-serif, Arial;
    letter-spacing: 0.4px;
    font-weight: 300;

    position: relative;
    width: 100%;
    height: 100%;
  }

  .section-title {
    font-family: 'Raleway', sans-serif;
    letter-spacing: 6px;
    line-height: 35px;
  }

  .section-title.centered {
    text-align: center;
    margin: 70px 0;
    padding: 0 30px;
  }

  .section-title-decorator {
    color: #339c91;
  }

  .card-decorator {
    color: #066e8e;
  }

  .separator {
    margin: 0;
    border: 0;
    border-bottom: 1px solid #b9b7b7;
    border-bottom-left-radius: 100%;
    border-top-right-radius: 100%;
  }

  .separator.sm {
    width: 80px;
    border-bottom-width: 1.4px;
  }

  .separator.red {
    border-bottom-color: #dc6260;
  }

  .separator.blue {
    border-bottom-color: #60c8dc;
  }

  .separator.green {
    border-bottom-color: #c0dc60;
  }

  .separator.centered {
    width: 300px;
    align-self: center;
    margin: 30px 0px;
    border-bottom-width: 2px;
  }

  .scrolltop-arrow {
    position: fixed;
    bottom: 0;
    right: 0;

    width: 50px;
    height: 50px;
    margin: 20px;
    border: none;
    border-radius: 100%;
    color: white;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.6s;
    cursor: pointer;
  }

  @media (min-width: 540px) {
    .section-title {
      line-height: unset;
    }
  }

  ${headerStyles}
  ${navigatorStyles}
    ${mainStyles}
    ${technologiesSectionStyles}
    ${informationSectionStyles}
    ${areaSectionStyles}
    ${footerStyles}
`;
