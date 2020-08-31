import React from 'react';
import swal from 'sweetalert';

import Footer from '../App/Footer/Footer.jsx';
import Loader from '../App/Loader/Loader.jsx';
import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import MainController from '../Controllers/mainController.js';
import NewsController from '../Controllers/NewsController.js';
import StatsController from '../Controllers/statsController.js';
import '../Styles/App/NewsDetail/News.scss';
import Commets from '../App/Comments/Commets.jsx';


class NewsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ok: true,
            NewElement: false,
            isNewLiked: false,
            isNewDisliked: false
        }
        this.Controller = new MainController();
        this.NewsController = new NewsController();
        this.statsController = new StatsController();
    }

    async componentDidMount() {
        let userInfo = await this.Controller.userConsult();
        let data = await userInfo.json();
        this.Controller.userVerifi(data.results[0].access)
            .then(access => {
                this.setState({
                    ...data.results[0],
                    ok: access
                })
            });

        //Ahora extraemos la noticia y la ponemos en el estado
        let NewDetail = await fetch(`http://localhost:5000/news/detail/${this.props.match.params.id}`);
        let response = await NewDetail.json();
        if (response.value) {
            //Extraemos el autor de la notica
            await this.NewsController.AutorController(response.results[0]).then(data => { this.setState({ NewElement: data }) })
        } else {
            this.setState({
                ...this.state,
                NewElement: false
            })
        }

        //Saber si la noticia tiene un like o un dislike
        await this.statsController.getLikeorDislikeToNews(this.props.match.params.id)
            .then(data => {
                console.log(data);
                if (data.likes > 0) {
                    this.setState({
                        isNewLiked: true,
                        isNewDisliked: false
                    })
                } else if (data.dislikes > 0) {
                    this.setState({
                        isNewLiked: false,
                        isNewDisliked: true
                    })
                }
            })

    }

    //Controllador de likes de una new enviar o quitar
    LikeController = async () => {
        if (!this.state.isNewLiked) {
            //Si la noticia no tiene el Like del usuario entonces le enviamos el like
            await this.statsController.settAlike(this.props.match.params.id)
                .then(data => {
                    console.log(data);
                    if (data) {
                        this.setState({
                            isNewLiked: true,
                            isNewDisliked: false
                        })
                    }
                    return data;
                });
        } else {
            //Si la noticia tiene un like entonces se lo borramos 
            await this.statsController.deleteAlike(this.props.match.params.id)
                .then(data => {
                    console.log(data);
                    if (data) {
                        this.setState({
                            isNewLiked: false,
                        })
                    }
                })
        }
    }
    //Controllador de likes de una new enviar o quitar
    DislikeController = async () => {
        if (!this.state.isNewDisliked) {
            //Si la noticia no tiene el Like del usuario entonces le enviamos el like
            await this.statsController.settAdislike(this.props.match.params.id)
                .then(data => {
                    if (data) {
                        this.setState({
                            isNewLiked: false,
                            isNewDisliked: true
                        })
                    }
                })
        } else {
            //Si la noticia tiene un like entonces se lo borramos 
            await this.statsController.deleteAdislike(this.props.match.params.id)
                .then(data => {
                    if (data) {
                        console.log(data);
                        this.setState({
                            isNewDisliked: false
                        })
                    }
                })
        }
    }

    render() {

        try {
            const imgStyle = {
                backgroundImage: `url('${this.state.NewElement.img}')`,
            }
            const loading = (
                <div className="loaderCenter">
                    <Loader />
                </div>
            );

            const Page = (
                <div className="container-fluid">
                    <div className="wrapper">
                        <Header userName={this.state.user} Ok={this.state.ok} />
                        <div className="contenidoWrapper">
                            {
                                (() => {
                                    if (this.state.isNewLiked) {
                                        return <div className="likeDisliked">
                                            <div className="like" onClick={() => this.LikeController()}></div>
                                            <div className="dislikedNoActive IconConten" onClick={() => this.DislikeController()}></div>
                                        </div>
                                    } else if (this.state.isNewDisliked) {
                                        return <div className="likeDisliked">
                                            <div className="likeNoActive IconConten" onClick={() => this.LikeController()}></div>
                                            <div className="dislikedActive IconConten" onClick={() => this.DislikeController()}></div>
                                        </div>
                                    } else {
                                        return <div className="likeDisliked">
                                            <div className="likeNoActive IconConten" onClick={() => this.LikeController()}></div>
                                            <div className="dislikedNoActive IconConten" onClick={() => this.DislikeController()}></div>
                                        </div>
                                    }
                                })()
                            }
                            <div className="newTitle">
                                <h2>{this.state.NewElement.title}</h2>
                            </div>
                            <div className="newImagen" style={imgStyle}></div>
                            <div className="newData">
                                <label className="label">
                                    <span className="negrita">Fecha de creación: </span>
                                    {this.state.NewElement.date}
                                </label>
                                <label className="label">
                                    <span className="negrita">Autor: </span>
                                    {this.state.NewElement.autor}
                                </label>
                            </div>
                            <div className="newContenido" id="newContenido">
                            </div>

                            <div className="newCalification"></div>
                            <div className="comments">
                                <Commets newid={this.state.NewElement.id} />
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            );

            if (this.state.ok) {
                if (this.state.NewElement) {
                    setTimeout(() => {
                        document.getElementById('newContenido').innerHTML = this.state.NewElement.content
                    }, 100);

                    return Page;
                } else {
                    return loading;
                }

            } else {
                swal({
                    text: 'No tienes permisos para estar en esta página',
                    button: 'Volver'
                }).then(value => {
                    sessionStorage.removeItem('userid');
                    this.setState({});
                    window.location.href = '/'
                })
                return <h1>Opps</h1>
            }

        } catch (error) {
            return <ErrorPage errorValue={error} value={true} />;
        }

    }
}

export default NewsPage;