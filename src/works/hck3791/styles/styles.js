import { css } from 'lit-element';

export const HOURS = css`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap');
    
    :host {
        font-family: 'Open Sans', sans-serif;
    }

    .container {
        max-width:80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: auto;
        margin-left:auto;
    }

    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: url('/assets/hck3791/icons/down-arrow-64.png') 100% / 20% no-repeat;
        padding: 2px;
    }

    

    article div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 10px;
    }

    article div label {
        font-weight: bold;
    }

    label, select {
        width: 20%;
    }
    

    div select:focus {
        outline: none;
    }

    #generateReport {
        padding: 7px 10px;
        font-size: 0.7em;
    }

    table {
        border-collapse: collapse;
        border: 1px solid black;
        font-size: 0.75em;
        text-align: left;
    }

    table thead tr:first-child {
        background-color: #ccc;
    }

    table tbody tr:nth-child(odd) {
        background: #eee;
    }

    table td {
        border-right: 1px solid black;
        padding: 10px 10px 10px 5px;
        font-weight: 600
    }

    table th {
        border-right: 1px solid black;
        padding: 4px 10px 4px 5px;
    }

`;
