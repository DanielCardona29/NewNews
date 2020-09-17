import React, { useState } from 'react';
import Button from '../Buttons/Buttons.jsx';
import '../../Styles/App/infoUser/infoUser.scss';
import AvatarCreator from '../Avatar/AvatarCreator.jsx';
import MainController from '../../Controllers/mainController.js';
import swal from 'sweetalert';


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
        if (state.form.newPass && state.form.passVerfi && state.form.oldPass) {
            //Primero verificamos que las contraseñas cumplan con los requisitos del sistema
            const verificar = Controller.passVerifi(state.form.newPass, state.form.passVerfi);
     
            //En caso de que la verificación sea correcta verificamos que la contraseña que la contraseña anterior que escribio el usuario sea correcta
            if (verificar) {
                //Entonces validamos que la contraseña antigua se haya escrito bien
                const oldPass = await Controller.olPassVerifi(props.info.user, state.form.oldPass);
                
                if (oldPass) {


                    const Changer = await Controller.passChanger(state.form.newPass, state.form.oldPass);
                    if (Changer) {
                        swal({ text: 'La contraseña ha cambiado exitosamente' }).then(value => {
                            sessionStorage.removeItem('userid');
                            window.location.href = '/'
                        })
                    }
                }else{
                    swal({
                        text: 'Tu contraseña actual no es correcta'
                    })
                }
            }else{
                swal({
                    text: 'tu contraseña actual no es correcta'
                })
            }
        } else {
            swal({
                text: 'debes llenar primero todos los campos'
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
            <div className="object">
                <label><b>Acceso:</b> {props.info.access}</label>
            </div>
        </div>
    );
    return page;
}

export default Info;