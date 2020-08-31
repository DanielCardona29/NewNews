const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');


//Actualizar usuario
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { user, pass, email, access } = req.body;
    if (user && pass && email) {
        let sql = `UPDATE users SET ? WHERE ID = '${id}'`;
        const usersOBJ = {
            user: user,
            email: email,
            pass: pass,
            access: access,
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    };
});

module.exports = router;