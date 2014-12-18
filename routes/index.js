var express = require('express'),
    standupCtrl = require('../controllers/standup.server.controller.js');

var router = express.Router();

router.get('/', standupCtrl.list);
router.post('/', standupCtrl.filterByMember);

router.get('/newnote', function (req, res) {
    res.render('newnote', { title: 'Standup - New Note' });
});

router.post('/newnote', standupCtrl.create);

module.exports = router;
