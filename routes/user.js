const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

const fileUploader = require('../config/cloudinary.config');

router.post('/onboarding', fileUploader.single('profile_picture'), (req, res, next) => {
    const {firstName, lastName, location, genres, favArtist} = req.body;

    if(req.file) {
        User.findByIdAndUpdate(req.app.locals.user._id, {firstName, lastName, location, avatar: req.file.path, genres, favArtist})
        .then(() => {
            return User.findById(req.app.locals.user._id)
           })
      .then ((updatedUser) => {
                req.session.user = updatedUser;  
                res.redirect('/');
            })

        .catch((err) => console.log(err));
    } else {
        User.findByIdAndUpdate(req.app.locals.user._id, {firstName, lastName, location, genres, favArtist})
          .then(() => {
              return User.findById(req.app.locals.user._id)
             })
        .then ((updatedUser) => {
                  req.session.user = updatedUser;  
                  res.redirect('/');
              })

          .catch((err) => console.log(err));
    }
  });

router.get('/profile', (req, res, next) => {
    res.render('user/profile');
})

router.get('/edit', (req, res, next) => {
    res.render('user/edit');
})

router.post('/edit', fileUploader.single('profile_picture'), (req, res, next) => {
    const {firstName, lastName, location, genres, favArtist} = req.body;

    if(req.file) {
        User.findByIdAndUpdate(req.app.locals.user._id, {firstName, lastName, location, avatar: req.file.path, genres, favArtist})
        .then(() => {
            return User.findById(req.app.locals.user._id)
           })
      .then ((updatedUser) => {
                req.session.user = updatedUser;  
                res.redirect('/');
            })

        .catch((err) => console.log(err));
    } else {
        User.findByIdAndUpdate(req.app.locals.user._id, {firstName, lastName, location, genres, favArtist})
          .then(() => {
              return User.findById(req.app.locals.user._id)
             })
        .then ((updatedUser) => {
                  req.session.user = updatedUser;  
                  res.redirect('/');
              })

          .catch((err) => console.log(err));
    }
  });


  module.exports = router;
