import React from 'react';
import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import NewsList from '../App/NewsList/NewsList';
import Footer from '../App/Footer/Footer.jsx';
import NewsCard from '../App/NewsList/NewsCard';
import MainController from '../NewControllers/main.controller';
import NewsController from '../NewControllers/news.controller';
import Loader from '../App/Loader/Loader'

const _NewsController = new NewsController();
const _MainController = new MainController();

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsList: [],
            token: true,
            avatar: false
        }
        this._MainController = _MainController;

    }

    async componentDidMount() {
        let tokenValidate = await this._MainController.tokenValidate();

        let userInfo = await this._MainController.Consulta('user', sessionStorage.getItem('__token'), 'GET');
        console.log(userInfo.result);
        if (!tokenValidate) {

            this.setState({
                token: false,
            });

        }

        this.setState({
            token: true,
            user: userInfo.result.user,
            avatar: userInfo.result.avatar,
        });


        //Vamos a importar las lista de todoas las noticias
        const consult = await _NewsController.allNews(sessionStorage.getItem('__token'));
        console.log(consult);
        this.setState({
            newsList: consult.news
        })


    }
    //renderizado de noticias
    renderNews() {

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
                                    console.log(item._id);
                                    const card = <NewsCard
                                        date={
                                            this._MainController.date(item.updatedAt)
                                        }
                                        title={item.title}
                                        content={item.content}
                                        image={item.img}
                                        clave={key}
                                        id={item._id}
                                        views={item.viwes}
                                        comentarios={item.coments.lenght || 0}
                                        likes={item.likes.userslist.lenght || 0}
                                        dislikes={item.dislikes.userslist.lenght || 0}
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

                return Page;

            } else {
                return <h1>Opps</h1>
            }

        } catch (error) {
            return <ErrorPage errorValue={error} value={true} />;
        }
    }
}


export default Principal;