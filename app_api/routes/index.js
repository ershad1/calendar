var express = require('express');
var router = express.Router();
var ctrlEvent = require('../controllers/calendar');

// Calling event routes when request first param is event
router.get('/events', ctrlEvent.getEvents);

//Create Event
router.post('/events', ctrlEvent.createEvent);

//Edit Event
router.put('/events/:id', ctrlEvent.editEvent);

//Delete Event
router.delete('/events/:id', ctrlEvent.deleteEvent);


module.exports = router;
