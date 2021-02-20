import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import $ from 'jquery'


import '../../Styles/App/Header/Header.scss';
import Config from './Configuracion.jsx';
import AvatarController from '../../Controllers/AvatarController.js';

const Controller = new AvatarController();

const close = () => {
    swal({
        text: '¿Estas seguro que quieres salir?',
        buttons: true,
        dangerMode: true,
    })
        .then(value => {
            if (value) {
                sessionStorage.removeItem('__token');
                window.location.href = "/";
            }
        })
}

const redirect = () => {
    window.location.href = '/create'
}


const Header = (props) => {
    const [Menu, setMenu] = useState(false);
    const [Avatar, setAvatar] = useState('https://censur.es/wp-content/uploads/2019/03/default-avatar.png');

    //LLamado a la API
    useEffect(() => {
        Controller.gettAvatar().then(value => { setAvatar(value) });
    });


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
    if (!Menu) {
        $('#fuera').css('display', 'none')
    } else {
        $('#fuera').css('display', 'block')
    }
    const style = {
        backgroundImage: "url(" + Avatar + ")",
    }
    const HeaderLogin = (
        <div className="headerContent">
            <div className="header">
                <div className="infoContent">
                    <Link to="/home" className="Link"><h3> New News</h3> </Link>
                </div>
                {
                    (() => {
                        if (props.userName) {
                            return <div className="infoContent">
                                <div className="userName">
                                    <Link className="Link buttonAction" to="/user/info/">
                                        <div className="Avatar" style={style}>
                                        </div>
                                        {props.userName}</Link>
                                </div>
                            </div>
                        }
                    })()
                }


                <div className="infoContent">
                    <div className="icon">
                        <div className="create buttonAction" onClick={() => redirect()}></div>
                    </div>
                </div>

                <div className="infoContent">
                    <div className="icon">
                        <div className="config buttonAction" onClick={() => changeState()}></div>
                    </div>
                </div>

            </div>
            <div className="configBar fuera" id="fuera" >

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

    if (props.token) {
        return HeaderLogin
    } else {
        return noLoginUser;
    }

}


export default Header;