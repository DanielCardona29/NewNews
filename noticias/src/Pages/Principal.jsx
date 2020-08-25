import React from 'react';
import swal from 'sweetalert';

// import Button from '../App/Buttons/Buttons.jsx';
import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import NewsList from '../App/NewsList/NewsList';


import MainController from '../Controllers/mainController.js';

const Controller = new MainController();

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ok: true
        }
        this.Controller = Controller;
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
            })
    }

    render() {

        const Page = (
            <div className="container-fluid">
                <div className="wrapper">

                    <Header userName={this.state.user} Ok={this.state.ok} />


                    <div className="contenidoWrapper">
                        <div className="recientes">
                            <NewsList />

                        </div>
                    </div>
                </div>
            </div >
        );

        try {
            if (this.state.ok) {

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


export default Principal;