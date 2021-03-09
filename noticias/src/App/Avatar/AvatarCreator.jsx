import React from 'react';
import ReactDOM from 'react-dom';

import '../../Styles/App/Avatar/AvatarSpected.scss';
import confing from './options.json';
import Button from '../Buttons/Buttons.jsx'
import UserController from '../../NewControllers/user.controller';
import swal from 'sweetalert';

const _UserController = new UserController();

const AvatarCreator = (props) => {
    let avatar = false
    if (props.Config) {
        avatar = `https://avataaars.io/?avatarStyle=${props.Config.avatarStyle}&topType=${props.Config.topType}&accessoriesType=${props.Config.accessoriesType}&hairColor=${props.Config.hairColor}&facialHairType=${props.Config.facialHairType}&facialHairColor=${props.Config.facialHairColor}&clotheType=${props.Config.clotheType}&clotheColor=${props.Config.clotheColor}&graphicType=${props.Config.graphicType}&eyeType=${props.Config.eyeType}&eyebrowType=${props.Config.eyebrowType}&mouthType=${props.Config.mouthType}&skinColor=${props.Config.skinColor}`;
    }
    const config = confing;

    const page = (
        <div className="CreatormModal" id="ModalCreater">
            <div className="superiores" onClick={() => props.hidden()}></div>
            <div className="contenedor">
                <div className="laterales" onClick={() => props.hidden()}></div>
                <div className="contenido">
                    <div className="ContentForm">
                        <div className="AvatarForm" >
                            <img src={avatar} className="img img-circle" alt="" />
                        </div>
                        <div className="FormContent">
                            <form className="formulario">
                                {
                                    config.confing.map((item, key) => {
                                        return (
                                            <div className="form-group" key={key}>
                                                <label htmlFor={item.type}>{item.currentName}</label>
                                                <select className="form-control" id={item.type} name={item.type} onChange={props.onChange()}>
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
                        <Button
                            type={'button'}
                            content={'Crear Avatar'}
                            classType={'Mybtn'}
                            click={async () => {
                                await _UserController.updateImage(avatar);
                                let resp = props.setavatar(avatar);
                                if (resp) {
                                    swal({ text: 'Creado correctamente' })
                                        .then(() => {
                                            props.hidden()
                                        });
                                }
                            }}
                            id={'create'}
                            name={'create'} />
                    </div>

                </div>
                <div className="laterales" onClick={() => props.hidden()}></div>
            </div>
            <div className="superiores" onClick={() => props.hidden()}></div>
        </div>
    );
    const updateImage = (
        <div id="ModalCreater">
            <div className="CreatormModal">
                <div className="superiores" onClick={() => props.hidden()}></div>
                <div className="contenedor">
                    <div className="laterales" onClick={() => props.hidden()}></div>
                    <div className="contenido">
                        <div className="ContentForm">
                            <div className="AvatarForm" >
                                <img src={props.avatar} className="img img-circle" alt="" />
                            </div>
                            <div className="FormContentiMG">
                                <form className="formulario">
                                    <div className="file">
                                        <label htmlFor="AvatarImage">Selecciona un archivo</label>
                                        <input type="file" id="AvatarImage" name="AvatarImage" required />
                                    </div>
                                    <progress id="progressbar" value="" max="100" style={{ width: 100, margin: 0 }} />
                                </form>
                            </div>
                            <Button type={'button'}
                                content={'Subir Avatar'}
                                classType={'Mybtn'}
                                click={async () => {
                                    let upload = await _UserController.uploadImage('progressbar');
                                    await _UserController.updateImage(upload)
                                    let resp = props.setavatar(upload);
                                    if (resp) {
                                        swal({ text: 'Foto subida correctamente' })
                                            .then(() => {
                                                props.hidden()
                                            });
                                    }
                                }}
                                id={'create'}
                                name={'create'} />
                        </div>

                    </div>
                    <div className="laterales" onClick={() => props.hidden()}></div>
                </div>
                <div className="superiores" onClick={() => props.hidden()}></div>
            </div>
        </div>
    );

    const passWordChanger = (
        <div id="ModalCreater">
            <div className="CreatormModal">
                <div className="superiores" onClick={() => props.hidden()}></div>
                <div className="contenedor">
                    <div className="laterales" onClick={() => props.hidden()}></div>
                    <div className="contenido">
                        <div className="ContentForm">
                            <div className="Title" >
                                <h2>Cambiar Contraseña</h2>
                            </div>
                            <div className="FormContentiMG">
                                <form className="formulario">

                                    <div className="form-group">
                                        <label htmlFor="newPass">Nueva contraseña</label>
                                        <input type="password" className="form-control" id="newPass" name="newPass" placeholder="Nueva contraseña" onChange={props.onChange()} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passVerfi">Confirmar nueva contraseña</label>
                                        <input type="password" className="form-control" id="passVerfi" name="passVerfi" placeholder="Contraseña anterior" onChange={props.onChange()} />
                                    </div>

                                </form>
                            </div>
                            <Button type={'button'} content={'Cambiar Contraseña'} classType={'Mybtn'} click={async () => {
                                await props.passChange()
                                props.hidden()
                            }} id={'passchange'} name={'passchange'} />
                        </div>

                    </div>
                    <div className="laterales" onClick={() => props.hidden()}></div>
                </div>
                <div className="superiores" onClick={() => props.hidden()}></div>
            </div>
        </div>
    )

    if (props.kindOfFomr === 'img') {
        //
        return props.visualice ? ReactDOM.createPortal(updateImage, document.body) : null;
    } else if (props.kindOfFomr === 'passChanger') {
        //
        return props.visualice ? ReactDOM.createPortal(passWordChanger, document.body) : null;
    } else {
        //
        return props.visualice ? ReactDOM.createPortal(page, document.body) : null;
    }
}



export default AvatarCreator;