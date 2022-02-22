// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs

const app = express();

// const generalMiddleware = require("./middleware/generalMiddleware");
// app.use(generalMiddleware);


// require("./middleware/bindUserToViewLocals")(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.use(function(req, res, next) {
    app.locals.user = req.session.user;
    next();
  });


const projectName = "thebooth";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;
// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const orgEventsRoutes = require("./routes/organic-event")
app.use("/organic-event", orgEventsRoutes);

const apiEvents = require("./routes/APIevents");
app.use("/apievents", apiEvents);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
