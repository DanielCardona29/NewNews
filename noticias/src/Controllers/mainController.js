
class MainControlle {

    //Extrae la información de un usuario de la base de datos 
    userConsult = async () => {
        //Sacamos el id del sessionStorage
        const id = sessionStorage.getItem('userid');
        const url = `http://localhost:5000/users/${id}`
        const element = await fetch(url)
            .then(element => {
                return element;
            })
        return element;
    }

    //Verificamos si un usuario se logueado correctamente
    userVerifi = async (access) => {
        //Sacamos el id del sessionStorage
        const id = sessionStorage.getItem('userid');
        //Si esta el id
        if (id) {
            //y si el acceso es verdadero entonces
            if (access === 'true') {
                //reentornamos verdadero
                return true
            } else {
                //Si el usuario no tiene acceso reentornamos falso
                return false;
            }
        } else {
            //si el usuario no tiene el id, reentornamos falso
            return false
        }

    }
}


export default MainControlle;