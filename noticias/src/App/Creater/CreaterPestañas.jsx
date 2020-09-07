import React from 'react';
import $ from 'jquery';

const changeColor = (key, state) => {
    state ? $(`.rayita${key}`).addClass('rojo') : $(`.rayita${key}`).removeClass('rojo');
}

const labelMove = (key, state) => {
    state ? $(`#label${key}`).addClass('moveText') : $(`#label${key}`).removeClass('moveText');
}

const Pesta = (props) => {
    const page = (
        <div className="tabContainer">
            {
                props.tabs.map((item, key) => {
                    if (item.id === props.tapActual) {
                        return (
                            <div key={key} className="tab tabActual buttonAction" onClick={() => props.changerTab(item.id)}>
                                <div className="ColseAndTextConten">
                                    <label id={`label${key}`} onMouseOver={() => labelMove(key, true, item.title)} onMouseOut={() => labelMove(key, false)}>{item.title || 'Nueva noticia'}</label>

                                    <div className="icoPest buttonAction" onMouseOver={() => changeColor(key, true)} onMouseOut={() => changeColor(key, false)} onClick={() => props.closer(item.id)}>
                                        <div className={`rayita${key} rayita`}></div>
                                        <div className={`rayita${key} rayita`}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={key} className="tab buttonAction" onClick={() => props.changerTab(item.id)}>
                                <div className="ColseAndTextConten">
                                    <label id={`label${key}`} onMouseOver={() => labelMove(key, true, item.title)} onMouseOut={() => labelMove(key, false)}>{item.title || 'Nueva noticia'}</label>

                                    <div className="icoPest xClara buttonAction" onMouseOver={() => changeColor(key, true)} onMouseOut={() => changeColor(key, false)} onClick={() => props.closer(item.id)}>
                                        <div className={`rayita${key} rayita`}></div>
                                        <div className={`rayita${key} rayita`}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    }

                })
            }
            {/*Botton para crea un un nuevo tab*/}
            <div className="createNewtab buttonAction" onClick={() => props.creater()}>
                <div className="icoPest">
                    <div className={`rayita`}></div>
                    <div className={`rayita`}></div>
                </div>
            </div>
        </div>
    );

    return page;
}
export default Pesta;