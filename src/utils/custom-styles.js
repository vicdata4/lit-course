import { css } from 'lit-element';

export const navigatorStyles = css`
  :host {
    --background-color: #eae8e8;
    --dark-color: #3c3b3b;
  }

  .menu-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .menu-list li {
    color: black;
    background-color: var(--background-color);
    margin-bottom: 2px;
    font-size: 20px;
    cursor: pointer;
  }

  .menu-list li a:hover {
    background-color: #3e5c7b;
    color: white;
  }

  .menu-list li a {
    display: block;
    text-decoration: none;
    color: black;
    padding: 20px;
    text-align: center;
  }

  @media (min-width: 768px) {
    .menu-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
    }

    .menu-list li {
      margin: 20px;
      line-height: 150px;
      border-radius: 3px;
    }

    .menu-list li a {
      height: 150px;
      width: 150px;
    }
  }
  * {
    box-sizing: border-box;
}

.btn-wrp {
    border: 1px solid #dadada;
    display: inline-block;
    width: 100%;
    position: relative;
    z-index: 10;
}

.btn-clck {
    border: none;
    background: transparent;
    width: 100%;
    padding: 8px;
}

.btn-clck::-webkit-calendar-picker-indicator {
    right: -10px;
    position: absolute;
    width: 58px;
    height: 30px;
    color: rgba(204, 204, 204, 0);
    opacity: 0
}

.btn-clck::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.btn-clck::-webkit-clear-button {
    margin-right:75px;
}
.bton {
    height: 100%;
    background: #efe;
    border: none;
    color: #555;
    position: absolute;
    right: 0;
    top: 0;
}

.dias{
  color: green;
  font-size: 1.15em;
  margin-left: 10px;
  margin-right: 10px;
}
.exmp-wrp {
    margin-top: 0px;
    position: relative;
    width: 155px;
}
label {
  font-size: 1.3em;
  font-weight: bold;
  margin-left: 25px;
  margin-right: 5px;
}
table{
  margin-top: 40px;
}
`;

export const commonStyles = css`
  .container {
    padding: 20px;
  }
`;
