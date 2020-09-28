import StatsController from './statsController.js';
import swal from 'sweetalert';
import MainController from './mainController.js';
class NewsController extends StatsController {
  constructor() {
    super();
    this.MainController = new MainController();
  }

  //Obtener los comentarios de una noticia
  CommetsGetter = async (id) => {
    const url = `http://localhost:5000/comments/get/${id}`
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
  //Cosutlar si una noticia puede ser actualizada
  isUpdaterNew = async (id) => {
    const userid = sessionStorage.getItem('userid')
    const url = `http://localhost:5000/news/consult/${id}/${userid}`
    const element = await fetch(url)
      .then(element => {
        return element;
      })
    return element.json();
  }
  //Extrae todas las noticias
  ExtractNews = async () => {
    let url = `http://localhost:5000/news/ult/news`;
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
  //Extraer las noticias
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
  //Extraer el autor
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
  //Subir la imagen de una noticia
  UpdateAimage = async (urlImg) => {
    //Creanis la url
    const url = `http://localhost:5000/news/image/upload`;
    const formData = new FormData();
    const fileField = document.querySelector('#NewImage');
    //Si tenemos un archivo entonces lo procesamos 
    if (fileField.files[0]) {
      formData.append('url', '');
      formData.append('NewImage', fileField.files[0]);
      formData.append('isFile', true);
      const consulta = await fetch(url, {
        method: 'POST',
        body: formData
      })

      const response = await consulta.json();
      return response;

    } else if (urlImg) {
      //Si no entonces procesamos la url
      const data = {
        url: urlImg,
        isFile: false,
      }
      const consulta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const response = await consulta.json();
      return response;
    } else {
      swal({
        text: 'Pon la url o poner un archivo para continuar',
        button: 'Aceptar'
      })
    }

  }
  //Guardar una noticia en la base de datos
  saveAnew = async (data) => {
    if (data) {

      if (!data.id) {
        //Si no tenemos el id significa que la noticia que se 
        //va a guardar es nueva y no tenemos de un registro guardada en la base de datos
        const url = 'http://localhost:5000/news/set/';
        const userid = sessionStorage.getItem('userid')
        const newsOBJ = {
          title: data.title,
          content: data.data,
          img: data.img,
          aling: data.aling,
          userid: userid,
          ispublic: 'false'
        }
        const consulta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(newsOBJ),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const response = await consulta.json();
        console.log(response);
        return response;
      } else {
        //En caso de que tengamos el id entonces solo actualizamos en la base de datos
        let isPosibleSave = await this.isUpdaterNew(data.id)
          .then(value => {
            return value.value
          });
        if (isPosibleSave) {
          const url = `http://localhost:5000/news/save/${data.id}`;
          const userid = sessionStorage.getItem('userid')
          const newsOBJ = {
            id: data.id,
            title: data.title,
            content: data.data,
            img: data.img,
            userid: userid,
            aling: data.aling,
            ispublic: 'false'
          }
          const consulta = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(newsOBJ),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          const response = await consulta.json();
          console.log(response);

          return response;
        } else {
          return false
        }
      }
    } else {
      swal({ text: 'Al parecer tenemos datos intenta de nuevo por favor', button: 'Aceptar' })
    }
  }
  //Publicar una notica 
  PublicANew = async (data) => {

    if (data) {
      if (!data.id) {
        //Si no tenemos el id significa que la noticia que se 
        //va a guardar es nueva y no tenemos de un registro guardada en la base de datos
        const url = 'http://localhost:5000/news/set/';
        const userid = sessionStorage.getItem('userid')
        const newsOBJ = {
          title: data.title,
          content: data.data,
          img: data.img,
          aling: data.aling,
          userid: userid,
          ispublic: 'true'
        }
        const consulta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(newsOBJ),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const response = await consulta.json();
        return response;
      } else {
        //En caso de que tengamos el id entonces solo actualizamos en la base de datos
        const userid = sessionStorage.getItem('userid')
        const url = `http://localhost:5000/news/save/${data.id}`;
        const newsOBJ = {
          id: data.id,
          userid: userid,
          title: data.title,
          content: data.data,
          img: data.img,
          aling: data.aling,
          ispublic: 'true'
        }
        const consulta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(newsOBJ),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const response = await consulta.json();
        return response;
      }
    } else {
      swal({ text: 'Al parecer tenemos datos intenta de nuevo por favor', button: 'Aceptar' })
    }
  }
  //Eliminar una noticia
  deleteANew = async (id) => {
    const url = `http://localhost:5000/news/delete/${id}`

    const deleteMethod = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    }
    let consulta = await fetch(url, deleteMethod);
    let response = await consulta.json();
    return response.value;

  }

  //Sacar las noticias a las cuales un usuario le ha dado like
  userLikesNews = async (userid) => {
    const url = `http://localhost:5000/stats/userlikes/news/${userid}`
    const element = await fetch(url)
      .then(element => {
        return element.json();
      })
    let newsOBJ = []
    let stats = false;
    let comentarios = false
    for (let i = 0; i < element.results.length; i++) {
      //Extraemos las estadisticas de cada noticia por id
      stats = await this.StatsNewsGetter(element.results[i].newsid);
      //Extraemos el numero de comentarios de cada noticia por id
      comentarios = await this.CommetsGetter(element.results[i].newsid);
      const news = await this.MainController.newsConsult(element.results[i].newsid).then(value => { return value.results[0]; })
      newsOBJ = [
        ...newsOBJ,
        {
          news,
          stats,
          comentarios: comentarios.response.coments
        }
      ]
    }
    return newsOBJ;
  }
  //Extraer las noticias que ha escrito un usuario
  userWriteNews = async (userid) => {

    const url = `http://localhost:5000/news/userwrite/news/${userid}`
    const element = await fetch(url)
      .then(element => {
        return element.json();
      })
    let newsOBJ = []
    let stats = false;
    let comentarios = false
    for (let i = 0; i < element.results.length; i++) {
      //Extraemos las estadisticas de cada noticia por id
      stats = await this.StatsNewsGetter(element.results[i].id);
      //Extraemos el numero de comentarios de cada noticia por id
      comentarios = await this.CommetsGetter(element.results[i].id);
      newsOBJ = [
        ...newsOBJ,
        {
          news: element.results[i],
          stats,
          comentarios: comentarios.response.coments
        }
      ]
    }

    return newsOBJ
  }

  //Conusltar si es posible modificar una noticia
  isPosibleUpdateNews = async (newsid) => {
    const userid = sessionStorage.getItem('userid');
    const url = `http://localhost:5000/news/user/news/update/${userid}/${newsid}`;
    const consulta = await fetch(url)
    const response = await consulta.json();
    return response.value;
  }


}

export default NewsController;