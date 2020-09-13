import React from 'react'
import UpdateAComment from '../UpdateComent.jsx';
import CommController from '../../../Controllers/CommentsController.js';
import swal from 'sweetalert';

class CommetnUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            puntuacion: this.props.puntua,
            content: this.props.content,
            form: {
                content: this.props.content,
                puntua: this.props.puntua
            }
        }
        this.CommentsController = new CommController();
    }
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    }
    //Este Guarda el cambio en el comentario
    onSave = async () => {
        if (this.state.form.content && this.state.form.content !== '') {
            //Hacemos el guardado en la base de datos
            await this.CommentsController.UpdateAcoment(this.state.form, this.props.id)
                .then(value => {
                    if (value) {
                        swal({
                            text: 'Se guerdó con exito tu ajuste',
                            button: 'Aceptar'
                        })
                        this.setState({
                            isEditing: false,
                            content: this.state.form.content,
                            puntuacion: this.state.form.puntua,
                            
                        })
                    } else {
                        swal({
                            text: 'Al parecer algo salió mal, intenta de nuevo por favor',
                            button: 'Aceptar'
                        })
                    }
                })
        } else {
            //si el comentario está vacio entonces le decimos que no se guarda xD
            swal({
                text: 'No puedes guardar un comentario vacio',
                button: 'Aceptar'
            })
        }
    }

    render() {
        if (!this.state.isEditing) {
            let comment = (
                <div id="contentComent" className="commentWrapper">
                    <div className="userCommetInfo">
                        usuario: <label className="label">{this.props.autor}</label>
                    Puntuación: <label className="label">{this.state.puntuacion}</label>
                    hace: <label className="label">{this.props.time} dias</label>
                        <div className="iconContent buttonAction edit" onClick={() => this.setState({ isEditing: true })}></div>
                        <div className="iconContent buttonAction deleat" onClick={() => this.props.onDelete()}></div>
                    </div>

                    <div className="CommentContent">
                        <p>{this.state.content}</p>
                    </div>
                    {
                        (() => {
                            if (this.props.Like) {
                                return <div className="CommentStats">
                                    <div className="like" onClick={() => this.props.onLiked()}></div>
                                    <label>{this.props.countLikes}</label>
                                </div>
                            } else {
                                return <div className="CommentStats">
                                    <div className="dontLike" onClick={() => this.props.onLiked()}></div>
                                    <label>{this.props.countLikes}</label>
                                </div>
                            }
                        })()
                    }
                </div>
            );
            
            return comment;
        } else {
            let comment = (
                <div id={`ContenComent${this.props.id}`} className="commentWrapper">
                    <div className="userCommetInfo">
                        <div className="iconContent buttonAction cancel" onClick={() => this.setState({ isEditing: false })}></div>
                    </div>
                    <UpdateAComment handleChange={() => this.handleChange} onSave={() => this.onSave()} areaValue={this.state.form.content} puntuaValue={this.state.form.puntua} />
                </div>
            );
            if (this.props.isOscuro) {
                setTimeout(() => {
                    document.getElementById(`ContenComent${this.props.id}`).classList = "commentWrapper oscuro"
                }, 100)
            }
            return comment;
        }
    }
}

export default CommetnUser;