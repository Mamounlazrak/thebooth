const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

router.get('/apievents', (req, res, next) => {
    
    axios.get('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=PT&apikey=LuPNxYdSBVJ851VgC4AeG9J36vhAKV0X')
    .then(responseFromApi => {
        console.log(responseFromApi)
        /* res.render('/events/localEvents', responseFromApi) */
    })
    .catch(error => console.log(error))

})

module.exports = router;