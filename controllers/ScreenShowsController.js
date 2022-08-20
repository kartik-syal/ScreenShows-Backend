var ScreenShow = require('../models/ScreenShowsModel');
var fs = require('fs');
var path = require('path');

exports.view_shows = function (req, res, next) {
    ScreenShow.find((err, screenshows) => {
        var arr = []
        screenshows.forEach((i, g) => {
            let o = { ...i }
            o["data"] = i.Image.data.toString('base64');
            o["content"] = i.Image.contentType
            arr.push(o);
        })
        if (!err) {
            res.render('home', { ScreenShowData: JSON.stringify(screenshows), ImageData: JSON.stringify(arr) });
        } else {
            console.log('Failed to retrieve Shows Data: ' + err);
        }
    });
}

exports.view_shows_api = function (req, res, next) {
    ScreenShow.find((err, screenshows) => {
        if (!err) {
            res.send(JSON.stringify(screenshows));
        } else {
            console.log('Failed to retrieve Shows Data: ' + err);
        }
    });
}

exports.view_img_api = function (req, res, next) {
    ScreenShow.find((err, screenshows) => {
        var arr = []
        screenshows.forEach((i, g) => {
            let o = { ...i }
            o["data"] = i.Image.data.toString('base64');
            o["content"] = i.Image.contentType
            arr.push(o);
        })
        if (!err) {
            res.send(arr);
        } else {
            console.log('Failed to retrieve Shows Data: ' + err);
        }
    });
}

exports.add_show = function (req, res, next) {
    var showsData = new ScreenShow({
        Title: req.body.Title,
        ReleaseDate: req.body.ReleaseDate,
        Category: req.body.Category,
        Description: req.body.Description,
        Rating: req.body.Rating,
        Votes: req.body.Votes,
        Image: {
            data: fs.readFileSync(path.join('D:/NodeJS/ScreenShows_project/ScreenShows_backend/public/images/' + req.file.filename)),
            contentType: 'image/png'
        }
    });
    showsData.save()
        .then(item => {
            res.render('back2dashboard', { type: "Added" });
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
}

exports.update_display = function (req, res, next) {
    ScreenShow.findById(req.params.id, (err, screenshows) => {
        if (!err) {
            res.render('update', { ScreenShowData: JSON.stringify(screenshows) });
        } else {
            console.log('Failed to retrieve Shows Data: ' + err);
        }
    });
}

exports.update_show = function (req, res, next) {
    ScreenShow.findByIdAndUpdate(req.params.id, req.body, (err, screenshows) => {
        if (!err) {
            res.render('back2dashboard', { type: "Updated" });
        } else {
            console.log('Error during record update : ' + err);
        }
    });
}

exports.delete_show = function (req, res, next) {
    ScreenShow.findByIdAndRemove(req.params.id, (err, screenshows) => {
        if (!err) {
            res.render('back2dashboard', { type: "Deleted" });
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
}