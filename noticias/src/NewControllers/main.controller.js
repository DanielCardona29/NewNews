
import swal from 'sweetalert';
import config from './config.controllers';

export default class MainController {
    constructor() {
        this.url = config.serverURL
    }

    //Consulta con token
    async Consulta(url, token, method) {
        try {
            const consulta = await fetch(`${this.url}/${url}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": token
                }
            });
            const response = await consulta.json();
            return response;
        } catch (error) {
            console.error(error);
        }

    }

    //Validamos el token
    async tokenValidate() {
        const _token = sessionStorage.getItem('__token');
        const consulta = await this.Consulta('auth/tokenValidation', _token, 'POST');
        console.log(consulta);
        if (!consulta.value) {
            swal({
                text: consulta.message,
                button: 'Volver'
            }).then(value => {
                sessionStorage.removeItem('__token');
                window.location.href = '/'
            });
            return false;
        }

        return true;
    }

    //Convertidor de fechas 
    date(date) {
        var options = { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "numeric", hour12: "false" };
        date = new Date(date);
        return date.toLocaleString("ES", options);
    }

}