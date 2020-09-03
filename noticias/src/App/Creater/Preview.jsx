
import React from 'react';
import Button from '../Buttons/Buttons.jsx';
import '../../Styles/App/Preview/Preview.scss'
const EditorPreview = (props) => {
    const imgStyle = {
        backgroundImage: `url('${props.img}')`
    }

    function getDate() {
        const d = new Date();
        const output = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
        return output;
    }

    return (
        <div className="editor-preview">
            <h2>Preview</h2>

            <div className="previewContent">
                <div className='previewTitle'>
                    <h2 className="title">{props.title}</h2>
                </div>

                <div className="newImagen" style={imgStyle}></div>
                <div className="newData">
                    <label className="label">
                        <span className="negrita">Fecha de creación: </span>
                        {getDate()}
                    </label>
                    <label className="label">
                        <span className="negrita">Autor: </span>
                        {props.autor}
                    </label>
                </div>
                <div className="contentButtons">
                    <h5>Ajustar el contenido</h5>
                    <div className="buttons">
                        <Button type={'button'} content={'Izquierda'} classType={'Mybtn btn1'} click={() => props.chageAling('left')} id={'left'} name={'left'} />
                        <Button type={'button'} content={'Centrar'} classType={'Mybtn btn1'} click={() => props.chageAling('center')} id={'center'} name={'center'} />
                        <Button type={'button'} content={'Derecha'} classType={'Mybtn btn1'} click={() => props.chageAling('right')} id={'right'} name={'right'} />
                    </div>
                </div>

                <div className="contenidoCreador" style={{ textAlign: props.aling }} dangerouslySetInnerHTML={{ __html: props.data }}></div>
                
                <div className="contentButtons">
                    <h5>Guardar o publicar o eliminar</h5>
                    <div className="buttons">
                        <Button type={'button'} content={'Guardar'} classType={'Mybtn btn3'} click={() => props.chageAling('left')} id={'saver'} name={'saver'} />
                        <Button type={'button'} content={'Publicar'} classType={'Mybtn btn2'} click={() => props.chageAling('center')} id={'Publicer'} name={'Publicer'} />
                        <Button type={'button'} content={'Eliminar'} classType={'Mybtn btn4'} click={() => props.chageAling('center')} id={'Deleter'} name={'Deleter'} />

                    </div>
                </div>

            </div>
        </div >
    );
}

export default EditorPreview;