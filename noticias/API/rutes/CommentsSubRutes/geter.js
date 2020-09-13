
const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

//Obtener los comentarios de una noticia
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM coments WHERE idnewcoment = '${id}' ORDER BY id DESC`
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
router.get('/likes/:commentid/:newsid/', (req, res) => {
    const { newsid, commentid } = req.params;
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
router.get('/likes/:commentid/:newsid/:userid', (req, res) => {
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
            if (resultsOBJ.isLiked > 0) {
                res.json({ value: true })
            } else {
                //En caso de que sea 0 damos como respuesta un false
                res.json({ value: 0 })
            }
        } else {
            res.json({ value: false })
        }
    });
})

//consultar un comentario por id
router.get('/comment/:id', (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM coments WHERE id = '${id.trim()}'`;
    const consulta = connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Error al extraer los comentarios del usuario ${id}`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true, results })
        } else {
            res.json({ value: false })
        }
    });
});

//Extraer los comentarios que le gustarion a un usuario
router.get('/userlikes/likes/:userid', (req, res) => {
    const { userid } = req.params;
    let sql = `SELECT * FROM comentslikes WHERE userid = '${userid.trim()}'`;
    const consulta = connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Error al extraer los comentarios del usuario ${userid}`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true, results })
        } else {
            res.json({ value: false })
        }
    });
})
module.exports = router;

//Extraer los comentarios que ha escrito un usuario
router.get('/write/likes/:userid', (req, res) => {
    const { userid } = req.params;
    let sql = `SELECT * FROM coments WHERE 	idusercoment = '${userid.trim()}'`;
    const consulta = connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Error al extraer los comentarios del usuario ${userid}`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true, results })
        } else {
            res.json({ value: false })
        }
    });
})