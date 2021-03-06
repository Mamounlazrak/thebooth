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
        OrgEvents.create({title, date, eventCreator, picture: req.file.path, location, genre, description})
            .then((createdEvent) => {
                console.log(createdEvent);
                return User.findByIdAndUpdate(req.app.locals.user._id, { $push: {organicEvents: createdEvent._id}});
            })
            .then(() => {
                return User.findById(req.app.locals.user._id)
            })
            .then((updatedUser) => {
                req.session.user = updatedUser
                res.redirect('/organic-event/my-list')
            })
            .catch((err) => next(err));
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
                res.redirect('/organic-event/my-list')
            })
            .catch((err) => next(err));
    }
})

router.get('/my-list', (req, res, next) => {
    OrgEvents.find({eventCreator: req.app.locals.user._id})
        .populate('eventCreator')
        .then((eventsList) => {
            res.render('organic-event/my-list', {events: eventsList})
        })
        .catch((err) => next(err));
})

router.get('/full-list', (req, res, next) => {
    OrgEvents.find()
        .populate('eventCreator')
        .then((eventsList) => {
            res.render('organic-event/full-list', {events: eventsList})
        })
        .catch((err) => next(err));
})

router.get('/my-list/:eventId', (req, res, next) => {
    const {eventId} = req.params;
    
    OrgEvents.findById(eventId)
        .populate('eventCreator')
        .then((foundEvent) => {
            res.render('organic-event/my-list-details', foundEvent)
        })
        .catch((err) => next(err));

})


router.get('/edit/:eventId', (req, res, next) => {
    const {eventId} = req.params; 
    OrgEvents.findById(eventId)
        .then((foundEvent) => {
            res.render('organic-event/edit', foundEvent)
        })
        .catch((err) => next(err));
})


router.post('/edit/:eventId', (req, res, next) => {
    const {eventId} = req.params;
    console.log(eventId);
    
    const {title, date, location, genre, description} = req.body;
    console.log(title);

    if (req.file) {

    } else {
        OrgEvents.findByIdAndUpdate(eventId, {title, date, location, genre, description})
            .then((editedEvent) => {
                // console.log(eventId);
                // console.log(editedEvent);
                res.redirect('/organic-event/my-list')
            })
            .catch((err) => next(err));
    }
})

router.post('/delete/:eventId', (req, res, next) => {
    const {eventId} = req.params;
    OrgEvents.findByIdAndDelete(eventId)
        .then(() => {
            res.redirect('/organic-event/my-list')
        })
        .catch((err) => next(err));
})

router.get('/details/:id', (req, res, next) => {
    const {eventId} = req.params;
    OrgEvents.findOne(eventId)
    .then ((foundEvent) => {
        res.render('organic-event/details', foundEvent)
    })
    .catch ((err) => next(err))
})

module.exports = router;