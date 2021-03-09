import React from 'react';

//Importamos los estilos 
import '../../Styles/App/NewsList/CardsList.scss'
import '../../Styles/Principales/animations.scss';
import NewsController from '../../NewControllers/news.controller';

const _NewsController = new NewsController();


const NewsCard = (props) => {

    //esta funcion se encargara de enviar la visita a la base de datos
    const cardClick = async () => {
        await _NewsController.view(props.id)
        window.location.href = `/news/${props.id}`

    }
    const card = (
        <div className="card apear-cards" id={`card${props.id}`} onClick={() => cardClick()}>
            <div className="card-image" style={{ backgroundImage: `url(${props.image})` }}></div>
            <div className="card-text">
                <span className="date">{props.date}</span>
                <h2>{props.title}</h2>
                <p id={`content${props.clave}`} dangerouslySetInnerHTML={{ __html: props.content }}></p>
            </div>
            <div className="card-stats">
                <div className="stat">
                    <div className="value">{props.likes}</div>
                    <div className="type">Likes</div>
                </div>
                <div className="stat ">
                    <div className="value">{props.dislikes}</div>
                    <div className="type">Dislikes</div>
                </div>
                <div className="stat ">
                    <div className="value">{props.views}</div>
                    <div className="type">Views</div>
                </div>


            </div>
        </div>
    );

      return card; 
}


export default NewsCard;