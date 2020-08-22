import React from 'react';
import '../../Styles/App/Header/Header.scss';

const Header = (props) => {

    const HeaderLogin = (
        <div className="header">
            <div className="infoContent">
                <h3>New News</h3>
            </div>
            <div className="infoContent">
                <div className="userName">
                    <label>{props.userName}</label>
                </div>
            </div>
            <div className="infoContent">
                <div className="icon buttonAction">
                    <div className="config"></div>
                </div>
                <div className="icon buttonAction">
                    <div className="salir"></div>
                </div>
            </div>
        </div>
    );

    return HeaderLogin;
}


export default Header;