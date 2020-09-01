import React, { useState } from "react";

import NewsController from "../../Controllers/NewsController.js";
import Button from "../Buttons/Buttons.jsx";
import "../../Styles/App/Noticias/noticias.scss";
import ErrorPage from "../../Pages/ErrorPage.jsx";
import Loader from '../../App/Loader/Loader.jsx';
//Importamos el controlador de noticias
const controller = new NewsController();

const NewP = (props) => {
  //Creamos un estado apara determinar la noticia que se mostrara en pantalla
  const [counter, setConuter] = useState(0);
  //este estado guardará la noticia que se muestra en pantalla
  const [noticias, setNoticias] = useState({ value: false });

  try {
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
    //Sacar la imagen
    const style = {
      backgroundImage: `url(${noticias.img})`,
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    };
    //este es el mensaje que se reentorna cuando tengamos los datos.
    const isData = (
      <div className="contentNewsPrincipal">
        <div className="wrapperPrincipal">
          <div className="imagePrincipal" style={style}></div>
          <div className="datosPrincipal">
            <label className="labelPrincipal">
              <span className="negritaPrincipal">Fecha de creación: </span>{" "}
              {noticias.date}
            </label>
            <label className="label">
              <span className="negritaPrincipal">Autor: </span>
              {autor}
            </label>
          </div>

          <div className="contenidoPrincipal">
            <div className="titlePrincipal">
              <h3>{noticias.title}</h3>
            </div>
            <div className="textoPrincipal" id="texto"></div>
          </div>

          <div style={{ margin: "10px 0px 0 0" }}>
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
        <div className="wrapperPrincipal">
        
        <Loader content = {'noticia'}/>
        </div>
      </div>
    );

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
  } catch (error) {
    return <ErrorPage errorValue={error} value={true} />;
  }
};

export default NewP;
