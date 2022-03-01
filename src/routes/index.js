const { Router } = require('express');
const dogs = require('./dogs');
const temperament = require('./temperament');
const dog = require('./dog');

const router = Router();

router.use('/dogs', dogs);
router.use('/temperament', temperament);
router.use('/dog', dog);

module.exports = router;
