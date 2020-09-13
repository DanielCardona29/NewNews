import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx'
import CommentNoUser from '../Comments/Presentar/CommentNoUser.jsx';
import ErrorPage from '../../Pages/ErrorPage.jsx';
import '../../Styles/App/infoUser/Pestas.scss'

const getDate = (dateInit) => {
    let fechaInicio = new Date(dateInit).getTime();
    let fechaFin = new Date().getTime();
    let diff = fechaInicio - fechaFin;
    const date = Math.abs(diff / (1000 * 60 * 60 * 24)).toFixed(0);
    return date
}

const Show = (props) => {
    try {
        const content = props.comments || [];
        const contenido = (
            <div>
                <ul>
                    {
                        content.map((item, key) => {
                            return <li key={key} className="Comenta">
                                <Link className="Link buttonAction" to={`/news/${item.comentario.idnewcoment}#comment${item.comentario.id}`}>
                                    <CommentNoUser
                                        content={item.content}
                                        countLikes={item.likes}
                                        puntua={item.comentario.Punt}
                                        Like={true}
                                        autor={item.autor ? item.autor.autor : props.username}
                                        time={getDate(item.comentario.date)}
                                        isOscuro={false}
                                        id={item.id}
                                        ComentsInfoUserShow={true}
                                    />
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

export default Show;