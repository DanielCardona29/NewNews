const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

//Envia una noticia
router.post('/set/', (req, res) => {
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




module.exports = router;