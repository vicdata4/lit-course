import { css } from 'lit-element';

export const navigationStyles = css`
  nav {
    font-family: 'Sen', sans-serif;
    background-color: var(--nav-background);
    letter-spacing: 1.6px;
    font-size: 16px;
    height: 100%;
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
    font-size: 40px !important;
    color: #716a6f;
    transition: transform 1s;
  }

  .menu-icon.no-transition,
  .scroll-menu-icon.no-transition {
    transition: none;
  }

  .menu-icon.rotate,
  .scroll-menu-icon.rotate {
    transform: rotate(180deg);
  }

  .menu-icon.rotate.rclose,
  .scroll-menu-icon.rotate.rclose {
    transform: rotate(360deg);
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

  .opened-fixed {
    position: fixed;
    top: var(--header-scroll-height);
    height: calc(100vh - var(--header-scroll-height));
  }

  .closed {
    height: 0;
  }
  .nav-list.opened,
  .nav-list.opened-fixed,
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
    height: var(--header-scroll-height);
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
    width: 100px;
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

    .nav-list.opened,
    .nav-list.opened-fixed {
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
