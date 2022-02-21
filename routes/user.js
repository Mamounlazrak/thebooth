const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

const fileUploader = require('../config/cloudinary.config');

router.post('/onboarding', fileUploader.single('profile_picture'), (req, res, next) => {
    const {location, music_genre, fav_artist} = req.body;
    console.log(location);
    console.log(music_genre);
    console.log(fav_artist);
    if(req.file) {

        User.findByIdAndUpdate(req.app.locals.user._id, {location, avatar: req.file.path, genres: music_genre, favArtist: fav_artist})
          .then(() => {
              console.log('hey');
            res.redirect(`/home/${req.app.locals.user._id}`);
          })
          .catch((err) => console.log(err));
    } else {

        User.findByIdAndUpdate(req.app.locals.user._id, {location, genres: music_genre, favArtist: fav_artist})
          .then(() => {
              console.log('hey');
            res.redirect(`/home/${req.app.locals.user._id}`);
          })
          .catch((err) => console.log(err));
    }
  })

  module.exports = router;
