import React from 'react';
import '../../Styles/App/Comments/Comments.scss';

const Comment = (props) => {
    if (props.key % 2 === 0) {

        let comment = (
            <li key={props.key}>
                <div className="commentWrapper oscuro">
                    <div className="userCommetInfo">
                        usuario: <label className="label">{props.autor.autor}</label>
                    </div>

                    <div className="CommentContent">
                        <p>{props.comentario.content}</p>
                    </div>
                    {
                        (() => {
                            if (props.isLiked) {
                                return <div className="CommentStats">
                                    <div className="like" onClick={() => handleLiker(props.comentario.id)}></div>
                                    <label>{props.likes}</label>
                                </div>
                            } else {
                                return <div className="CommentStats">
                                    <div className="dontLike" onClick={() => handleLiker(props.comentario.id)}></div>
                                    <label>{props.likes}</label>
                                </div>
                            }
                        })()
                    }


                </div>
            </li>
        );
        return comment;

    } else {
        let comment = (
            <li key={props.key}>
                <div className="commentWrapper">
                    <div className="userCommetInfo">
                        usuario: <label className="label">{props.autor.autor}</label>
                    </div>

                    <div className="CommentContent">
                        <p>{props.comentario.content}</p>
                    </div>

                    <div className="CommentStats">
                        <div className="like"></div>
                        <label>{props.likes}</label>
                    </div>

                </div>
            </li>
        );
        return comment;

    }
}

export default Comment;