import React from 'react';
import Button from '../Buttons/Buttons.jsx';
import '../../Styles/App/infoUser/infoUser.scss';

const Info = (props) => {
    const page = (
        <div className="contenedorInfo">
            <div className="object">
                <label><b>Usuario:</b> {props.info.user}</label>
            </div>
            <div className="object">
                <label><b>Correo:</b> {props.info.email}</label>
            </div>
            <div className="object">
                <Button type={'button'} content={'Cambiar Contraseña'} classType={'Mybtn btn4'} click={() => 'hola'} id={'newButton'} name={'newButton'} />
            </div>
            <div className="object">
                <label><b>Acceso:</b> {props.info.access}</label>
            </div>
        </div>
    );
    return page;
}

export default Info;