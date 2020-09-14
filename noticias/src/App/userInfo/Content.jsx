import React from 'react';
import $ from 'jquery';

import '../../Styles/App/infoUser/Pestas.scss'

const oscurecer = (item) => {
    $(`#NG`).css('background-color', '');
    $(`#NES`).css('background-color', '');
    $(`#CMYL`).css('background-color', '');
    $(`#YCMS`).css('background-color', '');
    $(`#${item}`).css('background-color', '#2ba3f3');
}


const Pesta = (props) => {
    oscurecer(props.oscurecer);

    return (
        <div className="pestasContent">
            <div id="NG" className="tab buttonAction" onClick={() => props.NG()}>
                <label>Noticias que te gustaron</label>
            </div>
            <div id="NES" className="tab buttonAction" onClick={() => props.NES()}>
                <label>Noticias que escribiste</label>
            </div>
            <div id="CMYL" className="tab buttonAction" onClick={() => props.CMYL()}>
                <label>Comentarios que te gustaron</label>
            </div>
            <div id="YCMS" className="tab buttonAction" onClick={() => props.YCMS()}>
                <label>tus comentarios</label>
            </div>
        </div>
    );
}

export default Pesta