import React from 'react';

import swal from 'sweetalert';

// import Button from '../App/Buttons/Buttons.jsx';
import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import '../Styles/Principales/Creater.scss';
import Footer from '../App/Footer/Footer.jsx';
import MainController from '../Controllers/mainController.js';

import NewsController from '../Controllers/NewsController.js';

//Importamos los componetes de nuestra pagina 
import ImageUpdater from '../App/Creater/ImageUpdater.jsx';
import CKEditor from 'ckeditor4-react';
import Preview from '../App/Creater/Preview.jsx';
import TitleCreater from '../App/Creater/titleCreater.jsx';


class NewWriter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ok: true,
            urlUPDATE: '',
            form: {
                aling: 'left',
                user: '',
                image: '',
                data: '<p>React is really <em>nice</em>!</p>',
                title: ''
            }
        }
        this.Controller = new MainController();
        this.NewsController = new NewsController();
        this.handleChange = this.handleChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);

    }


    handleChangeUpdater = (e) => {
        this.setState({
            urlUPDATE: e.target.value.trim(),
        });
    }

    updateImage = async () => {
        await this.NewsController.UpdateAimage(this.state.urlUPDATE)
            .then(value => {
                console.log(value);
                this.setState({
                    urlUPDATE: '',
                    form: {
                        ...this.state.form,
                        image: value.url
                    }
                })
            })
    }


    onEditorChange(e) {
        this.setState({
            form: {
                ...this.state.form,
                data: e.editor.getData()
            }

        });
    }

    handleChange(e) {
        this.setState({
            form: {
                ...this.state.form,
                data: e.target.value
            }
        });
    }

    handleChangeTitle = e => {
        this.setState({
            form: {
                ...this.state.form,
                title: e.target.value
            }
        });
    }

    alingAjust = (aling) => {
        if (aling === 'center') {
            this.setState({
                form: {
                    ...this.state.form,
                    aling: 'center'
                }
            });
        } else if (aling === 'left') {
            this.setState({
                form: {
                    ...this.state.form,
                    aling: 'left'
                }
            });
        } if (aling === 'right') {
            this.setState({
                form: {
                    ...this.state.form,
                    aling: 'right'
                }
            });
        }
    }

    async componentDidMount() {
        let userInfo = await this.Controller.userConsult();
        let data = await userInfo.json();
        this.setState({
            form: {
                ...this.state.form,
                user: data.results[0].user
            }
        })
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
                        <div className="title">
                            <h4>Escribir una noticia</h4>
                        </div>

                        <div className="imgeUpdater">
                            <ImageUpdater valueUrlUPDATE={this.state.urlUPDATE}
                                onUpdaterChange={() => this.handleChangeUpdater}
                                updateImage={() => this.updateImage()} />
                        </div>
                        <div className="TitleCreater">
                            <TitleCreater valueTitle={this.state.form.title} onChange={() => this.handleChangeTitle} />
                        </div>

                        <div className="textEditor">
                            <CKEditor
                                data={this.state.form.data}
                                onChange={this.onEditorChange} />

                        </div>

                        <div className="preview">
                            <Preview data={this.state.form.data}
                                autor={this.state.form.user}
                                img={this.state.form.image}
                                title={this.state.form.title}
                                aling={this.state.form.aling}
                                chageAling={this.alingAjust}
                                />
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


export default NewWriter;