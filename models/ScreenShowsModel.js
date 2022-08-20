var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var ScreenShowsSchema = new mongoose.Schema({
    Title: String,
    ReleaseDate: Date,
    Category: String,
    Description: String,
    Rating: Number,
    Votes: Number,
    Image:{
        data: Buffer,
        contentType: String
    }
});

ScreenShowsSchema.plugin(autoIncrement.plugin, {
    model: 'ScreenShow',
    field: 'ShowId',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model('ScreenShow', ScreenShowsSchema);