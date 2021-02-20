import React from "react";

import Button from "../Buttons/Buttons.jsx";
import ErrorPage from "../../Pages/ErrorPage.jsx";

import LoginController from '../../NewControllers/login.controllers'

const _LoginController = new LoginController();

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
              click={() => _LoginController.Login({ user: this.state.form.user, pass: this.state.form.pass })}
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
