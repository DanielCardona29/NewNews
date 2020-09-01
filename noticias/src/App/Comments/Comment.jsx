import React, { useState } from 'react';
import '../../Styles/App/Comments/Comments.scss';
import CommController from '../../Controllers/CommentsController.js';


const CommentsController = new CommController();

const Comment = (props) => {
    const [Like, setLike] = useState(props.isLiked)
    const [countLikes, setcountLikes] = useState(props.likes)
    const handleLiker = async () => {
        const userid = sessionStorage.getItem('userid');
        if (Like) {
            const consulta = await CommentsController.LikeController(props.comentario.id, props.newID, userid, false);
            console.log(consulta);
            setLike(false)
            setcountLikes(countLikes - 1);
        } else {
            const consulta = await CommentsController.LikeController(props.comentario.id, props.newID, userid, true);
            console.log(consulta);
            setLike(true)
            setcountLikes(countLikes + 1);
        }
    }

    function getDate() {
        const d = new Date();
        const output = `${d.getFullYear()}/${d.getMonth()}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
        return output;
    }

    const time = () => {
        let fechaInicio = new Date(props.comentario.date).getTime();
        let fechaFin = new Date(getDate()).getTime();
        let diff = fechaInicio - fechaFin;
        const date = Math.abs(diff / (1000 * 60 * 60 * 24)).toFixed(2);
        return date
    }


    const userid = sessionStorage.getItem('userid')

    if (props.comentario.idusercoment === userid) {
        if (props.keyNum % 2 === 0) {
            let comment = (
                <div className="commentWrapper oscuro">
                    <div className="userCommetInfo">
                        usuario: <label className="label">{props.autor.autor}</label>
                Puntuación: <label className="label">{props.comentario.Punt}</label>
            hace: <label className="label">{time()} dias</label>
                        <div className="iconContent buttonAction edit" ></div>
                        <div className="iconContent buttonAction deleat" onClick={ () => props.HasBedeleteComment( props.comentario.id, props.CommentPositon)}></div>
                    </div>

                    <div className="CommentContent">
                        <p>{props.comentario.content}</p>
                    </div>
                    {
                        (() => {
                            if (Like) {
                                return <div className="CommentStats">
                                    <div className="like" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            } else {
                                return <div className="CommentStats">
                                    <div className="dontLike" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            }
                        })()
                    }
                </div>
            );
            return comment;

        } else {
            let comment = (
                <div className="commentWrapper">
                    <div className="userCommetInfo">
                        usuario: <label className="label">{props.autor.autor}</label>
                        Puntuación: <label className="label">{props.comentario.Punt}</label>
                        hace: <label className="label">{time()} dias</label>
                        <div className="iconContent buttonAction edit"></div>
                        <div className="iconContent buttonAction deleat" onClick={ () => props.HasBedeleteComment( props.comentario.id, props.CommentPositon)}></div>
                    </div>
                    <div className="CommentContent">
                        <p>{props.comentario.content}</p>
                    </div>
                    {
                        (() => {
                            if (Like) {
                                return <div className="CommentStats">
                                    <div className="like" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            } else {
                                return <div className="CommentStats">
                                    <div className="dontLike" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            }
                        })()
                    }
                </div>
            );
            return comment;

        }

    } else {

        if (props.keyNum % 2 === 0) {
            let comment = (
                <div className="commentWrapper oscuro">
                    <div className="userCommetInfo">
                        usuario: <label className="label">{props.autor.autor}</label>
                Puntuación: <label className="label">{props.comentario.Punt}</label>
            hace: <label className="label">{time()} dias</label>

                    </div>

                    <div className="CommentContent">
                        <p>{props.comentario.content}</p>
                    </div>
                    {
                        (() => {
                            if (Like) {
                                return <div className="CommentStats">
                                    <div className="like" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            } else {
                                return <div className="CommentStats">
                                    <div className="dontLike" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            }
                        })()
                    }
                </div>
            );
            return comment;

        } else {
            let comment = (
                <div className="commentWrapper">
                    <div className="userCommetInfo">
                        usuario: <label className="label">{props.autor.autor}</label>
                        Puntuación: <label className="label">{props.comentario.Punt}</label>
                        hace: <label className="label">{time()} dias</label>

                    </div>
                    <div className="CommentContent">
                        <p>{props.comentario.content}</p>
                    </div>
                    {
                        (() => {
                            if (Like) {
                                return <div className="CommentStats">
                                    <div className="like" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            } else {
                                return <div className="CommentStats">
                                    <div className="dontLike" onClick={() => handleLiker()}></div>
                                    <label>{countLikes}</label>
                                </div>
                            }
                        })()
                    }
                </div>
            );
            return comment;

        }

    }

}

export default Comment;