const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

const path = require("path");

// .env file
const dotenv = require("dotenv");
dotenv.config(); //load our custom environment variables

const pageRouter = require("./modules/pages/router");
const adminRouter = require("./modules/admin/admin-router");
//const authRoutes = require('./routes/auth'); // Update the path accordingly
const userRouter = require("./modules/admin/user/user-router")

const app = express(); //creating an Express app
const port = process.env.PORT || "4000";

//set up Express app to use Pug as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up public folder path for static files
app.use(express.static(path.join(__dirname, "public")));


// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.use("/", pageRouter);
app.use("/admin", adminRouter);
app.use("/auth", userRouter);

//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
