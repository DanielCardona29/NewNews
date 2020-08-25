import React from 'react';


//Importamos los estilos 
import '../../Styles/App/NewsList/CardsList.scss'


const NewsCard = (props) => {

    const card = (
        <div className="card">
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
                    <div className="value">{props.comments}</div>
                    <div className="type">Dislikes</div>
                </div>
                <div className="stat ">
                    <div className="value">{props.views}</div>
                    <div className="type">views</div>
                </div>
                <div className="stat">
                    <div className="value">{props.views}</div>
                    <div className="type">comments</div>
                </div>

            </div>
        </div>);

    setTimeout(() => { document.getElementById(`content${props.clave}`).innerHTML = props.content }, 100)

    return card
}


export default NewsCard;