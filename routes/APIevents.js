const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const axios = require('axios').default;


router.get('/', (req, res, next) => {
    
    axios.get(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.TM_KEY}&locale=*&countryCode=PT`)
    .then(responseFromApi => {
        console.log(responseFromApi.data)
        res.render('./events/localEvents.hbs', {data: responseFromApi.data})
    })
    .catch(error => console.log(error))

})

module.exports = router;

//location: String,
//${req.app.locals.user.location}
// /discovery/v2/events /discovery/v2/classifications/genres/{Concerts}&apikey=${TM_KEY}
// ${TM_KEY}