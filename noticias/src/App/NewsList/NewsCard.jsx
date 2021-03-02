import React from 'react';

//Importamos los estilos 
import '../../Styles/App/NewsList/CardsList.scss'
//Importramos la clase controladora
import StatsController from '../../Controllers/statsController.js';

const Controller = new StatsController();

const NewsCard = (props) => {
    //este estado se encargara de saber si un usario ya vio esta noticia o no

    //esta funcion se encargara de enviar la visita a la base de datos
    const cardClick = async () => {
        
        const userid = sessionStorage.getItem('userid');
        await Controller.SendVisit(props.id, userid).then(response => {console.log(response);})
    }


    const card = (
        <div className="card" id={`card${props.id}`} onClick={() => cardClick()}>
            <div className="card-image" style={{ backgroundImage: `url(${props.image})` }}></div>
            <div className="card-text">
                <span className="date">{props.date}</span>
                <h2>{props.title}</h2>
                <p id={`content${props.clave}`} dangerouslySetInnerHTML={{ __html: props.content}}></p>
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


            </div>
        </div>
    );
    return card
}


export default NewsCard;