import React from 'react';
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader.jsx'
import ErrorPage from '../../Pages/ErrorPage.jsx';
import '../../Styles/App/infoUser/Pestas.scss';
import NewsCard from '../NewsList/NewsCard.jsx';
import MainController from '../../NewControllers/main.controller'
const _MainController = new MainController();
const NewsCardsInfo = (props) => {
    try {
        const content = props.news || [];
        console.log(content);
        const contenido = (
            <div>
                <ul className="NewsUserInfoRow">
                    {
                        content.map((item, key) => {
                            console.log(item);
                            return <li key={key} className="NewsForUserInfo">
                                <Link className="Link buttonAction" to={`/news/${item.id}`}>
                                    <NewsCard date={_MainController.date(item.createdAt)}
                                        title={item.title}
                                        content={item.content}
                                        image={item.img}
                                        clave={key}
                                        id={item._id}
                                        views={item.viwes}
                                        comentarios={item.coments.length}
                                        likes={item.likes.userslist.length}
                                        dislikes={item.dislikes.userslist.length} />
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