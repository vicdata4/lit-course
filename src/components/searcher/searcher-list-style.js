import { css } from 'lit-element';

export const newListStyles = css`
  .container {
    width: 100%;
    font-family: 'Open Sans', sans-serif, Arial;
    letter-spacing: 0.4px;
  }

  .row > * {
    text-align: left;
    padding-right: 10px;

    height: 30px;
    line-height: 30px;
  }

  .row > *,
  .info-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .row.header {
    margin-bottom: 20px;
  }

  .row.header > * {
    letter-spacing: 1.2px;
    color: #959595;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid #ebebeb;
    padding: 10px 0px;
  }

  .row:first-child {
    border: none;
  }

  .clear-btn {
    padding: 0;
    border: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
  }

  .index {
    display: none;
    padding-left: 20px;
    color: #999999;
  }

  .title {
    width: 70%;
    color: #285659;
  }

  .date {
    display: none;
    width: 20%;
  }

  .author {
    display: none;
    width: 15%;
  }

  .light-grey {
    color: #747474;
  }

  .blue {
    color: #0589aa;
    text-decoration: none;
  }

  .yellow {
    color: #878943;
  }

  .points {
    width: 20%;
  }

  .info {
    width: 10%;
  }

  .info-container {
    display: block;
  }

  .row.data {
    margin-bottom: 40px;
  }

  .show-more-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 50px 0px;
  }

  .show-more {
    background-color: transparent;
    border: 1px solid grey;
    padding: 10px;
    outline: none;
    cursor: pointer;
  }

  .show-more:hover {
    background-color: #f1f1f1;
  }

  @media (min-width: 768px) {
    .title {
      width: 40%;
    }

    .points {
      width: 15%;
    }

    .index {
      display: block;
      width: auto;
      min-width: 30px;
    }

    .date {
      display: block;
    }

    .author {
      display: block;
    }

    .info-container {
      display: none;
    }

    .row {
      padding: 20px 0px;
    }

    .row.header {
      margin-bottom: 0px;
    }

    .row.data {
      margin-bottom: 0px;
    }

    .row.data:hover {
      background-color: #f5f6f7;
    }
  }
`;
