
import config from './config.controllers';
import swal from 'sweetalert';
import axios from 'axios';

export default class UserController {
    constructor() {
        this.url = config.serverURL;
        this.CLOUDINARY_UPLOAD_PRESET = 'uukb6zly';
        this.CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dx7chtz6f/image/upload`;
    }

    ///Cambiar la contraseña
    async changePass(pass) {
        const avatar = pass;

        if (!avatar) {
            swal({ text: 'Hace falta el avatar' })
        }

        const consulta = await fetch(`${this.url}/user/changepass`, {
            method: 'POST',
            body: JSON.stringify({ newpass: pass }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('__token')
            }
        });
        const res = await consulta.json();
        if (!res.value) {
            swal({
                text: res.message
            })
        }
        return res
    }

    //cambiar la imagen de usuario
    async updateImage(url) {
        const avatar = url;

        if (!avatar) {
            swal({ text: 'Hace falta el avatar' })
        }

        const consulta = await fetch(`${this.url}/user/avatar`, {
            method: 'POST',
            body: JSON.stringify({ avatar: avatar }),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('__token')
            }
        });
        const res = await consulta.json();
        console.log(res);
        return res
    }

    async uploadImage(element) {
        //Extraemos los elemetos de los formularios
        const formData = new FormData();
        const fileField = document.querySelector('#AvatarImage');
        if (fileField.files.length !== 0) {
            //Aplicamos los datos que vamos a enviar
            formData.append('file', fileField.files[0]);
            formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
            //Hacemos la cosulta a la API de Cloudinary
            const consulta = await axios.post(this.CLOUDINARY_URL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                //Manejamos la barra de progreso
                onUploadProgress(e) {
                    const progress = (e.loaded * 100) / e.total;
                    document.getElementById(element).setAttribute('value', progress);
                }
            });
            return consulta.data.url;
        } else {
            return false
        }
    };

    //Obtener todas las noticias que ha escrito un usuario

    async news() {

        const consulta = await fetch(`${this.url}/user/news`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('__token')
            }
        });
        const res = await consulta.json();
        return res
    }

}