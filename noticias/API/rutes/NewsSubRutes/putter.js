const express = require('express');
const router = express.Router();
const connection = require('../../connection.js');

function getDate() {
    const d = new Date();
    const output = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDay() - 1} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    return output;
}

//Actualizar una noticia
router.put('/save/:id', (req, res) => {
    const { id, userid, title, content, img, aling, ispublic } = req.body;
    if (title !== '' || content !== '<p>Empieza a escribir tu noticia aquí</p>' || img !== '') {
        let sql = `UPDATE news SET ? WHERE id = '${id}' AND userid= '${userid}'`;
        const newsOBJ = {
            title: title || 'Falta titulo para agregar',
            content: content,
            img: img,
            aling: aling || 'left',
            date: getDate(),
            ispublic: ispublic
        }
        connection.query(sql, newsOBJ, error => {

            if (error) {
                console.log(error)
                res.json({ value: false })
            } else {
                res.json({ value: true, id: id, title: newsOBJ.title });
            }


        });
    } else {
        res.json({ value: false })
    }
});


//Publicar una noticia

module.exports = router;