import React, { useState } from "react";

import NewsController from "./NewsController.js";
import Button from "../Buttons/Buttons.jsx";
import "../../Styles/App/Noticias/noticias.scss";

//Importamos el controlador de noticias
const controller = new NewsController();

const NewP = () => {
  //Creamos un estado apara determinar la noticia que se mostrara en pantalla
  const [counter, setConuter] = useState(0);
  //este estado guardará la noticia que se muestra en pantalla
  const [noticias, setNoticias] = useState({ value: false });

  //Extaer toda la lista de noticias
  const noticia = async (contador) => {
    let noticia = await controller.NewsController(contador);
    await controller.AutorController(noticia).then((contenido) => {
      setNoticias({ ...contenido });
      setConuter(contador + 1);
    });
  };

  //Sacar el nombre del autor
  const autor = noticias.autor;
  //este es el mensaje que se reentorna cuando tengamos los datos.
  const isData = (
    <div className="container">
      <div className="wrapper">
        <div className="image">
          <img src={noticias.img} />
        </div>
        <div className="datos">
          <label className="label">
            <span className="negrita">Fecha de creación: </span> {noticias.date}
          </label>
          <label className="label">
            <span className="negrita">Autor: </span>
            {autor}
          </label>
        </div>

        <div className="contenido">
          <div className="title">
            <h3>{noticias.title}</h3>
          </div>
          <div className="texto" id="texto"></div>
        </div>

        <div>
          <Button
            type={"button"}
            content={"Siguiente"}
            classType={"Mybtn btn4"}
            click={() => noticia(counter)}
            id={"ButtonNext"}
            name={"ButtonNext"}
            hiddenType={false}
          />
        </div>
      </div>
    </div>
  );

  //Este es el mensaje que se reentorna en caso de que no tengamos datos
  const noData = (
    <div className="container">
      <div className="wrapper">
        <h3>Lo lamentamos, no hay noticias para mostrar</h3>
      </div>
    </div>
  );
  console.log('render');

  //Verificamos si tenemos algun valor en las noticias.
  if (noticias.value) {
    //Reentornamos los datos que encontramos en el stado de las noticias.
    if (noticias.size === counter) setConuter(0);
    setTimeout(
      () => (document.getElementById("texto").innerHTML = noticias.content),
      1
    );
    return isData;
  } else {
    //Si no se extraen los datos hacemos esperamos da 2 segundos antes de volver a intentar traerlos.
    setTimeout(() => {
      noticia(counter);
    }, 2000);
    //Esto reentrona el un mensaje para el usuario
    return noData;
  }
};

export default NewP;
