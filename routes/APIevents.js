const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

router.get('/apievents', (req, res, next) => {
    
    axios.get(url)
    .then(responseFromApi => console.log(responseFromApi)/* res.render('/events/localEvents', responseFromApi) */)
    .catch(error => console.log(error))

})

module.exports = router;