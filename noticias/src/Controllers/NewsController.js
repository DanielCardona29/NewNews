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
    return data
  }
  //Extrae todas las noticias
  ExtractNews = async () => {
    let url = `http://localhost:5000/news/`;
    let data = await fetch(url);
    const response = await data.json();

    if (response.value)
      data = {
        datos: await response.results,
        value: response.value,
        size: await response.results.length
      }
    return data;
  }
  //Extrae el autor de una noticia y reentrona la noticia con el nombre del autor
  ExtractAutor = async (id) => {
    let url = `http://localhost:5000/users/${id}`;
    let data = await fetch(url);
    const response = await data.json();
    data = {
      autor: await response.results[0].user,
      value: response.value,
    }
    return data;
  }


  NewsController = async (contador) => {

    const noticia = await this.ExtractNews()
      //En caso de que tengamos un error no enviamo a la cosola
      .catch((error) => console.log("tenemos un error: ", error))
      //si obtenemos una respuesta del servidor entonces los tratamos
      .then((noticia) => {
        //Verificamos que tengamos la varible noticias
        if (noticia.value) {
          //ahora hacemos que nuestra app muestre mas noticias que las que tenemos
          if (contador < noticia.datos.length) {

            //reentornamos los datos
            return {
              ...noticia.datos[contador],
              size: noticia.size
            };

          } else {
            //En caso de que no tengamos los datos reentornamos un falso
            return { value: false };
          }
        } else {
          //En el caso de que no tengamos la variable reentornamos un falso
          return { value: false };
        }
      });
    return noticia
  }

  AutorController = async (noticia) => {
    const element = await this.ExtractAutor(noticia.userid)
      .catch((error) => {
        console.log(`Hubo un error en la base de datos ${error}`);
      })
      .then((data) => {
        return {
          ...noticia,
          ...data,
        };
      });
    return element;
  }

}

export default NewsController;