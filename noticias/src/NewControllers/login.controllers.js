import swal from 'sweetalert';
import config from './config.controllers';
export default class LoginController {
    constructor() {
        this.url = config.serverURL
    }

    // eslint-disable-next-line no-dupe-args
    async Login(data = Object) {
        //Validamos el usuario
        if (data.user.trim() === "" || !data.user) {
            swal({ text: 'Falta el usuario' });
            return false;
        }
        //Validamos la contraseña
        if (data.pass.trim() === "" || !data.pass) {
            swal({ text: 'Falta el contraseña' });
            return false;

        }

        //Consulta a la API
        const consult = await fetch(`${this.url}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //Recibimos los datos y los transformamos
        const _response = await consult.json();

        if (_response.value) {
            window.sessionStorage.setItem('__token', _response._token)
            window.location.href = "/home"
            return true;
        } else {
            if (_response.code === 1001) {
                swal({ text: 'El usuario no se encentra en la base de datos' });
                return false;
            } else {
                swal({ text: _response.message });
                return false;
            }
        }
    }

}