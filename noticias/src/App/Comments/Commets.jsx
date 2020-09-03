import React from 'react';
//Importamos el controlador de noticias
import NewsController from '../../Controllers/NewsController.js';
//Importamos el controlador de comentarios
import CommController from '../../Controllers/CommentsController.js';
import '../../Styles/App/Comments/Comments.scss';
import Commet from './Comment.jsx';
import WriteAComment from './WriteACommet';
import Loader from '../Loader/Loader.jsx';
import MainController from '../../Controllers/mainController.js'
import swal from 'sweetalert';

class Commets extends React.Component {

    constructor(props) {
        super(props);
        this.Controller = new NewsController();
        this.CommentsController = new CommController();
        this.MainController = new MainController();

        this.state = {
            Commets: [],
            CommetsNum: 0,
            form: {
                Coment: '',
                selectPuntu: '1'
            },
            isLoading: false
        }
    }

    //El estado del like de un usuario
    //Extraemos los comentarios de la base de datos
    async componentDidMount() {
        this.setState({ isLoading: true })
        const data = await this.Controller.CommetsGetter(this.props.newid);
        let CommentsOBJ = [];
        const userid = sessionStorage.getItem('userid')
        if (data.response.value) {
            for (let i = 0; i < data.response.results.length; i++) {
                let autor = await this.Controller.ExtractAutor(data.response.results[i].idusercoment);
                let Likes = await this.CommentsController.CommetsLikes(data.response.results[i].id, this.props.newid);
                let isLiked = await this.CommentsController.LikeConsultUser(data.response.results[i].id, this.props.newid, userid);
                CommentsOBJ = [
                    ...CommentsOBJ,
                    {
                        comentario: data.response.results[i],
                        likes: Likes,
                        autor: autor,
                        isLiked: isLiked,
                        CommentPositon: i
                    }
                ]
            }
            this.setState({
                Commets: CommentsOBJ,
                CommetsNum: CommentsOBJ.length
            })
        }

        this.setState({ isLoading: false })
    }

    //
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    }

    SubmitComment = async () => {
        if (this.state.form.Coment.trim() !== '') {
            const userid = sessionStorage.getItem('userid');
            let comment = await this.CommentsController.SettACommet(this.state.form.Coment, this.props.newid, userid, this.state.form.selectPuntu)
                .then(value => {
                    if (value) {
                        return value
                    }
                })
            if (comment.value) {
                let user = await this.MainController.userConsult();
                let userResponse = await user.json()

                await this.CommentsController.ExtractID(comment.response)
                    .then(value => {
                        console.log(value);
                        if (value.value) {
                            this.setState({
                                CommetsNum: this.state.CommetsNum + 1,
                                Commets: [
                                    {
                                        autor: { autor: userResponse.results[0].user, value: true },
                                        comentario: {
                                            ...comment.response,
                                            id: value.id,
                                        },
                                        isLiked: false,
                                        likes: 0
                                    },
                                    ...this.state.Commets,
                                ],

                                form: {
                                    Coment: '',
                                    selectPuntu: '1'
                                }
                            })
                        }
                    })
            }


        }
    }

    HasBedeleteComment = async (id, Position) => {
        console.log(Position);
        swal({
            title: "¿Estas seguro?",
            text: "Deseas eliminar este comentario",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.CommentsController.deleteComment(id)
                        .then(value => {
                            if (value) {
                                swal({
                                    text: 'Tu comentario se eliminó con exito',
                                    button: 'Cerrar'
                                })

                                //Remover el comentario caundo es eliminado
                                let ComentsOBJ = [];
                                let Contador = 0;
                                for (let i = 0; i < this.state.Commets.length; i++) {
                                    if (i !== Position) {
                                        ComentsOBJ = [
                                            ...ComentsOBJ,
                                            {
                                                ...this.state.Commets[i],
                                                CommentPositon: Contador
                                            }
                                        ]

                                        Contador = Contador + 1;
                                    }
                                }
                                this.setState({
                                    Commets: ComentsOBJ,
                                    CommetsNum: ComentsOBJ.length
                                })
                            } else {
                                swal({
                                    text: 'Tu comentario no se pudo eliminar intenta de nuevo',
                                    button: 'Cerrar'
                                })
                            }
                        })

                }
            });
    }


    render() {


        const Comentarios = (
            <div className="comentarios">
                <div className="infoCommets">
                    <h1>Comentarios</h1>
                    <label className="label">Hay {this.state.CommetsNum} comentarios</label>
                </div>
                <div className="wirterContent">
                    <WriteAComment newid={this.props.newid} handleChange={() => this.handleChange} SubmitComment={() => this.SubmitComment} valueSelect={this.state.form.selectPuntu} valueTextArea={this.state.form.Coment} />
                </div>
                <div className="comentariosContent">
                    <ul>
                        {
                            //(props.comentario.id)
                            this.state.Commets.map((item, key) => {
                                const lista = (
                                    <li key={key}>
                                        <Commet autor={item.autor}
                                            newID={this.props.newid}
                                            isLiked={item.isLiked}
                                            keyNum={key}
                                            HasBedeleteComment={this.HasBedeleteComment}
                                            comentario={item.comentario}
                                            likes={item.likes}
                                            CommentPositon={item.CommentPositon}
                                        />
                                    </li>
                                );
                                return lista;
                            })
                        }
                    </ul>
                </div>
            </div>
        );

        if (!this.state.isLoading) {
            return Comentarios;
        } else {
            return <Loader content={'comentarios'} />
        }

    }
}


export default Commets;