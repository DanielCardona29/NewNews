const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');
const uniqid = require('uniqid');

//Creando un usuario nuevo
router.post('/', (req, res) => {
    const { user, pass, email, access } = req.body;
    console.log(req.body);
    if (user && pass && email) {
        let sql = `INSERT INTO users SET ?`;
        const usersOBJ = {
            id: uniqid(),
            user: user,
            email: email,
            pass: pass,
            access: access,
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    }
});

module.exports = router;