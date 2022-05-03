const express = require('express');
const router = express.Router();

// const auth = require('../Middleware/auth');

const stuffCtrl = require('../Controller/room');


router.post('/', /* auth, */ stuffCtrl.createThing);
router.get('/', /* auth, */ stuffCtrl.getAllStuff);
router.put('/:id', /* auth, */ stuffCtrl.modifyThing);
router.delete('/:id', /* auth, */ stuffCtrl.deleteThing);

module.exports = router;

export {};