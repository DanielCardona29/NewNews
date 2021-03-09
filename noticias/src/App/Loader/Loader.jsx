import React from 'react'

import '../../Styles/App/Loader/Loader.scss'
const Loader = (props) => {

    if (props.content) {
        const loader = (
            <div className="loader-Wrapper">
                <div className="loader"><div></div></div>
                <h5>Cargando {props.content}</h5>
            </div>);

        return loader;
    }else if (props.little) {
        return <div className="loader loader-little"><div></div></div>
    } else {
        return <div className="loader"><div></div></div>
    }
}

export default Loader;