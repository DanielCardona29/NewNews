import React from 'react'

const CommetnNoUser = (props) => {
    let comment = (
        <div id={`ContenComent${props.id}`} className="commentWrapper">
            <div className="userCommetInfo">
                usuario: <label className="label">{props.autor}</label>
                    Puntuación: <label className="label">{props.puntua}</label>
                    hace: <label className="label">{props.time} dias</label>
            </div>

            <div className="CommentContent">
                <p>{props.content}</p>
            </div>
            {
                (() => {
                    if (props.Like) {
                        return <div className="CommentStats">
                            <div className="like" onClick={() => props.onLiked()}></div>
                            <label>{props.countLikes}</label>
                        </div>
                    } else {
                        return <div className="CommentStats">
                            <div className="dontLike" onClick={() => props.onLiked()}></div>
                            <label>{props.countLikes}</label>
                        </div>
                    }
                })()
            }
        </div>
    );
    // if (props.isOscuro) {
    //     setTimeout(() => {
    //         document.getElementById(`ContenComent${props.id}`).classList = "commentWrapper oscuro"
    //     }, 100)
    // }
    return comment;
}

export default CommetnNoUser;