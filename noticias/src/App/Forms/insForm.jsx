import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import swal from "sweetalert";

import Button from "../Buttons/Buttons.jsx";
import ErrorPage from "../../Pages/ErrorPage.jsx";
import "../../Styles/App/Form/form.scss";

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

  //Esta propiedad transforma el codigo en caso de que las contrasñas no coincidan
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

  //Esta propiedad transforma el checkbox en caso de que este incorrecto
  termsnocheck = (value) => {
    if (!value) {
      $("#checkID").css("border", "1px solid red");
    } else {
      $("#checkID").css("border", "1px solid green");
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

  //con esta propiedad se validan que los campos esten completados correctamente;
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

  //Con esta propiedad validamos la viabilidad del formulario y verificamos que todos los datos esten correctos
  validateAll = async () => {
    //Primero validamos que todos los campos estan completados correctamente;
    //Cada variable deberia tener el valor de true si estan de manera correcta;
    let user = this.validate("usuario", 5);
    let email = this.validate("correo");
    let pass = this.validate("pass", 6);
    let confiPass = this.validate("confiPass", 6);
    let terms = this.state.form.terms;

    //Verificamos que todas las variables esten como queremos
    if (user && email && pass && confiPass) {
      //Ahora veficamos que las contraseña coincidan
      if (this.state.form.pass.trim() === this.state.form.confiPass.trim()) {
        this.incoPass(true);
        //Validamos que los terminos y condiciones este check
        if (terms) {
          //si esta check enviamos un verdadero para seguir
          this.termsnocheck(true);
          //Ahora hacemos una consulta a la appi para verificar que elc orreo que ingrese el usuario es el correcto
          let consultaCorreo = await this.consultarUsuario(
            this.state.form.correo,
            "email"
          );

          if (!consultaCorreo) {
            let consultaUsurio = await this.consultarUsuario(
              this.state.form.usuario,
              "user"
            );

            if (!consultaUsurio) {
              return true;
            } else {
              swal({
                text: "Al parecer ya tenemos este usuario registrado",
                button: "Aceptar",
              });
              return false;
            }
          } else {
            swal({
              text: "Al parecer ya tenemos este correo registrado",
              button: "Aceptar",
            });
            return false;
          }
        } else {
          //En caso de que no sea asi le informamos al usuario
          this.termsnocheck(false);
          swal({
            text: "Debe aceptar los terminos y condiciones del sistema",
            button: "Aceptar",
          });
        }
      } else {
        //Envia que las contraseñas no son correctas
        this.incoPass(false);
        return false;
      }
    } else {
      //En caso de que esta primera propiedad no se cumpla informamos al usuario por medio de una alerta
      if (!user) {
        swal({
          text: "Debes terner un usuario",
          button: "Aceptar",
        });
      } else if (user.length < 5) {
        swal({
          text: "El user es muy corto debe ser mayor 5 caracteres",
          button: "Aceptar",
        });
      } else if (!email) {
        swal({
          text: "Nos hace falta un correo",
          button: "Aceptar",
        });
      } else if (email.length < 8) {
        swal({
          text: "Al parecer el correo no es valido",
          button: "Aceptar",
        });
      } else if (!pass) {
        swal({
          text: "necesitamos una contraña para continuar",
          button: "Aceptar",
        });
      } else if (pass.length < 6) {
        swal({
          text: "La contraseña debe tener al menos 6 caracteres",
          button: "Aceptar",
        });
      } else if (!confiPass) {
        swal({
          text:
            "Para verificar que la contraseña este correcta debes verificarla aquí",
          button: "Aceptar",
        });
      }

      return false;
    }
  };

  //esta propiedad veficia si el correo o usuario se encuentra registrado en la base de datos
  async consultarUsuario(dato, formato) {
    let url = `http://localhost:5000/users/validation${formato}/${dato}`;
    const data = await fetch(url);
    const response = await data.json();
    return response.value;
  }

  async hacerRegistro() {
    let url = `http://localhost:5000/users`;
    const data = {
      user: this.state.form.usuario,
      email: this.state.form.correo,
      pass: this.state.form.pass,
      access: "true",
    };

    const value = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        return response.value;
      });

    return value;
  }

  //Con esta propiedad damos submit al formulario y
  submit = async (e) => {
    //Consultamos si todas las validaciones se han hecho correctamente
    const validate = await this.validateAll();
    //Si las validacions estan hechas de la manera correcta
    if (validate) {
      //entonces hacemos el registro en la base de datos
      let registro = await this.hacerRegistro();
      console.log(registro);
      if (registro) {
        //El registro se hizo de manera correcta, entonces le informamos al usuario que el proceso fue correcto
        swal({
          title: "Genial!",
          text: "Todo ha salido bien!",
          icon: "success",
          button: "Aceptar!",
        })
          //Y redireccionamos al incio de sesión
          .then((value) => {
            // window.location.href = '/'
          });
      } else {
        //En caso de que el registro no se haga de manera correcta, le informamos al usuario que lo intnte de nuevo
        swal({
          text: "Algo ha salido mal, intenta de nuevo por favor!",
          button: "Aceptar!",
        });
      }
    }
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
              <label>Las contraseñas no coinciden</label>
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
              click={() => this.submit()}
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
