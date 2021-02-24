import React from 'react';
import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import NewsList from '../App/NewsList/NewsList';
import Footer from '../App/Footer/Footer.jsx';

import MainController from '../NewControllers/main.controller';

const _MainController = new MainController();

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: true,
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
            user: userInfo.result.user
        })
    }

    render() {

        const Page = (
            <div className="container-fluid">
                <div className="wrapper">
                    <Header userName={this.state.user} token={this.state.token} />
                    <div className="contenidoWrapper">
                        <div className="wrapperListContent">
                            <h2>Ultimas subidas</h2>
                            <NewsList id={'lista1'} search={'LastTen'} />
                        </div>
                        <div className="wrapperListContent">
                            <h2>Mas populares</h2>
                            <NewsList id={'lista2'} search={'BestPopulars'} />
                        </div>
                        <div className="wrapperListContent">
                            <h2>Mejores calificadas</h2>
                            <NewsList id={'lista3'} search={'BestCalification'} />
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