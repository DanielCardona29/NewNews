import swal from 'sweetalert';
    
export default class LoginController {
    constructor() {
        this.url = 'http://localhost:7000'
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
        const _Response = await consult.json();

        if (_Response.value) {
            window.sessionStorage.setItem('__token', _Response._token)
            window.location.href = "/home"
            return true;
        } else {
            if (_Response.code === 1001) {
                swal({ text: 'El usuario no se encentra en la base de datos' });
                return false;
            }
        }
    }

    //Funcion para loguearse
    async SingIn(data = Object){
        
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
        const consult = await fetch(`${this.url}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //Recibimos los datos y los transformamos
        const _Response = await consult.json();

        if (_Response.value) {
            window.sessionStorage.setItem('__token', _Response._token)
            window.location.href = "/home"
            return true;
        } else {
            if (_Response.code === 1001) {
                swal({ text: 'El usuario no se encentra en la base de datos' });
                return false;
            }
        }
    }
}