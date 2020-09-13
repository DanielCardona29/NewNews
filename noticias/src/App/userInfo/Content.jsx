import React from 'react';

import '../../Styles/App/infoUser/Pestas.scss'

const Pesta = (props) => {
    return (
        <div className="pestasContent">

            <div id="NG" className="tab buttonAction oscuro" onClick={() => props.NG()}>
                <label>Noticias que te gustaron</label>
            </div>
            <div id="NES" className="tab buttonAction oscuro" onClick={() => props.NES()}>
                <label>Noticias que escribiste</label>
            </div>
            <div id="CMYL" className="tab buttonAction oscuro" onClick={() =>props.CMYL()}>
                <label>Comentarios que te gustaron</label>
            </div>
            <div id="YCMS" className="tab buttonAction oscuro" onClick={() =>props.YCMS()}>
                <label>tus comentarios</label>
            </div>
           
        </div>
    );
}

export default Pesta