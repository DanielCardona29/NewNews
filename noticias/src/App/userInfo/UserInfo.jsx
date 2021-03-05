import React, { useState } from 'react';
import Button from '../Buttons/Buttons.jsx';
import '../../Styles/App/infoUser/infoUser.scss';
import AvatarCreator from '../Avatar/AvatarCreator.jsx';
import MainController from '../../Controllers/mainController.js';
import swal from 'sweetalert';
import UserController from '../../NewControllers/user.controller';


const _UserController = new UserController();

const Controller = new MainController();
const Info = (props) => {
    const [state, setState] = useState({
        form: {
            newPass: false,
            oldPass: false,
            passVerfi: false,
        },
        visualice: false,
        kindOfFomr: 'passChanger'
    })

    //Mostrar el formulario para subir una foto
    const showCreator = (kind) => {
        if (state.visualice) {
            setState({ ...state, visualice: false, kindOfFomr: kind })
            document.body.style.overflow = "auto"

        } else {
            setState({ ...state, visualice: true, kindOfFomr: kind })
            window.scrollTo(0, 0)
            document.body.style.overflow = "hidden"

        }
    }
    //
    const onChange = e => {
        setState({
            ...state,
            form: {
                ...state.form,
                [e.target.name]: e.target.value,
            }
        })
    }
    //Cambiar la contraseña
    const passChanger = async () => {
        //primero verificamos que los campos existan
        if (state.form.newPass && state.form.passVerfi) {

            if (state.form.newPass === state.form.passVerfi) {
                const consulta = await _UserController.changePass(state.form.newPass);
                if(consulta.value){
                    swal({text:'Todo salio correcto'})
                }
            } else {
                swal({
                    text: 'Las contraseñas no coinciden'
                })
            }

        } else {
            swal({
                text: 'Debes llenar todos los campos'
            })
        }

    }


    const page = (
        <div className="contenedorInfo">
            <AvatarCreator
                visualice={state.visualice}
                hidden={showCreator}
                onChange={() => onChange}
                kindOfFomr={state.kindOfFomr}
                passChange={() => passChanger()} />

            <div className="object">
                <label><b>Usuario:</b> {props.info.user}</label>
            </div>
            <div className="object">
                <label><b>Correo:</b> {props.info.email}</label>
            </div>
            <div className="object">
                <Button type={'button'} content={'Cambiar Contraseña'} classType={'Mybtn btn4'} click={() => showCreator('passChanger')} id={'newButton'} name={'newButton'} />
            </div>
        </div>
    );
    return page;
}

export default Info;