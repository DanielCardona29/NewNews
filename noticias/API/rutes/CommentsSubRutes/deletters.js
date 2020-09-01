
const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

router.delete('/?:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM coments WHERE id  = '${id}'`;
    connection.query(sql, error => {
        (error) ? console.log(error) : res.json({ value: true });
    });
});

router.delete('/likes/?:id', (req, res) => {
    const { id } = req.params;
    let sql = `DELETE FROM comentslikes WHERE commentid  = '${id}'`;
    connection.query(sql, error => {
        (error) ? console.log(error) : res.json({ value: true });
    });
});

module.exports = router;