const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");


router.get("/", (req, res, next) => {
    User.find().then( users => {
       // console.log(users);
        res.render('./connections/explore.hbs', {users});
    })
    .catch(error => console.log(error));
});

router.get("/profile/:id", (req, res, next) => {
    const { id } = req.params;
    User.findById(id).then( userinfo => {
       // console.log(userinfo);
        res.render('./connections/exploreProfile.hbs', userinfo);
    })
    .catch(error => console.log(error));
});

router.post("/profile/:id", (req, res, next) => {
    const { id } = req.params;
   //const {  } = req.body;
   console.log(req.app.locals.user._id);
   User.findByIdAndUpdate(req.app.locals.user._id, {$push : {connections: id}})
    .then( userfollowed => {console.log(userfollowed); res.redirect('/');})
    .catch(error => next(error));
});
  

module.exports = router;


// , {data: responseFromApi.data}