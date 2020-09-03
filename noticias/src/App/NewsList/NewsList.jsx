import React from 'react';
import { Link } from 'react-router-dom'

import NewsCard from './NewsCard';
import Button from '../Buttons/Buttons.jsx';
import Loader from '../Loader/Loader.jsx';
import NewsController from '../../Controllers/NewsController.js';
import ErrorPage from '../../Pages/ErrorPage.jsx';
import '../../Styles/App/Buttons/Buttons.scss';


class NewsList extends React.Component {

    constructor(props) {
        super(props);
        //Instanciamos la clase controller con nosotros
        this.NewsController = new NewsController();
        this.state = {
            newsState: false,
            scroll: 0,
            maxScroll: 0,
            contador: 0,
        }
    }

    //Hacer el scroll a la lista
    ScrollLeft = (direction) => {
        if (direction) {
            document.getElementById(this.props.id).scroll({ top: 0, left: this.state.scroll + 400, behavior: 'smooth' });
            if (this.state.scroll < this.state.maxScroll)
                this.setState({
                    ...this.state,
                    scroll: this.state.scroll + 400
                });

        } else {
            document.getElementById(this.props.id).scroll({ top: 0, left: this.state.scroll - (400), behavior: 'smooth' })
            if (this.state.scroll > 0)
                this.setState({
                    ...this.state,
                    scroll: this.state.scroll - 400
                });
        }

    }

    async componentDidMount() {

        if (this.props.search === 'LastTen') {
            await this.NewsController.TenUltmateNewsList()
                .then(data => {

                    if (data.value)
                        this.setState({
                            newsState: data.dataOBJ,
                            maxScroll: (data.dataOBJ.length * 400) / 2
                        })
                });

        } else if (this.props.search === 'BestPopulars') {
            this.NewsController.BestPopularList()
                .then(data => {
                    if (data.value)
                        this.setState({
                            newsState: data.results,
                            maxScroll: (data.results.length * 400) / 2
                        })
                })
        } else if (this.props.search === 'BestCalification') {
            this.NewsController.BestCalfList()
                .then(data => {
                    if (data.value)
                        this.setState({
                            newsState: data.results,
                            maxScroll: (data.results.length * 400) / 2
                        })
                })
        }
    }

    render() {

        try {
            if (this.state.newsState) {
                let NewsList = (
                    <div className="listaWrapper">
                        <Button type={'button'} content={''} classType={'round next'} click={() => this.ScrollLeft(true)} id={'next'} name={'next'} />

                        <ul id={this.props.id} className="lista">

                            {this.state.newsState.map((item, key) => {

                                const card = (
                                    <li key={key}>
                                        <Link to={`/news/${item.id}`} className="Link linkHover">
                                            <NewsCard
                                                date={item.date}
                                                title={item.title}
                                                content={item.content}
                                                image={item.img}
                                                clave={key}
                                                id={item.id}
                                                views={item.stats.views}
                                                comentarios={item.stats.comentarios}
                                                likes={item.stats.likes}
                                                dislikes={item.stats.dislikes}
                                            />
                                        </Link>
                                    </li>

                                )
                                    return card

                            })}


                        </ul>
                        <Button type={'button'} content={''} classType={'round last'} click={() => this.ScrollLeft(false)} id={'last'} name={'last'} />

                    </div>
                );
                return NewsList;
            } else {
                return <Loader />
            }
        } catch (error) {
            return <ErrorPage errorValue={error} />
        }


    }
}

export default NewsList;