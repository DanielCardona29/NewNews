import swal from 'sweetalert';
import config from './config.controllers';

export default class RegistroController {
    constructor() {
        this.url = config.serverURL;
      
    }

    //validador de contraseñas
    ValidatePass(pass, confipass) {
        if (pass === confipass) {
            if (pass.length > 5)
                return true
        } else {
            return false
        }
    }

    //Consultar a la API
    async Consulta(data) {
        const consult = await fetch(`${this.url}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await consult.json()
        return response;
    }

    //Hacemos el registro
    async SingUp(data = Object, incoPass) {
        const { user, email, pass, confipass, check } = data;
        //Validamos los datos
        if (!user || !email || !pass || !confipass || !check) {
            swal({
                text: "Parece que falta un dato",
                button: "Apcetar",
            })
            return false
        }

        //Validamos las contraseñas
        if (!this.ValidatePass(pass, confipass)) {
            incoPass();
            return false
        }

        //Hacemos en envio a la API
        const consult = await this.Consulta({
            user: user,
            pass: pass,
            email: email
        });
        if (!consult.value) {
            swal({
                text: consult.message,
                button: 'Aceptar'
            })
            return false;
        }
        sessionStorage.setItem('__token', consult._token)
        swal({
            text: 'Todo salio correctamente'
        })
            .then(
                value => {
                    window.location.href = '/home'
                }
            )
        return true
    }

}