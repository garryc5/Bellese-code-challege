const express = require('express');
const router = express.Router();
const inCtrl = require('../controllers/inventory');

router.get('/index', inCtrl.index );
router.post('/add',inCtrl.Add);
router.Delete('/delete/:id',inCtrl.Delete)
router.post('/update/:id',inCtrl.update)


module.exports = router;