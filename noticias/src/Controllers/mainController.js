import swal from 'sweetalert';

class MainController {

    //Extrae la información de un usuario de la base de datos 
    userConsult = async () => {
        //Sacamos el id del sessionStorage
        const id = sessionStorage.getItem('userid');
        const url = `http://localhost:5000/users/${id}`
        const element = await fetch(url)
            .then(element => {
                return element;
            })
        return element;
    }

    newsConsult = async (id) => {
        const url = `http://localhost:5000/news/detail/${id}`
        const element = await fetch(url)
            .then(element => {
                return element;
            })
        return element.json();
    }

    //Verificamos si un usuario se logueado correctamente
    userVerifi = async (access) => {
        //Sacamos el __token del sessionStorage
        const __token = sessionStorage.getItem('__token');
        //Si esta el __token
        if (__token) {
            //y si el acceso es verdadero entonces
            if (access === 'true') {
                //reentornamos verdadero
                return true
            } else {
                //Si el usuario no tiene acceso reentornamos falso
                return false;
            }
        } else {
            //si el usuario no tiene el __token, reentornamos falso
            return false
        }

    }

    //Cambiar la contraseña de un usuario
    passChanger = async (newPass, oldPass) => {
        const url = 'http://localhost:5000/users/change/pass/';
        const data = {
            userid: sessionStorage.getItem('userid'),
            newPass: newPass,
            pass: oldPass,
        }
        const consulta = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await consulta.json();
        console.log(response);
        return response.value;
    }

    //Verificador de contraseñas viejas del usuario
    olPassVerifi = async (user, pass) => {
        const url = `http://localhost:5000/users/validationlogin/${user}/${pass}`;
        const response = await fetch(url);
        const consulta = await response.json();
        return consulta.value;
    }
    //Verificador de contraseñas
    //Verificar si las contraseñas coinciden
    passVerifi = (newPass, passVerifi) => {
        //verificamos que sean iguales
        if (newPass === passVerifi) {
            //En caso que de sean iguales ahora verificamos que las contraseña tenga mas de 5 caracteres
            if (newPass.length > 5) {
                //entonces reentormas un verdadero en caso de que esta ultima condición se cumpla
                return true
            } else {
                //reentornamos un mensaje en pantalña
                swal({ text: 'La Nueva contraseña debe tener como minimo 5 caracteres', button: 'Acceptar' })
                return false
            }
        } else {
            //Enviamos un mensaje en caso de que las contraseñas no sean iguales
            swal({ text: 'Las contraseñas no coinciden', button: 'Acceptar' });
            return false

        }
    }



}


export default MainController;