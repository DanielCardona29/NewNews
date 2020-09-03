
const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

function getDate() {
    const d = new Date();
    const output = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    console.log(output);
    return output;
}


//Enviar un like de un usuario nuevo
router.post('/likes/', (req, res) => {
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

//Enviar un comentario nuevo
router.post('/', (req, res) => {
    const { content, idnewcoment, idusercoment, Punt } = req.body;
    console.log(req.body);
    if (content && idnewcoment && idusercoment && Punt) {
        console.log(getDate());
        const sqlObject = {
            content: content,
            date: getDate(),
            idnewcoment: idnewcoment,
            idusercoment: idusercoment,
            Punt: Punt,
        }
        const sql = 'INSERT INTO coments SET ?';
        connection.query(sql, sqlObject, error => {
            if (error) {
                console.log(`Hay un error al insertar un like ${error}`);
                res.json({ value: false });
            } else {
                res.json({ response: sqlObject, value: true });
            }
        });

    } else {
        res.json({ value: false });
    }
})
//Conusltar el id de un comentario
router.post('/id/', (req, res) => {
    console.log(req.body);
    let sql = `SELECT id FROM coments WHERE content = '${req.body.content}' AND date = '${req.body.date}' AND idnewcoment = '${req.body.idnewcoment}' AND Punt = '${req.body.Punt}' AND idusercoment ='${req.body.idusercoment}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Error al extraer id del comentairo ${error}`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true, id: results[0].id })
        } else {
            res.json({ value: false })
        }
    });
})


module.exports = router;