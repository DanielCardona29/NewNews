
import MainController from './mainController';
import swal from 'sweetalert';

class StatsController extends MainController {
    //Saber si un usuario tiene una visita registrada en en una noticia

    visitController = async (newsid, userid) => {
        const ulr = `http://localhost:5000/news/visit/consult/${newsid}/${userid}`;
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
        const url = 'http://localhost:5000/news/visit/';
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



}

export default StatsController;