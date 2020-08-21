//Librerias de terceros
import React from 'react';
import { Link } from 'react-router-dom'


//Documentos mios 
import '../../Styles/App/Buttons/Buttons.scss'

//Estas son las propiedades que recibe esta funcion 
//onClick = click
//onSubmit = submit 
//name = name 
//id = id
//class name = classType ? btn || btnSencon y btn1 btn2... btn6
//Ejemplo --- <Button type={'button'} content={'Hola'} classType={'btn btn1'} click={() => 'hola'} id={'newButton'} name={'newButton'} />

const Button = (props) => {

    if (props.type === 'button' || props.type === 'Button') {

        return <button
            onClick={props.click}
            onSubmit={props.submit}
            name={props.name}
            id={props.id}
            className={props.classType}
            hidden={props.hiddenType}
            >{props.content}
            </button>;

    } else if (props.type === 'a') {

        return <a
            href={props.link}
            onClick={props.click}
            onSubmit={props.submit}
            name={props.name}
            id={props.id}
            className={props.classType}>
            {props.content}
            </a>;

    } else {

        return <Link to={props.link} className={props.classType}>{props.content}</Link>;
    }

}

export default Button;