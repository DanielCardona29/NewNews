import axios from 'axios';
import swal from 'sweetalert';
import config from './config.controllers';


export default class NewsController {
    constructor() {
        this.CLOUDINARY_UPLOAD_PRESET = config.CLOUDINARY_UPLOAD_PRESET;
        this.CLOUDINARY_URL = config.CLOUDINARY_URL;
        this.url = config.serverURL;

    };

    //Encontrar una noticia
    async findNew(id) {
        const consult = await fetch(`${this.url}/news/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('__token')
            }
        });
        const response = await consult.json();
        return response.response;
    };

    //Subimos una imagen
    async uploadImage(element) {
        //Extraemos los elemetos de los formularios
        const formData = new FormData();
        const fileField = document.querySelector('#NewImage');
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
            return consulta;
        } else {
            return false
        }
    };

    //Gurdamos la noticia en la base de datos
    async consult(data, route) {
        const consult = await fetch(`${this.url}/news/${route}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('__token')
            }
        });
        const response = await consult.json()
        return response;
    };

    //Publicamos las noticias las noticias
    async save(data) {
        const datos = {
            content: data.content,
            title: data.title,
            img: data.img,
            aling: data.aling,
            isPublic: false,
            newID: data.id
        }
        if (data.id) {

            const response = await this.update(datos);
            return response;
        } else {

            const response = await this.create(datos);
            return response;
        }

    };

    //Publicar una noticia
    async create(datos) {
        const consulta = await this.consult(datos, 'create')
        if (!consulta.value) {
            swal({ text: consulta.message })
            return false;
        };
        localStorage.setItem('isEditing', consulta.ID);
        swal({ text: 'Todo se ha guardado correctamente' })
        return consulta
    };

    //Actualizar una noticia
    async update(datos) {
        const consulta = await this.consult(datos, 'update');
        if (!consulta.value) {
            swal({ text: consulta.message })
            return false;
        };
        swal({ text: 'Todo se ha guardado correctamente' })
        return consulta;
    };

    //Eliminamos una noticia
    async delete(id) {
        const consulta = await fetch(`${this.url}/news/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'x-access-token': sessionStorage.getItem('__token')
            }
        });

        const response = await consulta.json()
        if (!response.value) {
            swal({ text: response.message })
            return false;
        };
        swal({ text: response.message })
        return true;
    };

    //Publicar una nueva noticia
    async public(id) {
        const datos = {
            newID: id,
        }
        const consulta = await this.consult(datos, 'public');
        if (!consulta.value) {
            swal({ text: consulta.message })
            return false;
        };
        swal({ text: 'Todo se ha publicado correctamente' })
        return true
    };

    //Despublicar una noticia

    async dispublic(id) {
        const datos = {
            newID: id,
        }
        const consulta = await this.consult(datos, 'dispublic');
        if (!consulta.value) {
            swal({ text: consulta.message })
            return false;
        };
        swal({ text: 'Guardado correctamente' })
        return true
    };

    //Envair likes
    async Liker(data) {
        const consulta = await this.consult(data, 'liker');
        return consulta;
    };

    //Encontrar todo el listado de noticias
    async allNews(token) {
        const responser = await fetch(`${this.url}/news`, {
            headers: {
                'x-access-token': token
            }
        });
        const consult = await responser.json();
        if (!consult.value) {
            return consult;
        } else {
            return false;
        }
    };

    //Enviar una visita 
    async view(id) {
        const data = {
            newID: id
        }
        await this.consult(data, 'view');
    }
}