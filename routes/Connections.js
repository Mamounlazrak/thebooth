const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");


router.get('/', (req, res, next) => {
    /* res.render('user/profile'); */
})

module.exports = router;