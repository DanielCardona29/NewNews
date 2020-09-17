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


//Actualizar un avatar
router.put('/update/avatar/', (req, res) => {
    const { url, userid } = req.body;
    if (userid) {
        let sql = `UPDATE avatars SET ? WHERE userid = '${userid}'`;
        const newsOBJ = {
            url: url || 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light',
        }
        connection.query(sql, newsOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true, url: url });
        });
    } else {
        res.json({ value: false })
    }
});

//Actualizar la contraseña de un usuario
router.put('/change/pass/', (req, res) => {
    const { pass, userid, newPass } = req.body;
    if (userid) {
        let sql = `UPDATE users SET ? WHERE id = '${userid}' AND pass = '${pass}'`;
        const newsOBJ = {
            pass: newPass,
        }
        connection.query(sql, newsOBJ, error => {
            if (error) {
                console.log(error);
                res.json({ value: false })
            } else {
                res.json({ value: true });
            }

        });
    } else {
        res.json({ value: false })
    }
});


module.exports = router;