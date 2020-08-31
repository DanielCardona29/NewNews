const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

//Eliminar usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM users WHERE ID = '${id}'`;
    connection.query(sql, error => {
        (error) ? console.log(error) : res.json({ value: true });
    });
})


module.exports = router;