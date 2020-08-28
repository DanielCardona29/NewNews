import React, { useState, useEffect } from 'react';

//Importamos el controlador de noticias
import NewsController from '../../Controllers/NewsController.js';
//Importamos el controlador de comentarios
import CommController from '../../Controllers/CommentsController.js';
import '../../Styles/App/Comments/Comments.scss';

const Controller = new NewsController();
const CommentsController = new CommController();

const Commets = (props) => {
    const [commets, setComments] = useState({
        Commets: [],
        CommetsNum: 0
    })
    //Extraemos los comentarios de la base de datos
    useEffect(() => {
        const Comments = async () => {
            const data = await Controller.CommetsGetter(props.newid);
            let CommentsOBJ = [];
            if (data.response.value) {
                for (let i = 0; i < data.response.results.length; i++) {
                    let autor = await Controller.ExtractAutor(data.response.results[i].idusercoment);
                    let Likes = await CommentsController.CommetsLikes(data.response.results[i].id, props.newid);

                    CommentsOBJ = [
                        ...CommentsOBJ,
                        {
                            comentario: data.response.results[i],
                            likes: Likes,
                            autor: autor
                        }
                    ]
                }

                setComments({
                    Commets: CommentsOBJ,
                    CommetsNum: CommentsOBJ.length
                })
            }


        }
        Comments();
    }, [])

    const handleLiker = async (commentid) => {
        const userid = sessionStorage.getItem('userid');
        console.log(commentid);
        const consulta = await CommentsController.LikeController(commentid, props.newid, userid, false);
        console.log(consulta);
    }



    const Comentarios = (
        <div className="comentarios">
            <div className="infoCommets">
                <h1>Comentarios</h1>
                <label className="label">Hay {commets.CommetsNum} comentarios</label>
            </div>
            <div className="comentariosContent">
                <ul>
                    {
                        commets.Commets.map((item, key) => {

                            if (key % 2 === 0) {
                                
                                let comment = (
                                    <li key={key}>
                                        <div className="commentWrapper oscuro">
                                            <div className="userCommetInfo">
                                                usuario: <label className="label">{item.autor.autor}</label>
                                            </div>

                                            <div className="CommentContent">
                                                <p>{item.comentario.content}</p>
                                            </div>

                                            <div className="CommentStats">
                                                <div className="like" onClick= { () => handleLiker(item.comentario.id)}></div>
                                                <label>{item.likes}</label>
                                            </div>

                                        </div>
                                    </li>
                                );
                                return comment;

                            } else {
                                let comment = (
                                    <li key={key}>
                                        <div className="commentWrapper">
                                            <div className="userCommetInfo">
                                                usuario: <label className="label">{item.autor.autor}</label>
                                            </div>

                                            <div className="CommentContent">
                                                <p>{item.comentario.content}</p>
                                            </div>

                                            <div className="CommentStats">
                                                <div className="like"></div>
                                                <label>{item.likes}</label>
                                            </div>

                                        </div>
                                    </li>
                                );
                                return comment;

                            }

                        })
                    }
                </ul>
            </div>
        </div>
    );

    return Comentarios;
}

export default Commets;