import React from 'react';
import swal from 'sweetalert';


import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import '../Styles/Principales/UserInfo.scss';
import Footer from '../App/Footer/Footer.jsx';
import MainController from '../NewControllers/main.controller';
import AvatarUser from '../App/Avatar/Avatar.jsx';
import Info from '../App/userInfo/UserInfo.jsx';
import Content from '../App/userInfo/Content.jsx'
import CommController from '../Controllers/CommentsController.js';
import NewsController from '../NewControllers/news.controller.js';
import Show from '../App/userInfo/showder.jsx';
import NewsCardsInfo from '../App/userInfo/NewsCardsInfo.jsx'
import UserController from '../NewControllers/user.controller';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this._UserController = new UserController();
        this.CommController = new CommController();
        this._MainController = new MainController();
        this.NewsController = new NewsController();
        this.state = {
            info: {},
            oscurecer: 'NES',
            contenido: false,
            cotnenidoNews: false,
            token: true,
            isLoading: false
        }
    }

    //Extaer las noticias del usuairo
    usernewsWrited = async () => {
        this.setState({ isLoading: true, oscurecer: 'NES' })
        await this.NewsController.userWriteNews(sessionStorage.getItem('userid'))
            .then(value => {
                this.setState({
                    cotnenidoNews: value,
                    contenido: false
                })
            })
        this.setState({ isLoading: false })
    }

    async componentDidMount() {
        let tokenValidate = await this._MainController.tokenValidate();
        let userInfo = await this._MainController.Consulta('user', sessionStorage.getItem('__token'), 'GET');
        if (!userInfo || !tokenValidate) {
            this.setState({
                token: false,
            });

        }
        this.setState({
            token: true,
            name: userInfo.result.user,
            info: {
               
               ...userInfo.result,

            }
        });

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
            if (this.state.token) {
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