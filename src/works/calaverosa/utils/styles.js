import { css } from 'lit-element';

export const mediaQueriesStyles = css`
  /* Smartphones (portrait & landscape) */
  @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
    table {
      width: 100%;
    }
    div {
      text-align: center;
      margin: 5%;
    }
    input {
      width: 50%;
    }
  }

  /* Smartphones (portrait & landscape) */
  @media only screen and (min-device-width: 340px) and (max-device-width: 760px) {
    table {
      width: 100%;
    }
    div {
      text-align: center;
      margin: 5%;
    }
    input {
      width: 50%;
    }
  }

  /* Smartphones (portrait & landscape) */
  @media only screen and (min-device-width: 411px) and (max-device-width: 731px) {
    table {
      width: 100%;
    }
    div {
      text-align: center;
      margin: 5%;
    }
  }

  /* iPads */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
    table {
      width: 100%;
    }
    div {
      text-align: center;
      margin: 5%;
    }
  }
`;
