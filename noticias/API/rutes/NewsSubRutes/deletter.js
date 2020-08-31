const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

//Eliminar una noticia
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM news WHERE ID = ${id}`;
    connection.query(sql, error => {
        (error) ? console.log(error) : res.json({ value: true });
    });
});

module.exports = router;