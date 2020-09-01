import React from 'react'

const CommetnUser = (props) => {
    let comment = (
        <div id="contentComent" className="commentWrapper">
            <div className="userCommetInfo">
                usuario: <label className="label">{props.autor}</label>
                    Puntuación: <label className="label">{props.puntua}</label>
                    hace: <label className="label">{props.time} dias</label>
                <div className="iconContent buttonAction edit"></div>
                <div className="iconContent buttonAction deleat" onClick={props.onDelete}></div>
            </div>

            <div className="CommentContent">
                <p>{props.content}</p>
            </div>
            {
                (() => {
                    if (props.Like) {
                        return <div className="CommentStats">
                            <div className="like" onClick={props.onLiked}></div>
                            <label>{props.countLikes}</label>
                        </div>
                    } else {
                        return <div className="CommentStats">
                            <div className="dontLike" onClick={props.onLiked}></div>
                            <label>{props.countLikes}</label>
                        </div>
                    }
                })()
            }
        </div>
    );
    if (props.isOscuro) {
        setTimeout(() => {
            document.getElementById('contentComent').classList = "commentWrapper oscuro"
        }, 100)
    }
    return comment;
}

export default CommetnUser;