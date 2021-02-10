const express = require('express');
const router = express.Router();
const getter = require('./UserSubRutes/getter.js');
const postters = require('./UserSubRutes/postters.js');
const putters = require('./UserSubRutes/putters.js');
const Deletters = require('./UserSubRutes/deletters.js');

router.use('', getter);

//Setters de los comentarios
router.use('', postters);

//Putters de los comentarios 
router.use('', putters);

//Deletters de los comentarios 
router.use('', Deletters);




module.exports = router;