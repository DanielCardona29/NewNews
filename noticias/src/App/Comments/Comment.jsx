import React from 'react';
import '../../Styles/App/Comments/Comments.scss';
import CommController from '../../Controllers/CommentsController.js';
import CommetnUser from './Presentar/CommentUser.jsx';
import CommetnNoUser from './Presentar/CommentNoUser.jsx';

class Comment extends React.Component {

    constructor(prosp) {
        super(prosp);

        this.state = {
            Like: this.props.isLiked,
            countLikes: this.props.likes
        }
        this.CommentsController = new CommController();

    }

    handleLiker = async () => {
        const userid = sessionStorage.getItem('userid');
        if (this.state.Like) {
            await this.CommentsController.LikeController(this.props.comentario.id, this.props.newID, userid, false);
            this.setState({
                Like: false,
                countLikes: this.state.countLikes - 1
            })
        } else {
            await this.CommentsController.LikeController(this.props.comentario.id, this.props.newID, userid, true);
            this.setState({
                Like: true,
                countLikes: this.state.countLikes + 1
            })
        }
    }

    getDate() {
        const d = new Date();
        const output = `${d.getFullYear()}/${d.getMonth()}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
        return output;
    }

    time = () => {
        let fechaInicio = new Date(this.props.comentario.date).getTime();
        let fechaFin = new Date(this.getDate()).getTime();
        let diff = fechaInicio - fechaFin;
        const date = Math.abs(diff / (1000 * 60 * 60 * 24)).toFixed(2);
        return date
    }

    render() {
        const userid = sessionStorage.getItem('userid')
        if (this.props.comentario.idusercoment === userid) {
            if (this.props.keyNum % 2 === 0) {
                return <CommetnUser Like={this.state.Like}
                    content={this.props.comentario.content}
                    countLikes={this.state.countLikes}
                    onLiked={() => this.handleLiker()}
                    Like={this.state.Like}
                    puntua={this.props.comentario.Punt}
                    autor={this.props.autor.autor}
                    onDelete={() => this.props.HasBedeleteComment(this.props.comentario.id, this.props.CommentPositon)}
                    time={this.time()}
                    isOscuro={true}
                    id={this.props.comentario.id}
                />;
            } else {
                return <CommetnUser Like={this.state.Like}
                    content={this.props.comentario.content}
                    countLikes={this.state.countLikes}
                    onLiked={() => this.handleLiker()}
                    Like={this.state.Like}
                    puntua={this.props.comentario.Punt}
                    autor={this.props.autor.autor}
                    onDelete={() => this.props.HasBedeleteComment(this.props.comentario.id, this.props.CommentPositon)}
                    time={this.time()}
                    isOscuro={false}
                    id={this.props.comentario.id}

                />;
            }

        } else {
            if (this.props.keyNum % 2 === 0) {
                return <CommetnNoUser Like={this.state.Like}
                    content={this.props.comentario.content}
                    countLikes={this.state.countLikes}
                    onLiked={() => this.handleLiker()}
                    Like={this.state.Like}
                    puntua={this.props.comentario.Punt}
                    autor={this.props.autor.autor}
                    time={this.time()}
                    isOscuro={true}
                    id={this.props.comentario.id}

                />;
            } else {
                return <CommetnNoUser Like={this.state.Like}
                    content={this.props.comentario.content}
                    countLikes={this.state.countLikes}
                    onLiked={() => this.handleLiker()}
                    Like={this.state.Like}
                    puntua={this.props.comentario.Punt}
                    autor={this.props.autor.autor}
                    time={this.time()}
                    isOscuro={false}
                    id={this.props.comentario.id}

                />;

            }

        }

    }
}

export default Comment;