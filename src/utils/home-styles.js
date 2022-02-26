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
  }

  @media (min-width: 540px) {
    .area-card {
      padding: 20px 0;
    }
  }

  @media (min-width: 768px) {
    .areas {
      padding: 0px 65px;
      margin: 0;
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

  .footer-link:hover {
    text-decoration: underline;
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

const mainStyles = css`
  .hall {
    display: flex;
    justify-content: center;
    height: var(--main-height);
  }

  .main-title {
    color: #595859;
    font-size: 40px;
    font-weight: 700;
    font-family: 'Raleway', sans-serif;
    margin-top: 60px;
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

  .main-container {
    width: 100%;
    padding: 0 30px;
    max-width: 600px;
  }

  @media (min-width: 900px) {
    .main-title {
      margin-top: 130px;
      font-size: 50px;
    }
  }

  @media (min-width: 1240px) {
    .separator-main {
      margin: 30px 0;
    }

    .main-container {
      width: 100%;
      margin: 0 20%;
      padding: 0 120px;
    }

    .main-icon {
      font-size: 70px;
    }
  }
`;

export const styles = css`
  :host {
    --header-height: 120px;
    --nav-height: 50px;
    --header-nav-height: calc(var(--header-height) + var(--nav-height));
    --header-scroll-height: 70px;
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

  .btn-container {
    margin-bottom: 40px;
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

  .separator.c-sm {
    width: 80px;
    border-bottom-width: 1.4px;
  }

  .separator.c-red {
    border-bottom-color: #dc6260;
  }

  .separator.c-blue {
    border-bottom-color: #60c8dc;
  }

  .separator.c-green {
    border-bottom-color: #c0dc60;
  }

  .separator.centered {
    width: 300px;
    align-self: center;
    margin: 30px 0px;
    border-bottom-width: 2px;
  }

  @media (min-width: 540px) {
    .section-title {
      line-height: unset;
    }
  }
  ${mainStyles}
  ${technologiesSectionStyles}
  ${informationSectionStyles}
  ${areaSectionStyles}
  ${footerStyles}
`;
