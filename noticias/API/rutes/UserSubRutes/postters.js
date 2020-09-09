const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');
const uniqid = require('uniqid');
const path = require('path')
const multer = require('multer');
const PORT = process.env.PORT || 5000;
const RuteResponse = {
    local: 'localhost',
    port: PORT
}

//Subir la imagen de un avatar de un usuairo
//instalando los Middleweres
//Middleweres 
//Son codigos que se ejecutan antes de ejecutar las rutas
const storage = multer.diskStorage({
    destination: path.join('src/avatars/images/'),
    filename: (req, file, cb) => {
        cb(null, (uniqid() + file.originalname).toLocaleLowerCase());
    }
});
router.use(multer({
    storage,
    dest: path.join('src/avatars/images/'),
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const minetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (minetype && extname) {
            return cb(null, true);
        } else {
            cb(false)
        }
    }
}).single(`AvatarImage`));

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
//Subir un avatar
router.post('/image/upload', (req, res) => {
    const { isFile, url } = req.body;
    res.json({ value: true, url: `http://${RuteResponse.local}:${RuteResponse.port}/avatars/images/${req.file.filename}` });
});
//Enviar el avatar a la base de datos
router.post('/set/avatar/', (req, res) => {
    const { url, userid } = req.body;
    if (userid) {
        let sql = `INSERT INTO avatars SET ?`;
        const newsOBJ = {
            id: uniqid(),
            url: url || 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light',
            userid: userid,
        }
        connection.query(sql, newsOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true, url: newsOBJ.url });
        });
    } else {
        res.json({ value: false })
    }
});

module.exports = router;