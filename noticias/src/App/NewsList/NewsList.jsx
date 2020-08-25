import React from 'react';
import NewsCard from './NewsCard';


import NewsController from '../../Controllers/NewsController.js'


class NewsList extends React.Component {

    constructor(props) {
        super(props);
        //Instanciamos la clase controller con nosotros
        this.NewsController = new NewsController();
        this.state = {
            RecientNews: []
        }
    }

    async componentDidMount() {
        await this.NewsController.CompletNewsList()
            .then(data => {
                if (data.value)
                    this.setState({
                        RecientNews: data.results
                    })
            });
    }

    render() {


        const NewsList = (
            <ul>
                {this.state.RecientNews.map((item, key) => {
                    const card = (
                        <li key={key}>
                            <NewsCard
                                date={item.date}
                                title={item.title}
                                content={item.content}
                                image={item.img}
                                clave = {key}
                                id ={item.id}
                                views={6555}
                                comments={555}
                                likes={9999}
                                dislikes={6666}
                            />
                        </li>

                    )
                    return card

                })}
            </ul>
        );

        return NewsList;
    }
}

export default NewsList;