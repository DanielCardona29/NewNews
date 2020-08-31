
import MainController from './mainController';
import swal from 'sweetalert';

class StatsController extends MainController {
    //Saber si un usuario tiene una visita registrada en en una noticia

    visitController = async (newsid, userid) => {
        const ulr = `http://localhost:5000/stats/visit/consult/${newsid}/${userid}`;
        const data = await fetch(ulr);
        const response = await data.json();
        if (response.value) {
            return true;
        } else {
            return false;
        }
    }

    //Enviar una visita de un usuario a una noticia 
    SendVisit = async (newsid, userid) => {
        const url = 'http://localhost:5000/stats/visit/';
        const data = {
            newsid: newsid,
            userid: userid
        }

        //Consultar si el usuario existe en la base de datos
        let userexist = await this.userConsult();
        let responseUser = await userexist.json();
        //Si el usuario existe
        if (responseUser.value) {
            //entoces verificamos si la noticia si existe
            let newsExist = await this.newsConsult(newsid);
            let responseNews = await newsExist.json();
            //Si la noticia existe 
            if (responseNews.value) {
                //Enviamos la visita
                let valuecontroller = await this.visitController(newsid, userid);
                if (!valuecontroller) {
                    fetch(url, {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    return true
                } else {
                    return false;
                }

            }


        } else {
            //Si el usuario no existe enviamos un mensaje
            swal({
                text: 'Parece que este usuario no existe en la base de datos',
                button: 'Acceptar'
            })
        }



    }

    //Envair un like a la base de datos
    settAlike = async (newsid) => {
        const url = 'http://localhost:5000/stats/likes/sett';
        const userid = sessionStorage.getItem('userid')
        const data = {
            newsid: newsid,
            userid: userid,
        }
        const consulta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await consulta.json();
        return response.value;
    }

    //Quitar un like
    deleteAlike = async (newsid) => {
        const url = 'http://localhost:5000/stats/likes/nosett';
        const userid = sessionStorage.getItem('userid')
        const data = {
            newsid: newsid,
            userid: userid,
        }
        const consulta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await consulta.json();
        return response.value;
    }

    //Envair un dislike a la base de datos
    settAdislike = async (newsid) => {
        const url = 'http://localhost:5000/stats/dislikes/sett';
        const userid = sessionStorage.getItem('userid')
        const data = {
            newsid: newsid,
            userid: userid,
        }
        const consulta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await consulta.json();
        return response.value;
    }

    //Quitar un dislike
    deleteAdislike = async (newsid) => {
        const url = 'http://localhost:5000/stats/dislikes/nosett';
        const userid = sessionStorage.getItem('userid')
        const data = {
            newsid: newsid,
            userid: userid,
        }
        const consulta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await consulta.json();
        return response.value;
    }

    //Obtener si una noticia tiene un like o un dislike
    getLikeorDislikeToNews = async (newsid) => {
        const userid = sessionStorage.getItem('userid');
        const url = `http://localhost:5000/stats/likes/${newsid}/${userid}`
        let consulta = await fetch(url);
        let response = await consulta.json();
        if (response.value) {
            return response.results;
        } else {
            return false;
        }
    }

    //Consultar las noticias mejor calificadas
    BestCalfList = async () => {
        const url = 'http://localhost:5000/stats/best/calificaties/news'
        let response = await fetch(url)
            .catch(error => { console.log('hay un error en obtener la lista de populares', error); });
        let data = await response.json();
        for (let i = 0; i < data.results.length; i++) {
            const comentario = await this.CommetsGetter(data.results[i].id);
            data.results[i].stats = {
                ...data.results[i].stats,
                comentarios: comentario.response.coments
            }
        }
        return data
    }

    //Obtener las estadisticas likes, dislikes y views de una notica por id
    StatsNewsGetter = async (id) => {
        const url = `http://localhost:5000/stats/${id}`
        let response = await fetch(url)
            .catch(error => console.log(`Error al tener estadisticas de la card ${id} = ${error}`));
        let data = await response.json()
        return data;

    }



}

export default StatsController;