var mongoose = require('mongoose');

var calendarSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
});

mongoose.model('Calendar', calendarSchema);