import React from 'react';
import swal from 'sweetalert';

import Button from '../Buttons/Buttons.jsx'
import '../../Styles/App/Avatar/AvatarSpected.scss';
import AvatarController from '../../Controllers/AvatarController.js';
import AvatarCreator from './AvatarCreator.jsx'

class AvatarUser extends React.Component {
    constructor(props) {
        super(props);
        this.AvatarController = new AvatarController();
        this.state = {
            visualice: false,
            avatar: '',
            kindOfFomr: false,
            fomConfing: {}
        }
    }
    //Mostrar el formulario para subir una foto
    showCreator = (kind) => {
        this.state.visualice ? this.setState({ visualice: false, kindOfFomr: kind }) : this.setState({ visualice: true, kindOfFomr: kind });
    }
    //Cambair el estado del formulario
    onChange = e => {
        this.setState({
            fomConfing: {
                ...this.state.fomConfing,
                [e.target.name]: e.target.value,
            }
        })
    }
    //Subir una imagen
    updateImage = async () => {
        await this.AvatarController.putNewImage()
            .then(value => {
                console.log(value);
                if (value) {
                    this.setState({
                        avatar: value,
                        visualice: false,
                    })
                } else {
                    swal({ text: 'No se pudo subir, intenta de nuevo por favor!', button: 'Aceptar' })
                }
            });
    }
    //cambiar un avatar
    changeCaracter = async (url) => {
        await this.AvatarController.putNewAvatar(url)
            .then(value => {
                if (value) {
                    console.log(value);
                    this.setState({
                        visualice: false,
                        avatar: value
                    })
                } else {
                    swal({ text: 'No se pudo subir, intenta de nuevo por favor!', button: 'Aceptar' })
                }
            });
    }
    async componentDidMount() {
        //Lo primero que hacemos es saber si el usuario  un avatar registrador r
        await this.AvatarController.gettAvatar()
            .then(value => {
                if (value) {
                    this.setState({
                        avatar: value
                    })
                } else {
                    this.AvatarController.newAvatar()
                        .then(value => {
                            if (value.value) {
                                this.setState({
                                    avatar: value.url
                                });
                            }
                        });
                }
            })

    }

    render() {
        const AvatarImage = (
            <div className="Content" onMouseOver={() => this.AvatarController.showButtons()} onMouseOut={() => this.AvatarController.hiddenButtons()}>
                <div className="avatar" >
                    <img src={this.state.avatar} className="img img-circle" ></img>
                </div>
                <AvatarCreator
                    visualice={this.state.visualice}
                    avatar={this.state.avatar}
                    Config={this.state.fomConfing}
                    hidden={this.showCreator}
                    onChange={() => this.onChange}
                    onUpdate={this.updateImage}
                    onChangeCaracte={this.changeCaracter}
                    kindOfFomr={this.state.kindOfFomr}
                />
                <div className="Buttons" id="buttons">
                    <Button type={'button'} content={'Subir foto'} classType={'Mybtn btn1'} click={() => this.showCreator('img')} id={'subir'} name={'subir'} />
                    <Button type={'button'} content={'Crear Avatar'} classType={'Mybtn btn1'} click={() => this.showCreator(false)} id={'create'} name={'create'} />
                </div>
            </div>
        )
        return AvatarImage
    }
}


export default AvatarUser