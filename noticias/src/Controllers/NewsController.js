class NewsController {

    //Obtener las estadisticas likes, dislikes y views de una notica por id
    StatsNewsGetter = async (id) => {
        const url = `http://localhost:5000/news/stats/${id}`
        let response = await fetch(url)
            .catch(error => console.log(`Error al tener estadisticas de la card ${id} = ${error}`));
        let data = await response.json()
        return data;

    }

    //Obtener los comentarios de una noticia
    CommetsGetter = async (id) => {
        const url = `http://localhost:5000/news/comments/${id}`
        let response = await fetch(url)
            .catch(error => { console.log(`Hubo un error al extraer los comentarios de la noticia ${id} = ${error}`) })
        let data = await response.json();
        return data

    }

    //Obtener Obtenes las ultimas noticas registradas
    TenUltmateNewsListGetter = async () => {
        const url = `http://localhost:5000/news/ult/news`
        let response = await fetch(url)
            .catch(error => console.log(`Tenemos un error en la base de datos ${error}`))
        let data = await response.json()
        return data;
    }

    //Consultar una lista de 10 noticias
    TenUltmateNewsList = async () => {
        //Obtenemos la lista de noticias completa
        let data = await this.TenUltmateNewsListGetter();

        //Inicializando variables
        let stats = {}
        let comentarios = {}
        let dataOBJ = []
        for (let i = 0; i < data.results.length; i++) {
            //Extraemos las estadisticas de cada noticia por id
            stats = await this.StatsNewsGetter(data.results[i].id);
            //Extraemos el numero de comentarios de cada noticia por id
            comentarios = await this.CommetsGetter(data.results[i].id);
            dataOBJ = [
                ...dataOBJ,
                {
                    ...data.results[i],
                    stats: {
                        ...stats,
                        comentarios: comentarios.response.coments
                    },

                }
            ]

        }
        return { dataOBJ, value: true };
    }

    //Consultar las 10 noticias mas populares
    BestPopularList = async () => {

        const url = 'http://localhost:5000/news/best/popular/news'
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
        console.log(data);
        return data
    }

    //Consultar las noticias mejor calificadas
    BestCalfList = async () => {
        const url = 'http://localhost:5000/news/best/calificaties/news'
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
        console.log(data);
        return data
    }
}

export default NewsController;