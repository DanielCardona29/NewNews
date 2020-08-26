import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import $ from 'jquery'


import '../../Styles/App/Header/Header.scss';
import Config from './Configuracion.jsx';


const close = () => {


    swal({
        text: '¿Estas seguro que quieres salir?',
        buttons: true,
        dangerMode: true,
    })
        .then(value => {
            if (value) {
                sessionStorage.removeItem('userid');
                window.location.href = "/";
            }
        })
}
const Header = (props) => {
    const [Menu, setMenu] = useState(false);


    const changeState = () => {
        Menu ? closing() : setMenu(true)
    }

    const closing = () => {
        setTimeout(() => {
            setMenu(false)
        }, 300);
        $('#lateralB').addClass('classClose');

    }

    //Ocultar o no el menu lateral
    if(!Menu){
        $('#fuera').css('display','none')
    }else{
        $('#fuera').css('display','block')

    }


    
    const HeaderLogin = (
        <div className="headerContent">
            <div className="header">
                <div className="infoContent">
                    <Link to="/home" className="Link"><h3> New News</h3> </Link>
                </div>
                <div className="infoContent">
                    <div className="userName">
                        <label>{props.userName}</label>
                    </div>
                </div>
                <div className="infoContent">
                    <div className="icon">
                        <div className="config buttonAction" onClick={() => changeState()}></div>
                    </div>

                </div>
            </div>
            <div className="configBar fuera" id="fuera">

                {(() => {
                    if (Menu) {
                        return <Config
                            close={close}
                            state={Menu}
                            changeState={changeState}
                        />
                    }
                })()}

            </div>
        </div>

    );

    const noLoginUser = (
        <div className="header">
            <div className="infoContent">
                <Link to="/home" className="Link"> New News </Link>
            </div>
        </div>

    );

    if (props.Ok) {
        return HeaderLogin
    } else {
        return noLoginUser;
    }

}


export default Header;