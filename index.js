const express = require('express'); //Common JS module
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI);
const app = express();
app.use(bodyParser.json());
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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //express serves prod assets like main.js and main.css
  app.use(express.static('client/build'));
  //express serves index.html if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000; //environment variables
app.listen(PORT); //5000 = port number
