const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');
const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');
const { Route } = require('react-router-dom');
const PORT = process.env.PORT || 5000;
const RuteResponse = {
    local: 'localhost',
    port: PORT
}

function getDate() {
    const d = new Date();
    const output = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    console.log(output);
    return output;
}

//Middleweres 
//Son codigos que se ejecutan antes de ejecutar las rutas

const storage = multer.diskStorage({
    destination: path.join('src/api/images/'),
    filename: (req, file, cb) => {
        cb(null, (uniqid() + file.originalname).toLocaleLowerCase());
    }
});

router.use(multer({
    storage,
    dest: path.join('src/api/images/'),
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
}).single(`NewImage`));

//Recibir la imagen 
router.post('/image/upload', (req, res) => {
    const { isFile, url } = req.body;
    if (isFile === 'true') {
        console.log(req.body);
        res.json({ value: true, url: `http://${RuteResponse.local}:${RuteResponse.port}/api/images/${req.file.filename}` });
    } else {
        console.log('hola');

        res.json({ value: true, url: url });
    }

});



//Envia una noticia
router.post('/set/', (req, res) => {
    const { title, content, img, userid, aling } = req.body;
    if (title && content && img && userid) {
        let sql = `INSERT INTO news SET ?`;
        const usersOBJ = {
            title: title,
            content: content,
            img: img,
            aling: aling || 'left',
            date: getDate(),
            userid: userid,
            ispublic: ispublic
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    }
});



module.exports = router;