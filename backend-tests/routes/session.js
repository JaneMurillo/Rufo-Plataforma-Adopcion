const Router = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, message) => {
    //console.log('authenticate function');
    if (err) throw err;
    if (!user) {
      //console.log('no hay usuario');
      return res.send(message.message);
    } else {
      //console.log('usuario encontrado');
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send('user authenticated');
      });
      //console.log('req.user' + req.user);
    }
  })(req, res, next);
});

router.get('/verify-login', (req, res, next) => {
  //console.log('verify login');
  passport.authenticate('jwt', { session: false }, (err, user, message) => {
    //console.log('funcion verify inicio sesion');
    //console.log('user: ' + user);
    if (err) {
      //console.log('error');
      return next(err);
    }
    if (!user) {
      //console.log(message.message);
      //console.log('there is no user');
      res.json({ user: { user_type: 3 }, auth: 'false' });
    } else {
      //console.log('usuario autenticado: ' + user.user_email);
      res.json({ user, auth: 'true' });
    }
  })(req, res, next);
});

router.post('/create-token', (req, res) => {
  if (req.user) {
    const body = {
      _id: req.user.user_id,
      email: req.user.user_email,
      type: req.user.user_type,
    };
    const token = jwt.sign({ user: body }, process.env.SECRET, {
      expiresIn: '3h',
    });
    //console.log('token created: ' + token);
    req.logout((err) => {
      if (err) throw err;
      return;
    });
    return res.json({ token, type: body.type });
  } else return res.send('no user found');
});

router.get('/user-exists', (req, res) => {
  //console.log('user-exists: ' + req.user);
  if (req.user) {
    return res.send(true);
  } else {
    return res.send(false);
  }
});

router.get('/facebook', (req, res, next) => {
  //console.log('path /facebook');
  passport.authenticate('facebook', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
});

router.get('/facebook/callback', (req, res, next) => {
  //console.log('facebook/callback');
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000/signlog',
    successRedirect: 'http://localhost:3000/',
  })(req, res, next);
});

router.get('/google', (req, res, next) => {
  //console.log('path /google');
  passport.authenticate('google', { scope: ['profile', 'email'] })(
    req,
    res,
    next
  );
});

router.get('/google/callback', (req, res, next) => {
  //console.log('google/callback');
  passport.authenticate('google', (err, user, message) => {
    //console.log('auth con google');
    //console.log('usuario: ' + user.user_fullname);
    if (err) throw err;
    if (user) {
      //console.log('usuario encontrado');
      req.logIn(user, (err) => {
        if (err) throw err;
        res.redirect('http://localhost:3000/');
      });
      //console.log('luego login user: ' + JSON.stringify(req.user));
      //console.log('auth: ' + req.isAuthenticated());
    }
  })(req, res, next);
});

module.exports = { router };
