import React, { useState } from 'react';
import $ from 'jquery';

//Importamos los estilos 
import '../../Styles/App/NewsList/CardsList.scss'
//Importramos la clase controladora
import StatsController from '../../Controllers/statsController.js';

const Controller = new StatsController();

const NewsCard = (props) => {
    //este estado se encargara de saber si un usario ya vio esta noticia o no
    const [saw, setSaw] = useState(false)

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
                <p id={`content${props.clave}`}></p>
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
                    <div className="type">vistas</div>
                </div>
                <div className="stat">
                    <div className="value">{props.comentarios}</div>
                    <div className="type">comentarios</div>
                </div>

            </div>
        </div>
    );


    setTimeout(() => {
        document.getElementById(`content${props.clave}`).innerHTML = props.content;

    }, 100)

    return card
}


export default NewsCard;