const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');


//Actualizar una noticia
router.put('/update/:id', (req, res) => {
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

module.exports = router;