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
    let following = false;


    User.findById(id).then( userinfo => {

        following = req.app.locals.user.connections.includes(id);
        console.log(following);
        console.log("hey")
        console.log(req.app.locals.user.connections);
        res.render('./connections/exploreProfile.hbs', {userinfo, following});
    })
    .catch(error => console.log(error));
});

router.post("/profile/:id", (req, res, next) => {
    const { id } = req.params;
   //console.log(req.app.locals.user._id);
   User.findByIdAndUpdate(req.app.locals.user._id, {$push : {connections: id}})
    .then( () => {
        return User.findById(req.app.locals.user._id)
    })
    .then((updatedUser) => {

        console.log("hey");
        console.log();
        req.session.user = updatedUser;
        res.redirect("/explore");
    })
    .catch(error => next(error));
    })
  

module.exports = router;


// , {data: responseFromApi.data}