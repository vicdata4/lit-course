import { LitElement,css, html } from 'lit-element';

export class AdminVacaciones extends LitElement {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`
        <h2>Solicitud de vacaciones</h2>
        <table>
            <tr>
            <td>Nombre del empleado</td>
            <td>Fecha de solicitud</td>
            <td>Fecha de inicio</td>
            <td>Fecha de fin</td>
            <td>Estado de la solicitud</td>
            <td>Fecha de estado</td>
            </tr>
        </table>
        `;
    }
}
customElements.define('admin-vacaciones', AdminVacaciones);