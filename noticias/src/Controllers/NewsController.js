class NewsController {

    //Consultar la lista de noticias completa
    CompletNewsList = async () => {
        const url = `http://localhost:5000/news`
        let response = await fetch(url)
            .catch(error => console.log(`Tenemos un error en la base de datos ${error}`))
        let data = await response.json()
        return data;
    }

}

export default NewsController;