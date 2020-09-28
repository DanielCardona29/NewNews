const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

//Recuperar lista de noticias
router.get('/', (req, res) => {
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

//Obtener las 10 ultimas noticias registradas
router.get('/ult/news', (req, res) => {
    const sql = `SELECT * FROM news WHERE ispublic = 'true' ORDER BY date DESC LIMIT 10`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            let dataRow = [];
            results.forEach(element => {
                if (element.ispublic === 'true') {
                    dataRow = [
                        ...dataRow,
                        {
                            id: element.id,
                            title: element.title,
                            content: element.content,
                            img: element.img,
                            aling: element.aling,
                            date: element.date,
                            userid: element.userid,

                        }
                    ]
                }
            })

            res.json({ results: dataRow, value: true });
        } else {
            res.json({ value: false })
        }
    });
});

//Obtener las diez noticias mas populares
router.get('/best/popular/news', (req, res) => {
    const sql = `SELECT *, stats.views, stats.likes, stats.dislikes FROM news, (SELECT newsid, SUM(views) AS views, SUM(likes) as likes, SUM(dislikes) AS dislikes FROM stats GROUP BY newsid) AS stats WHERE news.id = stats.newsid AND ispublic = 'true'`;

    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            let dataRow = [];
            results.forEach(element => {
                if (element.ispublic === 'true') {
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
                }
            })

            res.json({ results: dataRow, value: true })

        } else {
            res.json({ value: false })
        }
    });
});

//Recuperar las noticias que ha escrito un usuario
router.get('/user/?:id', (req, res) => {
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

//Consultar si un usuario puede actualizar una noticia 

router.get('/user/news/update/?:userid/?:newsid', (req, res) => {
    console.log('Consultado');
    const { newsid, userid } = req.params;
    const sql = `SELECT * FROM news WHERE userid ='${userid}' AND id=${newsid}`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos al consultar la posibilidad de editar una noticia ${error}`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true });
        } else {
            res.json({ value: false })
        }
    });
});


//Atraer una noticia por id
router.get('/detail/?:id', (req, res) => {
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

//Consultar si una noticia puede ser actualizada por un usuario
router.get('/consult/?:id/?:userid', (req, res) => {
    const { id, userid } = req.params;
    const sql = `SELECT id FROM news WHERE id = '${id}' AND userid = '${userid}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true });
        } else {
            res.json({ value: false })
        }
    });
});

//Cosultar las noticias que ha escrito un usuario
router.get('/userwrite/news/?:userid', (req, res) => {
    const { userid } = req.params;
    console.log(userid);
    const sql = `SELECT * FROM news WHERE userid = '${userid}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hay un error al extraer las noticias que le gusta a un usuario ${newsid} := ${error}`);
            res.json({ value: false });
        } else {
            if (results.length > 0) {
                res.json({ results, value: true })
            } else {
                res.json({ value: false })
            }
        }
    })
});


module.exports = router;