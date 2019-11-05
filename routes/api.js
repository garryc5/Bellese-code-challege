const express = require('express');
const router = express.Router();
const inCtrl = require('../controllers/inventory');

router.post('/', inCtrl.index );
router.post('/add',inCtrl.Add);
router.post('/delete/:id',inCtrl.Delete)
router.post('/update/:id',inCtrl.update)


module.exports = router;