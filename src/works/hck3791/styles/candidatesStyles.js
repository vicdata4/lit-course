import { css } from 'lit-element';

export const candidatesStyle = css`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');

    :host  {
        font-family: 'Open Sans', sans-serif;
    }

    #candidatesContainer {
        display:flex;
        flex-direction: row;
        justify-content: center;
    }

    table tr:first-child {
        background-color: #ccc;  
    }

    table tbody tr:nth-child(odd) {
        background-color: #eee;
    }

    table caption {
        font-size: 1.1rem;
        font-weight: bold;
        text-align: left;
        margin: 40px 0;
    }

    table {
        border-collapse: collapse;
        border: 2px solid #000;
        font-size: 0.8rem;
    }

    th div {
        display:flex;
        flex-direction: row;
        align-items: center;
    }

    th span {
        margin-right: 20px;
    }

    table th {
        border-right: 2px solid #000;
        padding: 1px 2px 1px 5px;
    }

    table td {
        border-right: 2px solid #000;
        padding: 3px 10px 3px 5px;
        font-weight: bold;
    }

    table thead tr th div img {
        width: 0.8em;
        height: 0.8em;
    }

    table tbody tr td img {
        width: 50%;
    }

    table tbody tr .semaforo {
        text-align: center;
        padding: 4px;
    }

    /* Large desktop */
    @media (max-width: 979px) {
        table {
            font-size: 0.60rem;
        }

        th span {
            margin-right: 10px;
        }
    }

    /* Landscape phone to portrait tablet */
    @media (max-width: 767px) {
        table {
            font-size: 0.6rem;
        }

        th span {
            margin-right: 0px;
        }
    }

    /* Landscape phones and down */
    @media only screen and (min-device-width : 360px) and (max-device-width : 480px) {
        table caption {
            font-size: 0.7rem;  
            margin: 20px 0;
        }
        
        table {
            font-size: 0.4rem;
        }

        table th {
            padding: 0 0.2em 0 0.3em;
        }

        table tr td {
            padding: 0 0.2em 0 0.3em;
        }
    }

`;
