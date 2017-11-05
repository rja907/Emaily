const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'] //can add more like reading emails etc.
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  ); //middleware

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
  app.get('/api/current_user', (req, res) => {
    //req = incoming request, res = outgoing response
    res.send(req.user);
  });
};
