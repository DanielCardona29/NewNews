const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const _ = require('underscore');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const news_routes = require('./rutes/news.js');
const user_routes = require('./rutes/user.js');
const comments_routes = require('./rutes/comments.js');
const stats_routes = require('./rutes/stats.js');
const path = require('path');


app.use(bodyParser.json());



//Agregar al acceso al CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(PORT, () => {
    console.log(`Server en el puerto ${PORT}`);
});

//Rutas 
//Notcias
app.use('/news', news_routes);
//Usuarios
app.use('/users', user_routes);
//Estadisticas
app.use('/stats', stats_routes);
//Commentarios
app.use('/comments', comments_routes);

//Static files, obtener imagenes
app.use(express.static(path.join(__dirname, 'src')))