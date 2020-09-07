import React from 'react';

import Button from '../Buttons/Buttons.jsx';
import '../../Styles/App/Creater/create.scss';


function ImageUpdater(props) {
    const Updater = (
        <div className="updater">
            <div className="formClass">
                <label>Subir una imagen</label>
                <form className="FormCreate">
                    <div className="custom-file">
                        <label htmlFor="NewImage">Selecciona un archivo</label>
                        <input type="file" id="NewImage" name="NewImage" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Coment">O pega una url</label>
                        <input type="text"
                            className="form-control"
                            id="Coment"
                            name="Coment"
                            value={props.valueUrlUPDATE}
                            onChange={props.onUpdaterChange()} />
                    </div>
                </form>


                <Button type={'button'}
                    content={'Subir'}
                    classType={'Mybtn btn4'}
                    click={() => props.updateImage()}
                    id={'newButton'}
                    name={'newButton'} />
            </div>
        </div>
    );

    return Updater;
}

export default ImageUpdater;