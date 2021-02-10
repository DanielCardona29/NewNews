require('dotenv').config();
const app = require('./models/app.js');

const init = async () => {
    //Asiganmos el nuestro puerto
    const port = process.env.PORT || 3000
    //Conectamos en servidor a nuestro puerto local
    await app.listen(port)
        //Si todo esta bien enviamos el aviso de correcto a nuestra cosola
        .then(value => {
            console.log(`Server connected in port ${port}`);
        })
        //Si no enviamos el error a nuestra consola
        .catch(error => {
            console.log(`Was a error connecting the server ${error}`);
        });
}




