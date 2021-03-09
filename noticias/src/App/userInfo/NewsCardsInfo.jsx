import React from 'react';
import { Link } from 'react-router-dom';
import '../../NewControllers/swiped.events';
import Loader from '../Loader/Loader.jsx'
import ErrorPage from '../../Pages/ErrorPage.jsx';
import '../../Styles/App/infoUser/Pestas.scss';
import NewsCard from '../NewsList/NewsCard.jsx';
import MainController from '../../NewControllers/main.controller'
import NewsController from '../../NewControllers/news.controller';
import swal from 'sweetalert';


const _NewsController = new NewsController();
const _MainController = new MainController();
const NewsCardsInfo = (props) => {



    try {
        const content = props.news || [];

        const Despublicar = async (id) => {

            const respuesta = await swal({
                text: 'Seguro/a que quiere despublicar',
                buttons: true,
            }).then(
                (res) => {
                    if (res) {
                        return true
                    }
                    return false
                }
            )

            if (respuesta) {

                const response = await _NewsController.dispublic(id)
                    .then((res) => {
                        if (res) {
                            swal({
                                text: 'Despublicado'
                            });

                            return true
                        } else {
                            swal({
                                text: 'Algo salió mal intente nuevamente'
                            });

                            return false
                        }
                    });
                return response;
            }
        }

        const publicar = async (id) => {


            const respuesta = await swal({
                text: 'Seguro/a que quiere publicar',
                buttons: true,
            }).then(
                (res) => {
                    if (res) {
                        return true
                    }
                    return false
                }
            )

            if (respuesta) {
                const response = await _NewsController.public(id)
                    .then((res) => {
                        if (res) {
                            swal({
                                text: 'Publicado'
                            });
                            return true

                        } else {
                            swal({
                                text: 'Algo salió mal intente nuevamente'
                            });
                            return false

                        }
                    });
                return response;
            }
        }


        const contenido = (



            <div>
                <ul className="NewsUserInfoRow">
                    {
                        content.map((item, key) => {
                            return (
                                <li key={key} className="NewsForUserInfo">
                                    <Link className="Link" to={`/news/${item.id}`}>
                                        <NewsCard date={_MainController.date(item.createdAt)}
                                            title={item.title}
                                            content={item.content}
                                            image={item.img}
                                            clave={key}
                                            id={item._id}
                                            views={item.views}
                                            comentarios={item.coments.length}
                                            likes={item.likes.userslist.length}
                                            dislikes={item.dislikes.userslist.length} />
                                    </Link>
                                    <div className="Cotenedor-Etiquetas buttonAction">

                                        <Link className="Link" to={`/update/${item._id}`}>
                                            <div className="button-icon">
                                                <div className="editar"></div>
                                                <div className="nombre">Editar</div>
                                            </div>
                                        </Link>
                                        {
                                            (() => {
                                                if (item.isPublic) {
                                                    return <div className="button-icon" onClick={async () => {
                                                        await Despublicar(item._id)
                                                            .then((res) => {
                                                                if (res) {
                                                                    window.location.reload()
                                                                }
                                                            })
                                                    }}>
                                                        <div className="despublicar"></div>
                                                        <div className="nombre">Despublicar</div>
                                                    </div>
                                                } else {
                                                    return <div className="button-icon" onClick={async () => {
                                                        await publicar(item._id)
                                                            .then((res) => {
                                                                if (res) {
                                                                    window.location.reload()
                                                                }
                                                            })
                                                    }}>
                                                        <div className="publicar"></div>
                                                        <div className="nombre">publicar</div>
                                                    </div>
                                                }
                                            })()
                                        }




                                        <Link className="Link" to={`/news/${item._id}`}>
                                            <div className="button-icon">
                                                <div className="ver"></div>
                                                <div className="nombre">Ver</div>
                                            </div>
                                        </Link>


                                        <div className="button-icon" onClick={
                                            async () => {
                                                let resp = await swal({
                                                    text: '¿Seguro/a que quieres eliminar esta noticia?',
                                                    buttons: true
                                                })

                                                if (resp) {
                                                    await _NewsController.delete(item._id)
                                                        .then((value) => {
                                                            if (value) {
                                                                window.location.reload();
                                                            }
                                                        })
                                                }
                                            }
                                        }>
                                            <div className="trash"></div>
                                            <div className="nombre">Eliminar</div>
                                        </div>

                                    </div>

                                </li>
                            )
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