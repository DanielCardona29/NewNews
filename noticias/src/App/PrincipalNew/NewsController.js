
class NewsController {

    ExtractNews = async () => {
        let url = `http://localhost:5000/news/`;
        let data = await fetch(url);
        const response = await data.json();
        data = {
            datos: await response.results,
            value: response.value
        }
        return data;
    }


    ExtractAutor = async (id) => {
        let url = `http://localhost:5000/users/${id}`;
        let data = await fetch(url);
        const response = await data.json();
        data = {
            datos: await response.results[0],
            value: response.value
        }
        return data;
    }
}

export default NewsController