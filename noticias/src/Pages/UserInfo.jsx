import React from 'react';
import swal from 'sweetalert';


import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import '../Styles/Principales/UserInfo.scss';
import Footer from '../App/Footer/Footer.jsx';
import MainController from '../Controllers/mainController.js';
import AvatarUser from '../App/Avatar/Avatar.jsx';
import Info from '../App/userInfo/UserInfo.jsx';
import Content from '../App/userInfo/Content.jsx'
import CommController from '../Controllers/CommentsController.js';
import NewsController from '../Controllers/NewsController.js';
import Show from '../App/userInfo/showder.jsx';
import NewsCardsInfo from '../App/userInfo/NewsCardsInfo.jsx'

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.CommController = new CommController();
        this.Controller = new MainController();
        this.NewsController = new NewsController();
        this.state = {
            info: {},
            oscurecer: 'NG',
            contenido: false,
            cotnenidoNews: false,
            ok: true,
            isLoading: false
        }
    }

    //Extraer los comentairos que un usuario le dio like
    UserLikesExtractsComments = async () => {
        this.setState({ isLoading: true, oscurecer: 'CMYL' })
        const data = await this.CommController.extractComentsLikesUser(sessionStorage.getItem('userid')) || false;
        let CommentsOBJ = [];
        const userid = sessionStorage.getItem('userid')
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let autor = await this.NewsController.ExtractAutor(data[i].idusercoment);
                let Likes = await this.CommController.CommetsLikes(data[i].id, data[i].idnewcoment);
                let isLiked = await this.CommController.LikeConsultUser(data[i].id, data[i].idnewcoment, userid);
                if (isLiked === true)
                    CommentsOBJ = [
                        ...CommentsOBJ,
                        {
                            comentario: data[i],
                            likes: Likes,
                            autor: autor,
                            isLiked: isLiked,
                            CommentPositon: i
                        }
                    ]
            }
            this.setState({
                contenido: CommentsOBJ,
                CommetsNum: CommentsOBJ.length
            })
        }
        this.setState({ isLoading: false })
    }

    //Extraer los comentarios que ha escrito un usuairo
    extractUserComments = async () => {
        this.setState({ isLoading: true, oscurecer: 'YCMS' })
        const data = await this.CommController.extractUserComments(sessionStorage.getItem('userid')) || false;
        let CommentsOBJ = [];
        const userid = sessionStorage.getItem('userid')
        if (data) {
            for (let i = 0; i < data.length; i++) {
                let Likes = await this.CommController.CommetsLikes(data[i].id, data[i].idnewcoment);
                let isLiked = await this.CommController.LikeConsultUser(data[i].id, data[i].idnewcoment, userid);
                if (isLiked === true)
                    CommentsOBJ = [
                        ...CommentsOBJ,
                        {
                            comentario: data[i],
                            likes: Likes,
                            isLiked: isLiked,
                            CommentPositon: i
                        }
                    ]
            }
            this.setState({
                contenido: CommentsOBJ,
                cotnenidoNews: false
            })
        }
        this.setState({ isLoading: false })
    }

    //Extraer las noticias que le gustaron a un usuairo
    userLikesNews = async () => {
        this.setState({ isLoading: true, oscurecer: 'NG' })
        await this.NewsController.userLikesNews(sessionStorage.getItem('userid'))
            .then(value => {
                console.log(value);
                this.setState({
                    cotnenidoNews: value,
                    contenido: false
                })
            })

        this.setState({ isLoading: false })
    }

    //Extaer las noticias del usuairo
    usernewsWrited = async () => {
        this.setState({ isLoading: true, oscurecer: 'NES' })
        await this.NewsController.userWriteNews(sessionStorage.getItem('userid'))
            .then(value => {
                console.log(value);
                this.setState({
                    cotnenidoNews: value,
                    contenido: false
                })
            })
        this.setState({ isLoading: false })
    }

    async componentDidMount() {
        let userInfo = await this.Controller.userConsult();
        let data = await userInfo.json();
        if (data.results) {
            this.Controller.userVerifi(data.results[0].access)
                .then(access => {
                    if (access) {
                        this.userLikesNews();
                    }
                    this.setState({
                        info: data.results[0],
                        ok: access
                    })
                });

        }


    }

    render() {
        const Page = (
            <div className="container-fluid">
                <div className="wrapper">

                    <Header userName={this.state.user} Ok={this.state.ok} />
                    <div className="container" >
                        <div className="container-fluid userinfo" >

                            <div className="avatar">
                                <AvatarUser />
                            </div>
                            <div className="userContent">
                                <Info info={this.state.info} />
                            </div>

                            <div className="Cotenido">
                                <Content
                                    CMYL={this.UserLikesExtractsComments || false}
                                    YCMS={this.extractUserComments || false}
                                    NG={this.userLikesNews || false}
                                    NES={this.usernewsWrited || false}
                                    oscurecer={this.state.oscurecer}

                                />
                            </div>

                            {
                                (() => {
                                    if (this.state.contenido) {
                                        return (
                                            <div className="showder">
                                                <Show
                                                    comments={this.state.contenido}
                                                    username={this.state.info.user}
                                                    isLoading={this.state.isLoading} />
                                            </div>
                                        )
                                    } else if (this.state.cotnenidoNews) {
                                        return (
                                            <div className="showder">
                                                <NewsCardsInfo news={this.state.cotnenidoNews}
                                                    isLoading={this.state.isLoading} />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className="NoContenido">
                                                <h5>No hay contenido</h5>
                                            </div>
                                        );
                                    }
                                })()
                            }

                        </div>
                    </div>
                    <Footer />
                </div>
            </div >
        );

        try {
            const userid = sessionStorage.getItem('userid');
            if (this.state.ok && userid) {

                return Page;

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

export default UserInfo; 