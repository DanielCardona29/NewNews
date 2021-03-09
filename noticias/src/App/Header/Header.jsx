import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import $ from 'jquery'
import '../../NewControllers/swiped.events';

import '../../Styles/App/Header/Header.scss';
import Config from './Configuracion.jsx';
import Loader from '../Loader/Loader';

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

    const closing = () => {
        setTimeout(() => {
            setMenu(false)
        }, 300);
        $('#lateralB').addClass('classClose');

    }

    const button = () => {
        if(Menu){
            closing();
        }else{
            setMenu(true);
        }
    }


    


    //Ocultar o no el menu lateral
    if (!Menu) {
        $('#fuera').css('display', 'none')
    } else {
        $('#fuera').css('display', 'block')
    }
    const style = {
        backgroundImage: "url(" + props.avatar || + ")",
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
                        }else{
                            return <div className="infoContent">
                                <div className="userName">
                                    <Loader little={true} />
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
                        <div className="config buttonAction" onClick={() => button()}></div>
                    </div>
                </div>

            </div>
            <div className="configBar fuera" id="fuera" >

                {(() => {
                    if (Menu) {
                        return <Config
                            state={Menu}
                            closer={() => setMenu(false)}
                            close={() => close()}
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
        document.addEventListener('swiped-right', () => setMenu(true))
        document.addEventListener('swiped-left', () => closing())

        return HeaderLogin
    } else {
        return noLoginUser;
    }

}


export default Header;