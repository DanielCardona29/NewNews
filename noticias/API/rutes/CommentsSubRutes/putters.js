const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');


//Eliminar un like actualizando su estado
router.put('/likes/', (req, res) => {
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
});



//Eliminar un like actualizando su estado
router.put('/comment/?:userid/?:commentid', (req, res) => {
    const { content } = req.body;
    const { commentid, userid } = req.params;
    console.log(req.body);
    if (userid && commentid && content) {
        const sqlObject = {
            content: content,
            Punt: req.body.Punt || 1
        }
        const sql = `UPDATE coments SET ? WHERE  idusercoment='${userid}' AND id = '${commentid}'`;
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
});

module.exports = router;