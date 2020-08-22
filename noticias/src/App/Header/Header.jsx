import React from 'react';
import '../../Styles/App/Header/Header.scss';

const Header = (props) => {

    const HeaderLogin = (
        <div className="header">
            <div className="title">
                <h2>New News</h2>
            </div>
            <div className="userInfo">
                <div className="userName">
                    <label>{props.userName}</label>
                </div>
            </div>
            <div className="config">

            </div>
            <div className="salir">
            
            </div>
        </div>
    );

    return HeaderLogin;
}


export default Header;