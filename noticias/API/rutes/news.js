
const express = require('express');
const router = express.Router();

const getter = require('./NewsSubRutes/geters.js');
const putter = require('./NewsSubRutes/putter.js');
const deletter = require('./NewsSubRutes/deletter.js');
const postter = require('./NewsSubRutes/postter.js');

//Getters de las nosticias
router.use('', getter);
//Putters de las noticas
router.use('', putter);
//Deletters de las noticas 
router.use('', deletter);
//Postters de las noticias
router.use('', postter);

module.exports = router;


