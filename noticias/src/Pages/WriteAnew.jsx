import React from 'react';

import swal from 'sweetalert';

// import Button from '../App/Buttons/Buttons.jsx';
import ErrorPage from './ErrorPage.jsx';
import Header from '../App/Header/Header.jsx';
import '../Styles/Principales/Home.scss';
import '../Styles/Principales/Creater.scss';
import Footer from '../App/Footer/Footer.jsx';

//Importamos los componetes de nuestra pagina 
import ImageUpdater from '../App/Creater/ImageUpdater.jsx';
import CKEditor from 'ckeditor4-react';
import Preview from '../App/Creater/Preview.jsx';
import TitleCreater from '../App/Creater/titleCreater.jsx';
import MainController from '../NewControllers/main.controller';
import NewsController from '../NewControllers/news.controller';

class NewWriter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            token: true,
            avatar: false,
            user: false,
            urlUPDATE: '',
            form: {
                id: false,
                aling: 'center',
                user: '',
                img: '',
                ispublic: false,
                data: '',
                content: '<p>Empieza a escribir tu noticia aquí</p>',
                title: ''
            },
            tabsOpen: false
        }
        this._MainController = new MainController();
        this.NewsController = new NewsController();
        this.handleChange = this.handleChange.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);

    }

    //Este cambia el estado para gurdar la noticia
    handleChangeUpdater = (e) => {
        this.setState({
            urlUPDATE: e.target.value.trim(),
        });
    }

    //Este cambiar el estado del cotenido
    onEditorChange(e) {
        this.setState({
            form: {
                ...this.state.form,
                content: e.editor.getData()
            }

        });
    }

    //Este ajusta el estado del contenido
    handleChange(e) {
        this.setState({
            form: {
                ...this.state.form,
                data: e.target.value
            }
        });
    }
    
    //Este cambia el estado del titulo
    handleChangeTitle = e => {
        this.setState({
            form: {
                ...this.state.form,
                title: e.target.value
            }
        });
    }
    
    //este ajusta el la alineacion del texto 
    aling = (aling) => {
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

    //Eliminar una noticia que esta siendo escrita
    delete = async () => {
        const id = this.state.form.id || false;
        if (!id) {
            swal({ text: 'Debe guardar la noticia para eliminarla' });
        }
        swal({
            text: '¿Quiere eliminar este borrador?',
            buttons: true
        })
            .then(value => value ? this.NewsController.delete(id) : null)
            .then(value => {
                if (value) {
                    swal({
                        text: 'Eliminado correctamente'
                    })
                    this.setState({
                        form: {
                            id: false,
                            aling: 'center',
                            user: '',
                            img: '',
                            ispublic: false,
                            data: '',
                            content: '<p>Empieza a escribir tu noticia aquí</p>',
                            title: ''
                        }
                    })
                }
            })
            .catch(err => console.log(err))
    }

    //Este carga la imagen a la api
    updateImage = async () => {
        //Hacemos muestra consulta a la API
        await this.NewsController.uploadImage('progressbar')
            .then(value => {
                //Si el valor es verdadero Enviamos nuestra url de nuestra imagen a el estado
                if (value) {
                    this.setState({
                        form: {
                            ...this.state.form,
                            img: value.data.url
                        }
                    });
                    //Si el valor es falso enviamos la url que esta en el campo de texto
                } else if (this.state.urlUPDATE.trim() !== "" || this.state.urlUPDATE) {
                    this.setState({
                        form: {
                            ...this.state.form,
                            img: this.state.urlUPDATE,
                            urlUPDATE: ''
                        }
                    });
                } else {
                    //Encaso de que no tenga url o imagen enviamos el faltan datos

                    swal({
                        text: 'Faltan datos'
                    })
                }
            })
    }

    //Aqui guardamos una noticia en la base de datos
    save = async () => {
        if (this.state.form.content === '<p>Empieza a escribir tu noticia aquí</p>' || this.state.form.content === '' || this.state.form.img === '' || this.state.form.title === '') {
            swal({ text: 'Al parecer te faltan datos para publicar' })
        } else {
            const response = await this.NewsController.save({
                id: this.state.form.id,
                content: this.state.form.content,
                title: this.state.form.title,
                img: this.state.form.img,
                aling: this.state.form.aling,
            });
            let id = response.ID || response.response._id
            if (id) {
                this.setState({
                    form: {
                        ...this.state.form,
                        id: id
                    }
                })
            }

        }
    }

    //Publicar una noticia
    publisher = async () => {
        if (this.state.form.content === '<p>Empieza a escribir tu noticia aquí</p>' || this.state.form.content === '' || this.state.form.img === '' || this.state.form.title === '') {
            swal({ text: 'Al parecer te faltan datos para publicar' })
        } else {
            await this.save();
            await this.NewsController.public(this.state.form.id)
                .then(val => val ? swal({ text: 'Publicado correctamente' }) : swal({ text: 'Error al publicar' }))
                .then(val => swal({ text: 'Quieres ver tu articulo', buttons: true }))
                .then(value => {
                    if (value) {
                        window.location.href = `/news/${this.state.form.id}`;
                        this.setState({
                            form: {
                                id: false,
                                aling: 'center',
                                user: '',
                                img: '',
                                ispublic: false,
                                data: '',
                                content: '<p>Empieza a escribir tu noticia aquí</p>',
                                title: ''
                            }
                        });

                    }
                })
                .catch(err => {
                    console.error(err)
                    swal({ text: 'Error desconocido intente nuevamente' })
                });
        };

    }

    eraserDelete() {
        swal({
            text: 'Seguro/a que quieres eliminar',
            buttons: true
        })
            .then(val => {
                if (val) {

                    localStorage.removeItem('isEditing');
                    window.location.reload()
                }
            })
    }
    //Cargamos nuestro contenido en 
    async componentDidMount() {
        let tokenValidate = await this._MainController.tokenValidate();

        let userInfo = await this._MainController.Consulta('user', sessionStorage.getItem('__token'), 'GET');
        if (!tokenValidate || !userInfo ) {
            this.setState({
                token: false,
            });

        }
        this.setState({
            token: true,
            user: userInfo.result.user,
            avatar: userInfo.result.avatar,
            form: {
                ...this.state.form,
                user: userInfo.result.user,

            }
        })

        //Verificamos si el usuario estaba creando una noticia
        const id = localStorage.getItem('isEditing');
        if (id) {
            const result = await this.NewsController.findNew(id);
            console.log(result);
            if (result) {
                //Enviamos nuestra consulta al estado

                return this.setState({
                    form: {
                        ...this.state.form,
                        id: result._id,
                        aling: result.aling,
                        img: result.img,
                        ispublic: result.isPublic,
                        data: result.content,
                        content: result.content,
                        title: result.title
                    }
                })
            }

            return localStorage.removeItem('isEditing')
        }
    }

    render() {

        const Page = (
            <div className="container-fluid">
                <div className="wrapper">
                    <Header userName={this.state.user} token={this.state.token} avatar={this.state.avatar} />
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
                            <Preview data={this.state.form.content}
                                autor={this.state.form.user}
                                img={this.state.form.img}
                                title={this.state.form.title}
                                aling={this.state.form.aling}
                                chageAling={this.aling}

                                //Funcion para guardar
                                saver={this.save}

                                //Funcion para publicar
                                publisher={this.publisher}

                                //Funcion para eliminar
                                deleter={this.delete}

                                //Funcion para elimianr
                                deleteBorr={this.eraserDelete}
                            />
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


export default NewWriter;