import React from 'react'

import '../../Styles/App/Loader/Loader.scss'
const Loader = (props) => {

    if (props.content) {
        const loader = (
            <div className="loaderWrapper">
                <div className="loader"><div></div></div>
                <h5>Cargando {props.content}</h5>
            </div>);

        return loader;
    } else {
        return <div className="loader"><div></div></div>
    }
}

export default Loader;