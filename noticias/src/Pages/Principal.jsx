
import Footer from '../App/Footer/Footer.jsx';
import NewsCard from '../App/NewsList/NewsCard';
import MainController from '../NewControllers/main.controller';
import NewsController from '../NewControllers/news.controller';
import Loader from '../App/Loader/Loader';
import React from 'react';
import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';

import '../Styles/Principales/animations.scss';
import '../Styles/Principales/Home.scss';


const _NewsController = new NewsController();
const _MainController = new MainController();

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            token: true,
            avatar: false,
            loading: true
        }
        this._MainController = _MainController;

    }

    async componentDidMount() {
        let tokenValidate = await this._MainController.tokenValidate();
        let userInfo = await this._MainController.Consulta('user', sessionStorage.getItem('__token'), 'GET');
        if (!tokenValidate) {
            this.setState({
                token: false,
            });
        }

        //Vamos a importar las lista de todoas las noticias
        const consult = await _NewsController.allNews(sessionStorage.getItem('__token'));
        this.setState({
            newsList: consult.news,
            loading: false,
            token: true,
            user: userInfo.result.user,
            avatar: userInfo.result.avatar,
        })


    }


    render() {

        const Page = (
            <div className="container-fluid">
                <div className="wrapper">
                    <Header userName={this.state.user} token={this.state.token} avatar={this.state.avatar} />
                    <div className="contenidoWrapper">
                        <div className="wrapperListContent">

                            {
                                this.state.newsList.map((item, key) => {
                                    const card = <NewsCard
                                        date={
                                            this._MainController.date(item.updatedAt)
                                        }
                                        key={key}
                                        title={item.title}
                                        content={item.content}
                                        image={item.img}
                                        clave={key}
                                        id={item._id}
                                        views={item.views}
                                        comentarios={item.coments.lenght}
                                        likes={item.likes.userslist.length}
                                        dislikes={item.dislikes.userslist.length}
                                    />
                                    return card;

                                })
                            }

                        </div>

                    </div>
                    <Footer />
                </div>
            </div >
        );

        try {
            if (this.state.token) {

                if (this.state.loading) {
                    const loader = (
                        <div className="wrapper-Loader">
                            <Header userName={this.state.user} token={this.state.token} avatar={this.state.avatar} />
                            <div className="Center">
                                <Loader />
                            </div>
                        </div>
                    )
                    return loader

                } else {
                    return Page;
                }

            } else {
                return <h1>Opps</h1>
            }

        } catch (error) {
            return <ErrorPage errorValue={error} value={true} />;
        }
    }
}


export default Principal;