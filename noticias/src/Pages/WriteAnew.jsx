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
                id: false,
                aling: 'left',
                user: '',
                img: '',
                ispublic: false,
                data: '<p>Empieza a escribir tu noticia aquí</p>',
                title: ''
            },
            tabsOpen: false
        }
        this.Controller = new MainController();
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
    //Este carga la imagen a la api
    updateImage = async () => {
        await this.NewsController.UpdateAimage(this.state.urlUPDATE)
            .then(value => {
                console.log(value);
                this.setState({
                    urlUPDATE: '',
                    form: {
                        ...this.state.form,
                        img: value.url
                    }
                })
            })
    }
    //Este cambiar el estado del cotenido
    onEditorChange(e) {
        this.setState({
            form: {
                ...this.state.form,
                data: e.editor.getData()
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
    //Aqui guardamos una noticia en la base de datos
    saveAnew = async () => {
        if (this.state.form.data !== '<p>Empieza a escribir tu noticia aquí</p>' || this.state.form.img !== '' || this.state.form.title !== '') {
            let consulta = await this.NewsController.saveAnew(this.state.form)
                .then(value => {
                    if (value.value || value.id) {
                        this.setState(
                            {
                                form: {
                                    ...this.state.form,
                                    id: value.id
                                }
                            }
                        )
                        //Guardamos el estado en el local storage 
                        const NewSaveNew = { value: true, id: `${value.id}`, title: value.title };
                        localStorage.setItem('isNewCreating', JSON.stringify(NewSaveNew));
                        swal({
                            text: 'Datos guardados correctamente',
                            button: 'Aceptar'
                        });

                        return true;
                    } else {
                        swal({
                            text: 'Al parecer no tienes permisos para actualizar este contenido',
                            button: 'Aceptar'
                        }).then(value => {
                            localStorage.removeItem('isNewCreating');
                            window.location.href = '/home';
                        })
                    }
                })

            return consulta;
        } else {
            swal({ text: 'no tienes ningun tipo de contenido para guardar' })
            return false
        }
    }
    //Publicar una noticia
    publicAnew = async () => {
        if (this.state.form.data === '<p>Empieza a escribir tu noticia aquí</p>' || this.state.form.data === '' || this.state.form.img === '' || this.state.form.title === '') {
            swal({ text: 'Al parecer te faltan datos para publicar' })
        } else {
            await this.NewsController.PublicANew(this.state.form)
                .then(value => {
                    if (value.value) {
                        swal({
                            text: 'Tu noticia se publicó correctamente ¿Quieres verla en producción?',
                            buttons: true
                        }).then(response => {
                            if (response) {
                                window.location.href = `/news/${value.id || this.state.id}`
                            }
                        })
                    } else {
                        swal({
                            text: 'Error desconocido intenta nuevamente mas tarde por favor',
                            button: true
                        });
                    }
                })
        }

    }
    //Eliminar borrador 
    deleteBorrador = () => {
        swal({
            text: '¿Esta seguro que quiere eliminar el borrador?',
            buttons: true
        }).then((value) => {
            if (value) {
                localStorage.removeItem('isNewCreating');
                swal({
                    text: '¿Volver al home?',
                    buttons: true
                }).then(response => {
                    if (response) {
                        window.location.href = '/home';
                    } else {
                        window.location.reload();
                    }
                })
            }
        })
    }
    //Eliminar una noticia que esta siendo escrita
    deleAwritingNew = async () => {
        const deleter = async () => {
            if (this.state.form.id) {
                await this.NewsController.deleteANew(this.state.form.id)
                    .then(response => {
                        console.log(response);
                        if (response) {

                            swal({
                                text: 'La noticia se eliminó correctamente',
                                button: 'Aceptar'
                            }).then((value) => {
                                localStorage.removeItem('isNewCreating');
                                window.location.href = '/home';
                            })
                        }
                    })
            }
        }

        swal({
            text: 'Quieres eliminar este borrador ?',
            buttons: true
        })
            .then(value => {
                if (value) {
                    deleter();
                }
            });
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
        //Verificamos si el usuario estaba creando una noticia
        const isNewEditing = JSON.parse(localStorage.getItem('isNewCreating'));
        if (isNewEditing) {
            if (isNewEditing.value) {
                await this.Controller.newsConsult(isNewEditing.id)
                    .then(news => {
                        if (news.value) {
                            const formOBJ = {
                                id: news.results[0].id,
                                aling: news.results[0].aling,
                                img: news.results[0].img,
                                data: news.results[0].content,
                                title: news.results[0].title,
                                ispublic: news.results[0].ispublic
                            }
                            this.setState({
                                form: {
                                    user: this.state.form.user,
                                    ...formOBJ
                                }
                            })
                        }
                    })
            }
        }
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
                                img={this.state.form.img}
                                title={this.state.form.title}
                                aling={this.state.form.aling}
                                chageAling={this.alingAjust}
                                saver={this.saveAnew}
                                deleter={this.deleAwritingNew}
                                publicAnew={this.publicAnew}
                                deleteBorr={this.deleteBorrador}
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