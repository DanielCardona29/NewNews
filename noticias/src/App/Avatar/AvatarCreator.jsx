import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import '../../Styles/App/Avatar/AvatarSpected.scss';
import confing from './options.json';
import Button from '../Buttons/Buttons.jsx'


const AvatarCreator = (props) => {
    const avatar = `https://avataaars.io/?avatarStyle=${props.Config.avatarStyle}&topType=${props.Config.topType}&accessoriesType=${props.Config.accessoriesType}&hairColor=${props.Config.hairColor}&facialHairType=${props.Config.facialHairType}&facialHairColor=${props.Config.facialHairColor}&clotheType=${props.Config.clotheType}&clotheColor=${props.Config.clotheColor}&graphicType=${props.Config.graphicType}&eyeType=${props.Config.eyeType}&eyebrowType=${props.Config.eyebrowType}&mouthType=${props.Config.mouthType}&skinColor=${props.Config.skinColor}`
    const [config, setConfig] = useState(confing)

    const page = (
        <div className="CreatormModal">
            <div className="superiores" onClick={() => props.hidden()}></div>
            <div className="contenedor">
                <div className="laterales" onClick={() => props.hidden()}></div>
                <div className="contenido">
                    <div className="ContentForm">
                        <div className="AvatarForm" >
                            <img src={avatar} className="img img-circle" ></img>
                        </div>
                        <div className="FormContent">
                            <form className="formulario">
                                {
                                    config.confing.map((item, key) => {
                                        return (
                                            <div className="form-group" key={key}>
                                                <label htmlFor={item.type}>{item.currentName}</label>
                                                <select className="form-control" id={item.type} name={item.type} id={item.type} onChange={props.onChange()}>
                                                    {
                                                        item.content.map((options, key2) => {
                                                            return <option key={key2} value={options}>{options}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        )
                                    })
                                }


                            </form>
                        </div>
                        <Button type={'button'} content={'Crear Avatar'} classType={'Mybtn'} click={() => props.onChangeCaracte(avatar)} id={'create'} name={'create'} />
                    </div>

                </div>
                <div className="laterales" onClick={() => props.hidden()}></div>
            </div>
            <div className="superiores" onClick={() => props.hidden()}></div>
        </div>
    )
    const updateImage = (
        <div>
            <div className="CreatormModal">
                <div className="superiores" onClick={() => props.hidden()}></div>
                <div className="contenedor">
                    <div className="laterales" onClick={() => props.hidden()}></div>
                    <div className="contenido">
                        <div className="ContentForm">
                            <div className="AvatarForm" >
                                <img src={props.avatar} className="img img-circle" ></img>
                            </div>
                            <div className="FormContentiMG">
                                <form className="formulario">
                                    <div className="file">
                                        <label htmlFor="AvatarImage">Selecciona un archivo</label>
                                        <input type="file" id="AvatarImage" name="AvatarImage" required />
                                    </div>
                                </form>
                            </div>
                            <Button type={'button'} content={'Subir Avatar'} classType={'Mybtn'} click={() => props.onUpdate()} id={'create'} name={'create'} />
                        </div>

                    </div>
                    <div className="laterales" onClick={() => props.hidden()}></div>
                </div>
                <div className="superiores" onClick={() => props.hidden()}></div>
            </div>
        </div>
    );

    if (props.kindOfFomr === 'img') {
        return props.visualice ? ReactDOM.createPortal(updateImage, document.body) : null;
    } else {
        return props.visualice ? ReactDOM.createPortal(page, document.body) : null;
    }
}



export default AvatarCreator;