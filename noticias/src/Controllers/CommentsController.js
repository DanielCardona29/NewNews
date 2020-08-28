class CommController {

    //Extraer el numero de likes de un commentario
    CommetsLikes = async (commentid, newsid) => {
        const url = `http://localhost:5000/news/comments/likes/${commentid}/${newsid}`;
        let consult = await fetch(url);
        let data = await consult.json();
        if (data.value && data.likes !== null) {
            return data.likes
        } else {
            return 0
        }
    }

    //Consult Like setter
    LikeConsultUser = async (commentid, newsid, userid) => {
        let url = `http://localhost:5000/news/comments/likes/${commentid}/${newsid}/${userid}`
        let consult = await fetch(url);
        let response = await consult.json()
        return response.value;
    }

    //Enviar un nuevo like
    LikeSetter = async (commentid, newsid, userid) => {
        const url = 'http://localhost:5000/news/comments/likes/';
        const data = {
            newsid: newsid,
            userid: userid,
            commentid: commentid,
        }

        const consulta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = consulta.json();
        console.log(consulta);
        return response.value;
    }

    //Actualizar el estado del Like en la base de datos
    LikeUpdater = async (commentid, newsid, userid, dataState) => {
        const url = 'http://localhost:5000/news/comments/likes/';
        if (dataState) {
            const data = {
                newsid: newsid,
                userid: userid,
                commentid: commentid,
                data: 1,
            }
            const consulta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await consulta.json();
            return response.value;
        } else {
            const data = {
                newsid: newsid,
                userid: userid,
                commentid: commentid,
                data: 0,
            }
            const consulta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await consulta.json();
            return response.value;
        }


    }


    //Enviar un like de un comentario
    LikeController = async (commentid, newsid, userid, dataState) => {
        //Antes de enviar un like o quitar un like tenemos que saber si existe en la base un registro de ello en la base de datos;
        let LikeConsultUser = await this.LikeConsultUser(commentid, newsid, userid);
        //Si el Like existe
        if (LikeConsultUser) {
            //Lo actualizamos
            const LikeUpdater = await this.LikeUpdater(commentid, newsid, userid, dataState);
            console.log(`este es el like updater`);
            return LikeUpdater;
        } else {
            //Si no existe, creamos uno nuevo
            const LikeSetter = await this.LikeSetter(commentid, newsid, userid);
            console.log(`este es el Like Setter ${LikeSetter}`);
            return LikeSetter;
        }

    }

}

export default CommController;