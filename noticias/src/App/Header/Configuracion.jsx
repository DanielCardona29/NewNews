import React from 'react';

import '../../Styles/App/Header/Header.scss';


const Config = (props) => {
    const infoUser = () =>{
        const userid = sessionStorage.getItem('userid');
        window.location.href = `/user/info/${userid}`;
    }

    const crear = () =>{
        window.location.href = `/create`;
    }

    return (

        <div className="configBar dentro">
            <div className="lateralA" onClick={props.closer}></div>

            <div className="lateralB" id="lateralB">
                <div className="Configwrapper">
                    <ul>
                        <li>
                            <label className="buttonAction" onClick={() => window.location.href = "/home"}>Home</label>
                        </li>
                        <li>
                        <label className="buttonAction" onClick={() => crear()}>Crear una noticia</label>
                        </li>
                        <li>
                            <label className="buttonAction" onClick={() => infoUser()}>Información del usuario</label>
                        </li>
                        <li>
                        </li>
                        <li>
                            <label className="buttonAction" onClick={props.close}>Salir</label>
                        </li>
                    </ul>



                </div>
            </div>
        </div>
    );

}

export default Config;