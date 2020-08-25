
class NewsController {

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

export default NewsController