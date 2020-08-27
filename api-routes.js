let router = require('express').Router();
var tokenController = require('./tokenController');


router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Api Covid APP!',
    });
});

router.route('/images').get(tokenController.images);
router.route('/data').get(tokenController.dataCovidSp);

module.exports = router;