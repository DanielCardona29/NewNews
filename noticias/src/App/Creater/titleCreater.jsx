import React from 'react';

import Button from '../Buttons/Buttons.jsx';
import '../../Styles/App/Creater/create.scss';


function TitleCreater(props) {


    const Updater = (
        <div className="updater">
            <div className="formClass">
                <div className="form-group">
                    <label htmlFor="TitleNew">Pon un título</label>
                    <input type="text"
                        className="form-control"
                        id="TitleNew"
                        name="TitleNew"
                        value={props.valueTitle}
                        onChange={props.onChange()} />
                </div>

            </div>
        </div>
    );

    return Updater;
}

export default TitleCreater;