const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');


//Obtener las estadisticas likes, dislikes, views de una noticia
router.get('/:id', (req, res) => {
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
router.get('/best/calificaties/news', (req, res) => {
    const sql = `SELECT *, stats.views, stats.likes, stats.dislikes, stats.popularity FROM news, (SELECT newsid, (SUM(likes) + SUM(dislikes) /2) AS popularity, SUM(views) AS views, SUM(likes) as likes, SUM(dislikes) AS dislikes FROM stats GROUP BY newsid) AS stats WHERE news.id = stats.newsid AND ispublic='true' ORDER BY stats.popularity DESC`;

    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            let dataRow = [];

            results.forEach(element => {
                if (element.ispublic === 'true')
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
router.get('/visit/consult/?:newsid/?:userid', (req, res) => {
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

//Consultar si una noticia tiene un like o un dislike asociado
router.get('/likes/?:newsid/?:userid', (req, res) => {
    const { newsid, userid } = req.params;
    const sql = `SELECT likes, dislikes FROM stats WHERE newsid = '${newsid}' AND userid = '${userid}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hay un error en la base de datos al cosultar las noticias de la siguiente noticia ${newsid} := ${error}`);
            res.json({ value: false });
        } else {
            if (results.length > 0) {
                res.json({ results: results[0], value: true })
            } else {
                res.json({ value: false })
            }
        }
    })
});

module.exports = router;