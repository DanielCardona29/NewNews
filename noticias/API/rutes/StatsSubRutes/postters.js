const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

//Agregar la visita de un usuario a las estadisiticas.
router.post('/visit/', (req, res) => {
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
//Enviar un like a una noticia
router.post('/likes/sett', (req, res) => {
    const { newsid, userid } = req.body;
    if (userid && newsid) {
        const sqlObject = {
            likes: 1,
            dislikes: 0,
        }
        //esta es la consulta
        let sql = `UPDATE stats SET ? WHERE newsid = '${newsid}' AND userid ='${userid}'`
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al insertar un like en la noticia ${newsid}: ${error}`);
                res.json({ value: false });
            } else {
                res.json({ value: true })
            }
        });
    } else {
        res.json({ value: false })
    }
});
//Quitar un like
router.post('/likes/nosett', (req, res) => {
    const { newsid, userid } = req.body;
    if (userid && newsid) {
        const sqlObject = {
            likes: 0,
        }
        //esta es la consulta
        let sql = `UPDATE stats SET ? WHERE newsid = '${newsid}' AND userid ='${userid}'`
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al insertar un like en la noticia ${newsid}: ${error}`);
                res.json({ value: false });
            } else {
                res.json({ value: true })
            }
        });
    } else {
        res.json({ value: false })
    }
});
//Enviar un dislike
router.post('/dislikes/sett', (req, res) => {
    const { newsid, userid } = req.body;
    if (userid && newsid) {
        const sqlObject = {
            likes: 0,
            dislikes: 1,
        }
        //esta es la consulta
        let sql = `UPDATE stats SET ? WHERE newsid = '${newsid}' AND userid ='${userid}'`
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al insertar un like en la noticia ${newsid}: ${error}`);
                res.json({ value: false });
            } else {
                res.json({ value: true })
            }
        });
    } else {
        res.json({ value: false })
    }
});
//Quitar un dislike
router.post('/dislikes/nosett', (req, res) => {
    const { newsid, userid } = req.body;
    if (userid && newsid) {
        const sqlObject = {
            dislikes: 0,
        }
        //esta es la consulta
        let sql = `UPDATE stats SET ? WHERE newsid = '${newsid}' AND userid ='${userid}'`
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al insertar un like en la noticia ${newsid}: ${error}`);
                res.json({ value: false });
            } else {
                res.json({ value: true })
            }
        });
    } else {
        res.json({ value: false })
    }
});



module.exports = router;