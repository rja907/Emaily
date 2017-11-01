const express = require('express'); //Common JS module
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);
const app = express();
//app.use : middleware used to modify incoming req before they sent off to different route handlers
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoutes')(app);
const PORT = process.env.PORT || 5000; //environment variables
app.listen(PORT); //5000 = port number
