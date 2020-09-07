import React from "react";

import LoginForm from "../App/Forms/LoginForm.jsx";
import InsForm from "../App/Forms/insForm.jsx";
import NewP from "../App/PrincipalNew/New.jsx";
import Button from "../App/Buttons/Buttons.jsx";
import "../Styles/Principales/Home.scss";
import { useState } from "react";

const Home = (props) => {



  const [formState, setFormState] = useState({
    value: false,
    name: "inscribirse",
  });

  const handleChange = () => {
    formState.value
      ? setFormState({ value: false, name: "inscribirse" })
      : setFormState({ value: true, name: "ingresar" });
  };

  const form = () =>
    formState.value ? (
      <InsForm action={handleChange} />
    ) : (
        <LoginForm action={handleChange} />
      );

  const formulario = form();
  const Home = (
    <div className="home">
      <div className="wrapperPrincipal">
        <div className="title">
          <h1>New News</h1>
        </div>

        <div className="content">
          <div className="noticia">
            <NewP />
          </div>
          <div className="form">
            <div className="formualrio">{formulario}</div>
            <div className="buttonIns">
              <Button
                type={"button"}
                content={formState.name}
                classType={"Mybtn btn2"}
                click={() => handleChange()}
                id={"Registrarse"}
                name={"Registrarse"}
                hiddenType={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return Home;
};

export default Home;
