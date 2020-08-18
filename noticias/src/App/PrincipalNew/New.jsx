import React, { useState } from 'react';

import NewsController from './NewsController.js';

const controller = new NewsController();

//Extraer el autor de la noticia;
let ExtractData = async (id) => {
    let response = await controller.ExtractAutor(id);
    return response;
}

//Extaer toda la lista de noticias
let ExtractNews = async () => {
    let response = await controller.ExtractNews();
    return response;
}




const NewP = () => {

    //Creamos un estado apara determinar la noticia que se mostrara en pantalla 
    const [noticias, setNoticias] = useState({ value: false });
    const [counter, setConuter] = useState(0);

    const noticia = async (contador) => {
        await ExtractNews()
            .catch(error => console.log('tenemos un error: ', error))
            .then(noticia => {
                if (contador < noticia.datos.length) {
                    const element = noticia.datos[contador];
                    setNoticias(element);

                } else {
                    setNoticias({ value: false })
                }

            })
    }

    noticia(counter);

    return (
        <div className="container">
            <div className="wrapper">
                <div className="image">
                    <img src={noticias.img} />
                </div>

                <div>

                </div>
            </div>
        </div>
    );
}
export default NewP;