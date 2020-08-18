import React from 'react';

import Button from '../Buttons/Buttons.jsx';


class LoginForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            form: {
                user: '',
                pass: ''
            }
        }
    }

    handleChange = e => {
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
    }

    submit = async e => {
        
        let url = `http://localhost:5000/users/validationlogin/${this.state.form.user}/${this.state.form.pass}`
        let response = await this.consulta(url);
        console.log(response);
        
    }

    render() {
        const Login =
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="user">Usuario</label>
                        <input type="text" className="form-control" id="user" aria-describedby="userHelp" placeholder="Usuario" name="user" value ={this.state.form.user} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Contraseña</label>
                        <input type="password" className="form-control" id="pass" placeholder="Contraseña" name ="pass" value ={this.state.form.pass} onChange={this.handleChange} />
                    </div>
                </form>
                <Button type={'button'} content={'ingresar'} classType={'Mybtn btn1'} click={() => this.submit() } id={'ingresar'} name={'ingresar'} />
            </div>;

        return Login;
    }
}

export default LoginForm;