const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser')
const app = express();
const _ = require('underscore');
const fs = require('fs');
const PORT = process.env.PORT || 5000;
const uniqid = require('uniqid');

app.use(bodyParser.json());
//MySqul
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'noticias'
})

//Obtener la Fecha
function getDate() {
    const d = new Date();
    const output = `${d.getFullYear()}/${d.getMonth()}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    console.log(output);
    return output;
}

//Check connect 
connection.connect(error => {
    (error) ? console.log(error) : console.log('Base de datos conectada');
});

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

///Inicio
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API')
});



//-------------------Estas son las rutas CRUD de los NEWS--------------------------------------------------------------------------------/////


//Obtener las 10 ultimas noticias registradas
app.get('/news/ult/news', (req, res) => {
    const sql = ' SELECT * FROM news ORDER BY date DESC LIMIT 10';
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ results, value: true });
        } else {
            res.json({ value: false })
        }
    });
});

//Obtener las diez noticias mas populares
app.get('/news/best/popular/news', (req, res) => {
    const sql = `SELECT *, stats.views, stats.likes, stats.dislikes FROM news, (SELECT newsid, SUM(views) AS views, SUM(likes) as likes, SUM(dislikes) AS dislikes FROM stats GROUP BY newsid) AS stats WHERE news.id = stats.newsid`;

    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            let dataRow = [];

            results.forEach(element => {
                dataRow = [
                    ...dataRow,
                    {
                        id: element.id,
                        title: element.title,
                        content: element.content,
                        img: element.img,
                        date: element.date,
                        userid: element.userid,
                        stats: {
                            views: element.views,
                            likes: element.likes,
                            dislikes: element.dislikes
                        }

                    }
                ]
            })

            res.json({ results: dataRow, value: true })

        } else {
            res.json({ value: false })
        }
    });
});




//Recuperar lista de noticias
app.get('/news', (req, res) => {
    const sql = ' SELECT * FROM news ORDER BY date DESC';
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ results, value: true });
        } else {
            res.json({ value: false })
        }
    });
});

//Recuperar las noticias que ha escrito un usuario
//Consulta exemplo /news/user/rd4jzl04kdopnqyd
app.get('/news/user/?:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM news WHERE userid = (SELECT id FROM users WHERE id = '${id}')`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ results, value: true });
        } else {
            res.json({ value: false })
        }
    });
});

//Atraer una noticia por id
//Atraer una noticia por id /news/detail/3
app.get('/news/detail/?:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM news WHERE id = '${id}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ results, value: true });
        } else {
            res.json({ value: false })
        }
    });
});

//Actualizar una noticia
//Este es un ejemplo la solicitud /news/update/1
app.put('/news/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, img, date, userid } = req.body;
    if (title && content && img && date && userid) {
        let sql = `UPDATE news SET ? WHERE ID = ${id}`;
        const usersOBJ = {
            title: title,
            content: content,
            img: img,
            date: date,
            userid: userid
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    }
});

//Envia una noticia
//Este es un ejemplo la solicitud /news/set/1
app.post('/news/set/', (req, res) => {
    const { title, content, img, userid } = req.body;
    if (title && content && img && userid) {
        let sql = `INSERT INTO news SET ?`;
        const usersOBJ = {
            title: title,
            content: content,
            img: img,
            date: getDate(),
            userid: userid
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    }
});




//Eliminar una noticia
//este es un ejemplo de la solicitud /news/delete/1
app.delete('/news/delete/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM news WHERE ID = ${id}`;
    connection.query(sql, error => {
        (error) ? console.log(error) : res.json({ value: true });
    });
})






//-------------------Estas son las rutas CRUD de los USUARIOS--------------------------------------------------------------------------------/////


//validar la existencia del correo de un usuario en la base de datos
app.get('/users/validationemail/?:email', (req, res) => {
    const { email } = req.params;

    const sql = `SELECT id FROM users WHERE email = '${email}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true });
        } else {
            res.send({ value: false })
        }
    });
});

//validar la existencia del usuario en la base de datos
app.get('/users/validationuser/?:user', (req, res) => {
    const { user } = req.params;

    const sql = `SELECT id FROM users WHERE user = '${user}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true });
        } else {
            res.send({ value: false })
        }
    });
});

//validar el ingreso de los usuarios
//Ejemplo de una consulta users/validationlogin/user/password
app.get('/users/validationlogin/?:user/?:pass', (req, res) => {
    const { pass, user } = req.params;
    const sql = `SELECT id, access FROM users WHERE user = '${user}' and pass ='${pass}'`;
    connection.query(sql, (error, results) => {

        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {

            let data = JSON.stringify(results);
            data = JSON.parse(data);
            if (data[0].access === "true") {

                res.json({
                    results,
                    access: true,
                    value: true
                });

            } else {

                res.json({
                    access: false,
                    value: true
                });

            }
        } else {
            res.send({ value: false })
        }
    });
});

//Recuperar lista de usuarios
app.get('/users', (req, res) => {
    const sql = 'SELECT id, user, email, access FROM users';
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ value: false })
        }
    });
});

//recuperrar un Usuario por ID
app.get('/users/?:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT user, email, access FROM users WHERE id = '${id}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ results, value: true });
        } else {
            res.send({ value: false })
        }
    });
});

//Creando un usuario nuevo
app.post('/users', (req, res) => {
    const { user, pass, email, access } = req.body;
    console.log(req.body);
    if (user && pass && email) {
        let sql = `INSERT INTO users SET ?`;
        const usersOBJ = {
            id: uniqid(),
            user: user,
            email: email,
            pass: pass,
            access: access,
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    }
});

//Actualizar usuario
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { user, pass, email, access } = req.body;
    if (user && pass && email) {
        let sql = `UPDATE users SET ? WHERE ID = '${id}'`;
        const usersOBJ = {
            user: user,
            email: email,
            pass: pass,
            access: access,
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    };
});

//Eliminar usuario
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM users WHERE ID = '${id}'`;
    connection.query(sql, error => {
        (error) ? console.log(error) : res.json({ value: true });
    });
})

// -----------------------------CONTROLADOR DE ESTADISTCAS
//Obtener las estadisticas likes, dislikes, views de una noticia
app.get('/news/stats/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT likes, views, dislikes FROM stats WHERE  newsid = '${id}'`;
    connection.query(sql, (error, results) => {

        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            let likes = 0;
            let dislikes = 0;
            let views = 0;
            results.forEach(element => {
                likes = element.likes + likes;
                dislikes = element.dislikes + dislikes;
                views = element.views + views;
            });

            const statsOBj = {
                likes: likes,
                dislikes: dislikes,
                views: views
            }

            res.json({ ...statsOBj });
        } else {

            const statsOBj = {
                likes: 0,
                dislikes: 0,
                views: 0
            }

            res.json({ ...statsOBj });
        }

    });
})



//Obtener las noticias mejor calificadas
app.get('/news/best/calificaties/news', (req, res) => {
    const sql = `SELECT *, stats.views, stats.likes, stats.dislikes, stats.popularity FROM news, (SELECT newsid, (SUM(likes) + SUM(dislikes) /2) AS popularity, SUM(views) AS views, SUM(likes) as likes, SUM(dislikes) AS dislikes FROM stats GROUP BY newsid) AS stats WHERE news.id = stats.newsid ORDER BY stats.popularity DESC`;

    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            let dataRow = [];

            results.forEach(element => {
                dataRow = [
                    ...dataRow,
                    {
                        id: element.id,
                        title: element.title,
                        content: element.content,
                        img: element.img,
                        date: element.date,
                        userid: element.userid,
                        stats: {
                            views: element.views,
                            likes: element.likes,
                            dislikes: element.dislikes
                        }

                    }
                ]
            })

            res.json({ results: dataRow, value: true })

        } else {
            res.json({ value: false })
        }
    });
});

//Consultar si un usuario ya tiene una visita registrada en una noticia
app.get('/news/visit/consult/?:newsid/?:userid', (req, res) => {
    const { newsid, userid } = req.params;
    console.log(req.body);
    if (newsid && userid) {
        const sql = `SELECT userid FROM stats WHERE userid = '${userid}' AND newsid = ${newsid}`;
        connection.query(sql, (error, results) => {
            if (error) {
                console.log(`Hubo un error en la base de datos ${error}`);
                res.json({ value: false })
            } else if (results.length > 0) {

                res.json({ value: true });
            } else {
                res.json({ value: false })
            }
        });
    } else {
        res.json({ value: false });
    }
})

//Agregar la visita de un usuario a las estadisiticas.
app.post('/news/visit/', (req, res) => {
    const { newsid, userid } = req.body;
    console.log(req.params);
    if (newsid && userid) {
        const sqlObject = {
            likes: 0,
            dislikes: 0,
            views: 1,
            newsid: newsid,
            userid: userid
        }
        const sql = 'INSERT INTO stats SET ?';
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al insertar una visita ${error}`);
                res.json({ value: false });
            } else {
                res.json({ value: true });
            }
        })

    } else {
        res.json({ value: false });
    }
})
// -------------------- Metodo crud de los comentarios --------------------------------------------


//Obtener los comentarios de una noticia
app.get('/news/comments/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM coments WHERE idnewcoment = '${id}'`
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            const response = {
                value: true,
                coments: results.length,
                results: results
            }
            res.json({ response })
        } else {
            const response = {
                value: true,
                coments: 0,
                results: []
            }
            res.json({ response })
        }
    })
});

//Obtener los likes que tiene un comentario
app.get('/news/comments/likes/:commentid/:newsid/', (req, res) => {
    const { newsid, commentid } = req.params;
    console.log(req.params);
    let sql = `SELECT SUM(likeCom) as likes FROM comentslikes WHERE commentid = '${commentid}' AND newsid = '${newsid}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Error al extraer los likes del comentario ${commentid} de la noticia ${newsid} Error: ${error}`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true, likes: results[0].likes })
        } else {
            res.json({ value: false })
        }
    });
})
//Consultar si un usuario tiene un like registrado en un comentario
app.get('/news/comments/likes/:commentid/:newsid/:userid', (req, res) => {
    //obtenemos los valores de los parametros 
    const { newsid, commentid, userid } = req.params;
    //Construimos la consulta
    let sql = `SELECT likeCom, userid FROM comentslikes WHERE newsid='${newsid}' AND userid='${userid}' AND commentid= '${commentid}'`;
    //hacemos la conexion
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Error al saber si un usuario tiene un like registrado ${commentid} de la noticia ${newsid} Error: ${error}`);
            res.json({ value: false })
        } else if (results.length > 0) {
            //Si todo sale bien deberiamos de tener un valor
            //Construimos un objeto para manejar ese resultado
            let resultsOBJ = {};

            //Ahora recorremos todo ese resultado para inicializar nuestro valor de nuestro objeto
            results.forEach(element => {
                resultsOBJ = { isLiked: element.likeCom }
            })
            //Si el resultado es mayor a 0 entonces damos como respuesta un true
            if (resultsOBJ.isLiked > 0){
                res.json({ value: true })
            }else{
                //En caso de que sea 0 damos como respuesta un false
                res.json({ value: false })
            }
        } else {
            res.json({ value: false })
        }
    });
})

//Enviar un like de un usuario nuevo
app.post('/news/comments/likes/', (req, res) => {
    const { newsid, userid, commentid } = req.body;
    if (newsid && userid && commentid) {
        const sqlObject = {
            likeCom: 1,
            userid: userid,
            commentid: commentid,
            newsid: newsid,
        }
        const sql = 'INSERT INTO comentslikes SET ?';
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al insertar un like ${error}`);
                res.json({ value: false });
            } else {
                res.json({ value: true });
            }
        });

    } else {
        res.json({ value: false });
    }
})

//Eliminar un like actualizando su estado
app.put('/news/comments/likes/', (req, res) => {
    const { newsid, userid, commentid, data } = req.body;
    console.log(req.body);
    if (newsid && userid && commentid) {
        const sqlObject = {
            likeCom: data,
            userid: userid,
            commentid: commentid,
            newsid: newsid,
        }

        const sql = `UPDATE comentslikes SET ? WHERE newsid='${newsid}' AND userid='${userid}' AND commentid= '${commentid}'`;
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al actualizar un like ${error}`);
                res.json({ value: false });
            } else {
                res.json({ value: true });
            }
        });

    } else {
        res.json({ value: false });
    }
})