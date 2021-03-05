import React from 'react';
import { Link } from 'react-router-dom'

import NewsCard from './NewsCard';
import Button from '../Buttons/Buttons.jsx';
import Loader from '../Loader/Loader.jsx';
import ErrorPage from '../../Pages/ErrorPage.jsx';
import '../../Styles/App/Buttons/Buttons.scss';


class NewsList extends React.Component {

    constructor(props) {
        super(props);
        //Instanciamos la clase controller con nosotros
        this.state = {
            newsState: false,
            scroll: 0,
            maxScroll: 0,
            contador: 0,
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