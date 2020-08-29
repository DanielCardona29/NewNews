import React from "react";
import swal from "sweetalert";

import Button from "../Buttons/Buttons.jsx";
import ErrorPage from "../../Pages/ErrorPage.jsx";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        user: "",
        pass: "",
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value.trim(),
      },
    });
  };

  consulta = async (url) => {
    let data = await fetch(url);
    let response = await data.json();
    return response;
  };

  submit = async (e) => {
    let url = `http://localhost:5000/users/validationlogin/${this.state.form.user}/${this.state.form.pass}`;
    let response = await this.consulta(url).then((user) => {
      //Primero verificamos que exista el usuario
      if (user.value) {
        //Ahora verificamos que el usaurio tenga accesso al sistema
        if (user.access) {
          //si tenemos accesos enviamos el id del usuairo al sesion starage
          sessionStorage.setItem("userid", user.results[0].id);
          return { value: true };
        } else {
          //En caso de que no tengamos aceso reentornamos falso
          return { identy: "access", value: false };
        }
      } else {
        //En caso de que no tengamos el valor reentornamos falso
        return { identy: "value", value: false };
      }
    });

    console.log(response);
    //Ahora informamos al hacemos el login o informamos al usuario que paso
    if (response.value) {
      window.location.href = "/home";
    } else {
      if (response.identy === "access") {
        swal({ text: "Al parecer no tienes aceso a nuestro sistema", button: 'Aceptar' });
      } else {
        swal({ text: "Usuario o contraseña incorrectos", button: 'Aceptar' });

      }
    }
  };


  render() {
    try {
      const Login = (
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="user">Usuario</label>
              <input
                type="text"
                className="form-control"
                id="user"
                aria-describedby="userHelp"
                placeholder="Usuario"
                name="user"
                value={this.state.form.user}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="pass">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="Contraseña"
                name="pass"
                value={this.state.form.pass}
                onChange={this.handleChange}
              />
            </div>
          </form>

          <div className="buttons">
            <Button
              type={"button"}
              content={"ingresar"}
              classType={"Mybtn btn4"}
              click={() => this.submit()}
              id={"ingresar"}
              name={"ingresar"}
            />
          </div>
        </div>
      );
      return Login;
    } catch (error) {
      return <ErrorPage errorValue={error} value={true} />;
    }
  }
}

export default LoginForm;
