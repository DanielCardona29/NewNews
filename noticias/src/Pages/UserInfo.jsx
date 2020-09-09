import React from 'react';
import swal from 'sweetalert';


import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import '../Styles/Principales/UserInfo.scss';
import Footer from '../App/Footer/Footer.jsx';
import MainController from '../Controllers/mainController.js';
import AvatarUser from '../App/Avatar/Avatar.jsx';


class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.Controller = new MainController();
        this.state = {
            ok: true
        }
    }

    async componentDidMount() {
        let userInfo = await this.Controller.userConsult();
        let data = await userInfo.json();
        if (data.results) {
            this.Controller.userVerifi(data.results[0].access)
                .then(access => {
                    this.setState({
                        ...data.results[0],
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