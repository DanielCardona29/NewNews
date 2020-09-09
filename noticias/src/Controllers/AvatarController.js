import $ from 'jquery';
import swal from 'sweetalert';

class AvatarController {
    showButtons() {
        $('#buttons').css({ 'display': 'flex' });
    }
    //
    hiddenButtons() {
        $('#buttons').css({ 'display': 'none' });
    }
    //Saber si el usuario tiene un avatar
    async gettAvatar() {
        const userid = sessionStorage.getItem('userid')
        const url = `http://localhost:5000/users/avatar/${userid}/`;
        let consult = await fetch(url);
        let data = await consult.json();
        if (data.value) { return data.results[0].url } else { return data.value }
    }
    //Subir una imagen nueva
    async createAvatarImage() {
        //Enviamos la imagen por medio del formulario
        //Creanis la url
        const url = `http://localhost:5000/users/image/upload`;
        const formData = new FormData();
        const fileField = document.querySelector('#AvatarImage');
        //Si tenemos un archivo entonces lo procesamos 
        if (fileField.files[0]) {
            formData.append('AvatarImage', fileField.files[0]);
            const consulta = await fetch(url, {
                method: 'POST',
                body: formData
            })
            const response = await consulta.json();
            return response.url;
        } else {
            swal({
                text: 'Pon un archivo para continuar',
                button: 'Aceptar'
            })
        }
    }
    //Actualizar avatar
    async changeAvatar(img) {
        const url = `http://localhost:5000/users/update/avatar/`;
        let data = {
            url: img,
            userid: sessionStorage.getItem('userid'),
        }
        const consulta = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await consulta.json();
        return response.url
    }
    //Subir un avatar nuevo
    async newAvatar(img) {
        const url = 'http://localhost:5000/users/set/avatar/';
        let data = {
            url: img,
            userid: sessionStorage.getItem('userid'),
        }
        const consulta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        const response = await consulta.json();
        console.log(response);
        return { value: response.value, url: response.url }
    }
    //Subir una imagen
    async putNewAvatar(img) {
        let consulta = await this.gettAvatar()
            .then(value => {
                if (value) {
                    let consulta2 = this.changeAvatar(img)
                        .then(value => {
                            if (value) {
                                swal({ text: 'Avatar actualizado con exito' });
                                return value;
                            } else {
                                swal({ text: 'El avatar no se puede actualizar' });
                                return false;
                            }
                        });

                    return consulta2
                }
            })
        return consulta;
    }
    //Actualizar un avatar por una imagen
    async putNewImage() {
        let consulta = await this.gettAvatar()
            .then(value => {
                if (value) {
                    let consulta2 = this.createAvatarImage()
                        .then(value => {
                            if (value) {
                                let consulta3 = this.changeAvatar(value)
                                    .then(value => {
                                        return value;
                                    })
                                if (consulta3) {
                                    swal({ text: 'Imagen actualizada con exito' });
                                    return consulta3
                                } else {
                                    return false
                                }
                            } else {
                                return false;
                            }
                        });

                    return consulta2
                }
            })
        return consulta;
    }
}

export default AvatarController;