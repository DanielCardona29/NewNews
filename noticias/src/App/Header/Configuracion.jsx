import React from 'react';

import '../../Styles/App/Header/Header.scss';

const Config = (props) => {
    const infoUser = () =>{
        const userid = sessionStorage.getItem('userid');
        window.location.href = `/user/info/${userid}`;
    }

    if (!props.state) {
    }

    return (

        <div className="configBar dentro">
            <div className="lateralA" onClick={props.changeState}></div>

            <div className="lateralB" id="lateralB">
                <div className="Configwrapper">
                    <ul>
                        <li>
                            <label className="buttonAction" onClick={() => window.location.href = "/home"}>Home</label>
                        </li>
                        <li>
                            <label className="buttonAction">Ajustes</label>
                        </li>
                        <li>
                            <label className="buttonAction" onClick={() => infoUser()}>Información del usuario</label>
                        </li>
                        <li>
                            <label className="buttonAction">Acerca de</label>
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