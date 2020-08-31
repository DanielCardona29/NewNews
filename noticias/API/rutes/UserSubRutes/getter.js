const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

//validar la existencia del correo de un usuario en la base de datos
router.get('/validationemail/?:email', (req, res) => {
    const { email } = req.params;

    const sql = `SELECT id FROM users WHERE email = '${email}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true });
        } else {
            res.send({ value: false })
        }
    });
});

//validar la existencia del usuario en la base de datos
router.get('/validationuser/?:user', (req, res) => {
    const { user } = req.params;

    const sql = `SELECT id FROM users WHERE user = '${user}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ value: true });
        } else {
            res.send({ value: false })
        }
    });
});

//validar el ingreso de los usuarios
router.get('/validationlogin/?:user/?:pass', (req, res) => {
    const { pass, user } = req.params;
    const sql = `SELECT id, access FROM users WHERE user = '${user}' and pass ='${pass}'`;
    connection.query(sql, (error, results) => {

        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {

            let data = JSON.stringify(results);
            data = JSON.parse(data);
            if (data[0].access === "true") {

                res.json({
                    results,
                    access: true,
                    value: true
                });

            } else {

                res.json({
                    access: false,
                    value: true
                });

            }
        } else {
            res.send({ value: false })
        }
    });
});

//Recuperar lista de usuarios
router.get('/users', (req, res) => {
    const sql = 'SELECT id, user, email, access FROM users';
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json(results);
        } else {
            res.json({ value: false })
        }
    });
});

//recuperrar un Usuario por ID
router.get('/?:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT user, email, access FROM users WHERE id = '${id}'`;
    connection.query(sql, (error, results) => {
        if (error) {
            console.log(`Hubo un error en la base de datos`);
            res.json({ value: false })
        } else if (results.length > 0) {
            res.json({ results, value: true });
        } else {
            res.send({ value: false })
        }
    });
});


module.exports = router;