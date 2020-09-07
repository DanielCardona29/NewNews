import React from 'react';
import $ from 'jquery';

const changeColor = (key, state) => {
    state ? $(`.rayita${key}`).addClass('rojo') : $(`.rayita${key}`).removeClass('rojo');
}

const labelMove = (key, state) => {
    state ? $(`#label${key}`).addClass('moveText') : $(`#label${key}`).removeClass('moveText');
}

const Pesta = (props) => {
    const page = (
        <div className="tabContainer">
            {
                props.tabs.map((item, key) => {
                    if (item.id === props.tapActual) {
                        return (
                            <div key={key} className="tab tabActual buttonAction" onClick={() => props.changerTab(item.id)}>
                                <div className="ColseAndTextConten">
                                    <label id={`label${key}`} onMouseOver={() => labelMove(key, true, item.title)} onMouseOut={() => labelMove(key, false)}>{item.title || 'Nueva noticia'}</label>

                                    <div className="icoPest buttonAction" onMouseOver={() => changeColor(key, true)} onMouseOut={() => changeColor(key, false)} onClick={() => props.closer(item.id)}>
                                        <div className={`rayita${key} rayita`}></div>
                                        <div className={`rayita${key} rayita`}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={key} className="tab buttonAction" onClick={() => props.changerTab(item.id)}>
                                <div className="ColseAndTextConten">
                                    <label id={`label${key}`} onMouseOver={() => labelMove(key, true, item.title)} onMouseOut={() => labelMove(key, false)}>{item.title || 'Nueva noticia'}</label>

                                    <div className="icoPest xClara buttonAction" onMouseOver={() => changeColor(key, true)} onMouseOut={() => changeColor(key, false)} onClick={() => props.closer(item.id)}>
                                        <div className={`rayita${key} rayita`}></div>
                                        <div className={`rayita${key} rayita`}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                })
            }
            {/*Botton para crea un un nuevo tab*/}
            <div className="createNewtab buttonAction" onClick={() => props.creater()}>
                <div className="icoPest">
                    <div className={`rayita`}></div>
                    <div className={`rayita`}></div>
                </div>
            </div>
        </div>
    );

    return page;
}


class Hola { //Guerdar en el storage enviar tap

        //Guardar una noticia por medio de la barra de pestañas
        tabSaver = async () => {
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
                            const storage = JSON.parse(localStorage.getItem('isNewCreating')) || [];
                            const NewSaveNew = { value: true, id: `${value.id}`, title: value.title };
                            this.storagesaverSettTab(storage, NewSaveNew);
                            return true;
                        } else {
                            return false;
                        }
                    })
    
                return consulta;
            }
        }
    storagesaverSettTab = (storage, NewSaveNew) => {
        let ObjsTabs = [];
        let comparador = false
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].id === NewSaveNew.id) {
                comparador = true
            }
        }
        console.log(ObjsTabs);
        if (!comparador) {
            localStorage.setItem('isNewCreating', JSON.stringify([...storage, NewSaveNew]));
            this.setState({
                tabsOpen: ObjsTabs
            })
        }
    }
    //Guardar en el storage
    storagesaverDeletTab = (id) => {
        const storage = JSON.parse(localStorage.getItem('isNewCreating')) || [];
        let ObjsTabs = [];
        for (let i = 0; i < storage.length; i++) {
            if (storage[i].id !== id) {
                ObjsTabs = [
                    ...ObjsTabs,
                    storage[i]
                ]
            }
        }
        console.log(ObjsTabs);
        localStorage.setItem('isNewCreating', JSON.stringify(ObjsTabs));
        this.setState({
            tabsOpen: ObjsTabs
        })
    }
    //Cerrar una pestaña
    tabCloser = (id) => {
        const comparador = parseInt(id);
        if (typeof parseInt(id) === "number") {
            console.log(typeof parseInt(id));
            if (this.state.form.data !== '<p>Empieza a escribir tu noticia aquí</p>' || this.state.form.img !== '' || this.state.form.title !== '') {
                swal({
                    text: 'Desea guardar los datos?',
                    buttons: true
                })
                    .then(value => {
                        if (value) {
                            this.tabSaver();
                            //Guardamos el estado en el local storage 
                            const storage = JSON.parse(localStorage.getItem('isNewCreating')) || [];
                            let newObj = [];
                            for (let i = 0; i < storage.length; i++) {
                                if (storage[i].id !== id) {
                                    newObj = [
                                        ...newObj,
                                        storage[i]
                                    ]
                                }
                            }
                            localStorage.setItem('isNewCreating', JSON.stringify([
                                ...newObj,
                            ]));

                        } else {
                            this.storagesaverDeletTab(id);
                        }
                    })
            } else {
                this.storagesaverDeletTab(id);
            }
        } else {
            this.storagesaverDeletTab(id);
        }

    }
    //Crear una pestaña
    tabCreater = async () => {
        await this.tabSaver()
            .then(value => {
                if (value) {
                    const isNewCreating = JSON.parse(localStorage.getItem('isNewCreating'));
                    const NewsCreatingOBJ = [
                        ...isNewCreating,
                        {
                            value: true,
                            id: `newTab${isNewCreating.length + 1}`,
                            title: 'Neva pestaña'
                        }
                    ]
                    localStorage.setItem('isNewCreating', JSON.stringify(NewsCreatingOBJ));
                    this.setState({
                        form: {
                            id: false,
                            aling: 'left',
                            user: '',
                            img: '',
                            ispublic: false,
                            data: '<p>Empieza a escribir tu noticia aquí</p>',
                            title: ''
                        },
                        tabsOpen: JSON.parse(localStorage.getItem('isNewCreating'))
                    })
                } else {
                    const isNewCreating = JSON.parse(localStorage.getItem('isNewCreating'));
                    const NewsCreatingOBJ = [
                        ...isNewCreating,
                        {
                            value: true,
                            id: `newTab${isNewCreating.length + 1}`,
                            title: 'Neva pestaña'
                        }
                    ]
                    localStorage.setItem('isNewCreating', JSON.stringify(NewsCreatingOBJ));
                    this.setState({
                        form: {
                            id: false,
                            aling: 'left',
                            user: '',
                            img: '',
                            ispublic: false,
                            data: '<p>Empieza a escribir tu noticia aquí</p>',
                            title: ''
                        },
                        tabsOpen: JSON.parse(localStorage.getItem('isNewCreating'))
                    })

                }

            })
    }
    //Cambiar de pestaña
    changeTab = async (id) => {
        console.log(id);
        if (id) {
            await this.Controller.newsConsult(id)
                .then(news => {
                    if (news.value) {
                        const formOBJ = {
                            id: `${news.results[0].id}`,
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
                    } else {
                        this.setState({
                            form: {
                                id: id,
                                aling: 'left',
                                user: '',
                                img: '',
                                ispublic: false,
                                data: '<p>Empieza a escribir tu noticia aquí</p>',
                                title: `Nueva ventana ${id}`
                            }
                        })
                    }
                })
        } else {
            this.setState({
                form: {
                    id: id,
                    aling: 'left',
                    user: '',
                    img: '',
                    ispublic: false,
                    data: '<p>Empieza a escribir tu noticia aquí</p>',
                    title: ''
                }
            })
        }
    }


}
export default Pesta;