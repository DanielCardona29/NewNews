import React from 'react'
import '../../Styles/App/Comments/Comments.scss';

import CommController from '../../Controllers/CommentsController.js';

import Button from '../Buttons/Buttons.jsx';



class UpdateAComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.Controller = new CommController();
    }
    render() {
        const writer = (
            <div className="CommetWriter updater">

                <form className="CommetWriter">
                    <div className="form-group">
                        <label htmlFor="puntua">Puntuación:</label>
                        <select className="form-control" id="puntua" name="puntua" value={this.props.puntuaValue} onChange={this.props.handleChange()}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" id="content" rows="3" name="content" value={this.props.areaValue} onChange={this.props.handleChange()} ></textarea>
                    </div>
                </form>
                <Button type={'button'} content={'Guardar'} classType={'Mybtn btn1'} click={() => this.props.onSave()}  id={'GuardarButton'} name={'GuardarButton'} />
            </div>
        )
        return writer
    }
}

export default UpdateAComment;