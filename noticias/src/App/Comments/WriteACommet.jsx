import React from 'react'
import '../../Styles/App/Comments/Comments.scss';

import CommController from '../../Controllers/CommentsController.js';

import Button from '../Buttons/Buttons.jsx';



class WriteAComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                Coment: '',
                selectPuntu: '1'
            }
        }
        this.Controller = new CommController();
    }
    render() {
        const writer = (
            <div className="CommetWriter">
                <div>
                    <h4>Escribe un comentario</h4>
                </div>

                <form className="CommetWriter">
                    <div className="form-group">
                        <textarea className="form-control" id="Coment" rows="3" name="Coment" value={this.props.valueTextArea} onChange={this.props.handleChange()}></textarea>
                    </div>
                </form>
                <Button type={'button'} content={'Comentar'} classType={'Mybtn btn1'} click={this.props.SubmitComment()} id={'ComentButton'} name={'ComentButton'} />
            </div>
        )
        return writer
    }
}

export default WriteAComment;