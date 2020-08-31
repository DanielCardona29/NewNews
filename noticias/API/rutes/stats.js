
const express = require('express');
const connection = require('../connection.js');
const router = express.Router();
const getterts = require('./StatsSubRutes/getters');
const Posters = require('./StatsSubRutes/postters.js');
const Putters = require('./StatsSubRutes/putters.js');
const Deletters = require('./StatsSubRutes/deletters.js');

//Getters de los commentarios
router.use('', getterts);

//Setters de los comentarios
router.use('', Posters);

//Putters de los comentarios 
router.use('', Putters);

//Deletters de los comentarios 
router.use('', Deletters);

module.exports = router;