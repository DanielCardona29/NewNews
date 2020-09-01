
const express = require('express');
const router = express.Router();
const getterts = require('./CommentsSubRutes/geter.js');
const Posters = require('./CommentsSubRutes/posters.js');
const Putters = require('./CommentsSubRutes/putters.js');
const Delete = require('./CommentsSubRutes/deletters.js');

//Getters de los commentarios
router.use('/get', getterts);

//Setters de los comentarios
router.use('/post', Posters);

//Putters de los comentarios 
router.use('/put', Putters);

//Deletters de los comentrios 
router.use('/delete', Delete)

module.exports = router;