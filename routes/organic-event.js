const router = require('express').Router();

const User = require('../models/User.model');
const OrgEvents = require('../models/OrganicEvents.model');

const fileUploader = require('../config/cloudinary.config');


router.get('/create', (req, res, next) => {
    res.render('organic-event/create')
})

router.post('/create', fileUploader.single('eventImage'), (req, res, next) => {
    const {title, date, eventCreator, location, genre, description} = req.body;
    if(req.file) {

    } else {
        OrgEvents.create({title, date, eventCreator, location, genre, description})
            .then((createdEvent) => {
                console.log(createdEvent);
                return User.findByIdAndUpdate(req.app.locals.user._id, { $push: {organicEvents: createdEvent._id}});
            })
            .then(() => {
                return User.findById(req.app.locals.user._id)
            })
            .then((updatedUser) => {
                req.session.user = updatedUser
                res.redirect('/user/profile')
            })
            .catch((err) => next(err));
    }
})

router.get('/list', (req, res, next) => {
    OrgEvents.find()
        .populate('eventCreator')
        .then((eventsList) => {
            res.render('organic-event/list', {events: eventsList})
        })
        .catch((err) => next(err));
})

router.get('/:eventId', (req, res, next) => {
    const {eventId} = req.params;
    
    OrgEvents.findById(eventId)
        .populate('eventCreator')
        .then((foundEvent) => {
            res.render('organic-event/details', foundEvent)
        })
        .catch((err) => next(err));

})

module.exports = router;