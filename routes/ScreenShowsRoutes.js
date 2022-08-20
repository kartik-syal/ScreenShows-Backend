var express = require('express');
var router = express.Router();
var multer = require('multer');
var cors = require('cors');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage:storage});

var ScreenShows_controller = require('../controllers/ScreenShowsController');

router.get('/', ScreenShows_controller.view_shows);

router.get('/api', cors(), ScreenShows_controller.view_shows_api);

router.get('/img-api', cors(), ScreenShows_controller.view_img_api);

router.get('/add', (req, res) => {
    res.render('add');
});

router.post('/add-show', upload.single('Image'), ScreenShows_controller.add_show);

router.get('/delete-show/:id', ScreenShows_controller.delete_show);

router.get('/update/:id', ScreenShows_controller.update_display);

router.post('/update/update-show/:id', upload.single('Image'), ScreenShows_controller.update_show);

module.exports = router;