import React from 'react';
import swal from 'sweetalert';

import Button from '../Buttons/Buttons.jsx'
import '../../Styles/App/Avatar/AvatarSpected.scss';
import AvatarController from '../../NewControllers/avatar.controller.js';
import AvatarCreator from './AvatarCreator.jsx'
import UserController from '../../NewControllers/user.controller';


class AvatarUser extends React.Component {
    constructor(props) {
        super(props);
        this.AvatarController = new AvatarController();
        this.UserController = new UserController();
        this.state = {
            visualice: false,
            avatar: '',
            kindOfFomr: false,
            fomConfing: {}
        }
    };
    //Mostrar el formulario para subir una foto
    showCreator = (kind) => {
        if (this.state.visualice) {
            this.setState({ visualice: false, kindOfFomr: kind })
            document.body.style.overflow = "auto"
        } else {
            this.setState({ visualice: true, kindOfFomr: kind })
            window.scrollTo(0, 0);
            document.body.style.overflow = "hidden";

        }
    };

    //Cambair el estado del formulario
    onChange = e => {
        this.setState({
            fomConfing: {
                ...this.state.fomConfing,
                [e.target.name]: e.target.value,
            }
        })

    };



    render() {
        const AvatarImage = (
            <div className="Content" onMouseOver={() => this.AvatarController.showButtons()} onMouseOut={() => this.AvatarController.hiddenButtons()}>
                <div className="avatar" >
                    <img src={this.props.avatar} className="img img-circle" alt="Avatar" />
                </div>
                <AvatarCreator
                    visualice={this.state.visualice}
                    avatar={this.props.avatar}
                    Config={this.state.fomConfing}
                    setavatar={this.props.setavatar}
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
    };
}


export default AvatarUser