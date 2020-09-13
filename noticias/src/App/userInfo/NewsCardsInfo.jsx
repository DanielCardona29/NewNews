import React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader.jsx'
import ErrorPage from '../../Pages/ErrorPage.jsx';
import '../../Styles/App/infoUser/Pestas.scss';
import NewsCard from '../NewsList/NewsCard.jsx';

const NewsCardsInfo = (props) => {
    try {
        const content = props.news || [];
        const contenido = (
            <div>
                <ul className="NewsUserInfoRow">
                    {
                        content.map((item, key) => {
                            return <li key={key} className="NewsForUserInfo">
                                <Link className="Link buttonAction" to={`/news/${item.news.id}`}>
                                    <NewsCard date={item.news.date}
                                        title={item.news.title}
                                        content={item.news.content}
                                        image={item.news.img}
                                        clave={key}
                                        id={item.news.id}
                                        views={item.stats.views}
                                        comentarios={item.comentarios}
                                        likes={item.stats.likes}
                                        dislikes={item.stats.dislikes} />
                                </Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        );

        const noCotnenido = (
            <div className="NoContenido">
                <h5>No hay contenido</h5>
            </div>
        )
        if (props.isLoading) {
            return <Loader content={'comentarios'} />
        } else {
            if (!content || content.length <= 0) {
                return noCotnenido;
            } else {
                return contenido;
            }

        }

    } catch (error) {
        return <ErrorPage errorValue={error} value={true} />;
    }
}

export default NewsCardsInfo;