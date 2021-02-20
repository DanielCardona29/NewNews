import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

import Button from "../Buttons/Buttons.jsx";
import ErrorPage from "../../Pages/ErrorPage.jsx";
import "../../Styles/App/Form/form.scss";

import RegistroController from '../../NewControllers/registro.controller';
const _RegistroController = new RegistroController();


class InsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        terms: false,
        pass: "",
        confiPass: "",
        usuario: "",
        correo: "",
      },
    };
  }

  //Esta propiedad transforma la UI en caso de que las contraseñas no coincidan
  incoPass = (value) => {
    if (!value) {
      $("#pass").addClass("invali");
      $("#confiPass").addClass("invali");
      $("#incoPass").css("display", "block");
    } else {
      $("#pass").addClass("vali");
      $("#confiPass").addClass("vali");
      $("#incoPass").css("display", "none");
    }
  };

  //Esta propiedad transforma el checkbox en caso de que esté deseleccionado
  termsnocheck = (value) => {
    if (!value) {
      $("#checkID").css("border", "1px solid red");
    } else {
      $("#checkID").css("border", "1px solid green");
    }
  };

  //con esta propiedad se validan que los campos correctamente;
  validate = (element, len = 5) => {
    const validate = $(`#${element}`).val();
    if (!validate || validate.trim() === "") {
      //Aqui validamos que el elemento exista
      $(`#${element}`).addClass("invali");
      return false;
    } else if (validate.length < len) {
      //Aqui que el valor de ele elemento sea mayor a 5
      $(`#${element}`).addClass("invali");
      return false;
    } else {
      //en caso de que todo este correcto envias un true
      $(`#${element}`).addClass("vali");
      $(`#${element}`).removeClass("invali");

      return true;
    }
  };

  //con esta propiedad se capturar los campos que esta llenando el usuario y se envian al estado
  handleChange = (e) => {
    this.validate([e.target.name]);
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value.trim(),
      },
    });
  };

  //Con esta propiedad se captura y transforma el valor de los terminos y condiciones
  handleChangeTerms = (e) => {
    let validate = this.state.form.terms;
    !validate ? (validate = true) : (validate = false);
    this.termsnocheck(validate);
    this.setState({
      form: {
        ...this.state.form,
        terms: validate,
      },
    });
  };



  render() {
    try {
      document.title = "New news: Inscripcion";
      const formulario = (
        <div className="container">
          <form className="needs-validation" id="formulario">
            <div className="form-group">
              <label htmlFor="usuario">usuario:</label>
              <input
                type="text"
                className="form-control"
                id="usuario"
                placeholder="Ingresa usuario"
                onChange={this.handleChange}
                name="usuario"
                required
              />
              <div className="valid-feedback">valido.</div>
            </div>

            <div className="form-group">
              <label htmlFor="correo">correo:</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Ingresa correo"
                onChange={this.handleChange}
                name="correo"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pass">contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="pass"
                placeholder="Ingresa contraseña"
                onChange={this.handleChange}
                name="pass"
                required
              />
            </div>

            <div className="form-group incoPass" id="incoPass">
              <label>Las contraseñas no son correctas</label>
            </div>

            <div className="form-group">
              <label htmlFor="confiPass">Confirmar Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="confiPass"
                placeholder="Confirme contraseña"
                onChange={this.handleChange}
                name="confiPass"
                required
              />
            </div>

            <div className="form-group form-check" id="checkID">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="term"
                  id="term"
                  onChange={this.handleChangeTerms}
                />
                Estoy de acuerdo con los términos y condiciones del sitio
              </label>
            </div>
          </form>
          <div className="buttons">
            <Button
              type={"button"}
              content={"registrarse"}
              classType={"Mybtn btn4"}
              click={() => _RegistroController.SingUp({
                user: this.state.form.usuario,
                email: this.state.form.correo,
                pass: this.state.form.pass,
                confipass: this.state.form.confiPass,
                check: this.state.form.terms
              }, this.incoPass)}
              id={"registrarse"}
              name={"registrarse"}
            />
          </div>
        </div>
      );

      return formulario;
    } catch (error) {
      return <ErrorPage errorValue={error} value={true} />;
    }
  }
}

export default InsForm;
