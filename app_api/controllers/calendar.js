var mongoose = require('mongoose');

var EventModel = require('../models/calendar');

var app = require('../../app');

module.exports.getEvents = function (req, res) {
    EventModel.fetchEvents({year: req.query.year, month: req.query.month}, function (err, events) {
        if (err) {
            res.json({status: 4000, errors: errors});
        } else {
            res.json({status: 2000, data: events});
        }
    });
};

module.exports.createEvent = function (req, res) {
    var newEvent = new EventModel({
        year: req.body.year,
        month: req.body.month,
        date: req.body.date,
        weeksIndex: req.body.weeksIndex,
        dayIndex: req.body.dayIndex,
        title: req.body.title,
        description: req.body.description
    });
    EventModel.createEvent(newEvent, function (err, event) {
        if (err) {
            res.json({status: 4000, message: "Failed to create event"});
        } else {
            //Broadcasting to all when a new event successfully created
            app.io.sockets.emit('create_event', event);
            res.json({status: 2001, message: "Event created successfully", data: event});
        }
    });
};


module.exports.editEvent = function (req, res) {
    EventModel.editEvent({
        id: req.params.id,
        title: req.body.title,
        description: req.body.description
    }, function (err, event) {
        if (err) {
            res.json({status: 4000, message: "Failed to update event"});
        } else {
            //Broadcasting to all when an event get updated
            app.io.sockets.emit('edit_event', req.body);
            res.json({status: 2002, message: "Event updated successfully", data: req.body});
        }
    });
};

module.exports.deleteEvent = function (req, res) {
    EventModel.deleteEvent(req.params.id, function (err, event) {
        if (err) {
            res.json({status: 4000, message: "Failed to delete event"});
        } else {
            //Broadcasting to all when an event deleted
            app.io.sockets.emit('delete_event', req.query);
            res.json({status: 2003, message: "Event deleted successfully"});
        }
    });
};
