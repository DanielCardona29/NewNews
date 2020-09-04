const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

function getDate() {
    const d = new Date();
    const output = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDay() - 1} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    return output;
}


//Actualizar una noticia que esta pública
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, content, img, date, userid } = req.body;
    if (title && content && img && date && userid) {
        let sql = `UPDATE news SET ? WHERE ID = ${id}`;
        const usersOBJ = {
            title: title,
            content: content,
            img: img,
            date: date,
            userid: userid
        }
        connection.query(sql, usersOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true });
        });
    }
});

//Actualizar una noticia que no se ha publicado
router.put('/save/:id', (req, res) => {
    const { id, title, content, img, aling, ispublic } = req.body;
    if (title !== '' || content !== '<p>Empieza a escribir tu noticia aquí</p>' || img !== '') {
        let sql = `UPDATE news SET ? WHERE ID = ${id}`;
        const newsOBJ = {
            title: title || 'Falta titulo para agregar',
            content: content,
            img: img,
            aling: aling || 'left',
            date: getDate(),
            ispublic: ispublic
        }
        connection.query(sql, newsOBJ, error => {
            (error) ? console.log(error) : res.json({ value: true,  id: id });
        });
    } else {
        res.json({ value: false })
    }
});


//Publicar una noticia

module.exports = router;