import React from "react";

import LoginForm from "../App/Forms/LoginForm.jsx";
import InsForm from "../App/Forms/insForm.jsx";
import NewP from "../App/PrincipalNew/New.jsx";
import Button from "../App/Buttons/Buttons.jsx";
import "../Styles/Principales/Home.scss";
import { useState } from "react";

const Home = (props) => {
  const [formState, setFormState] = useState(false);

  const form = () => (formState ? <InsForm /> : <LoginForm />);

  const handleChange = () => (formState ? setFormState(false) : setFormState (true))

  const formulario = form();

  const Home = (
    <div>
      <div className="wrapper">
        <div className="title">
          <h1>New News</h1>
        </div>
        <div className="content">
          <div className="noticia">
            <NewP />
          </div>
          <div className="form">{formulario}</div>

          <div className="changer">
            <Button
              type={"button"}
              content={"Siguiente"}
              classType={"Mybtn btn4"}
              click={() => handleChange()}
              id={"ButtonNext"}
              name={"ButtonNext"}
              hiddenType={false}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return Home;
};

export default Home;
