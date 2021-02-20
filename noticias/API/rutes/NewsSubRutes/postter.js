const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');
const multer = require('multer');
const path = require('path');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 5000;
const RuteResponse = {
    local: 'localhost',
    port: PORT
}

function getDate() {
    const d = new Date();
    const output = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDay() - 1} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    return output;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const newsUniqID = () => {
    const id = `${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}${getRandomInt(0, 9)}`
    return id;
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
        res.json({ value: true, url: url });
    }

});

//Envia una noticia
router.post('/set/', (req, res) => {
    const { title, content, img, userid, aling, ispublic } = req.body;
    if (title !== '' || content !== '<p>Empieza a escribir tu noticia aquí</p>' || img !== '' && userid) {
        let sql = `INSERT INTO news SET ?`;
        const newsOBJ = {
            id: newsUniqID(),
            title: title || 'Falta titulo para agregar',
            content: content,
            img: img,
            aling: aling || 'left',
            date: getDate(),
            userid: userid,
            ispublic: ispublic
        }
        connection.query(sql, newsOBJ, error => {
            (error) ? console.log(error) : res.json({
                value: true, id: newsOBJ.id,
                title: newsOBJ.title,
            });
        });
    } else {
        res.json({ value: false })
    }
});


module.exports = router;