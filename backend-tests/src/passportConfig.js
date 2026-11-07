const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local');
const facebookStrategy = require('passport-facebook').Strategy;
const googleStrategy = require('passport-google-oauth20').Strategy;
const md5 = require('md5');
const db = require('./db');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      //console.log('local strategy function');
      db.one(
        'SELECT * FROM "User" WHERE user_email = $1 AND user_password = $2',
        [email, md5(password)]
      )
        .then((data) => {
          //console.log('usuario local: ' + JSON.stringify(data));
          db.one(
            'UPDATE "User" SET user_lastconnection=$1 WHERE user_email=$2 RETURNING *',
            [new Date(Date.now()), data.user_email]
          ).then((user) => done(null, data));
        })
        .catch((error) => {
          return done(null, false, { message: 'Password or email are wrong' });
        });
    })
  );

  const JWTStrategy = passportJWT.Strategy;
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
      },
      (jwt_payload, done) => {
        //console.log('funcion JWT');
        db.one('SELECT * FROM "User" WHERE user_id = $1', [
          jwt_payload.user._id,
        ])
          .then((data) => {
            //console.log('token corresponde a un usuario');
            //console.log('user: ' + data.user_email);
            let user = {
              user_fullname: data.user_fullname,
              user_email: data.user_email,
              user_type: data.user_type,
              user_id: data.user_id,
            };
            return done(null, user);
          })
          .catch((error) => {
            //console.log('token no valido');
            return done(null, false, { message: 'Token invalido: ' + error });
          });
      }
    )
  );

  passport.use(
    new facebookStrategy(
      {
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: 'http://localhost:5000/session/facebook/callback',
      },
      function (accessToken, refreshToken, profile, cb) {
        //console.log('facebook midleware');
        //console.log('facebook profile: ' + JSON.stringify(profile));
        db.any('SELECT * FROM "User" WHERE user_email=$1', [
          profile._json.email,
        ]).then((user) => {
          if (user.length > 0) {
            db.any('SELECT * FROM "User" WHERE user_facebook_id=$1', [
              profile.id,
            ]).then((user) => {
              if (user.length > 0) {
                db.one(
                  'UPDATE "User" SET user_lastconnection=$1 WHERE user_email=$2 RETURNING *',
                  [new Date(Date.now()), user[0].user_email]
                ).then((user) => cb(null, user));
              } else {
                db.one(
                  'UPDATE "User" SET user_facebook_id=$1, user_lastconnection WHERE user_email=$2 RETURNING *',
                  [profile.id, new Date(Date.now()), user[0].user_email]
                ).then((user) => cb(null, user));
              }
            });
          } else {
            db.one(
              'INSERT INTO "User" (user_facebook_id, user_fullname, user_email,user_lastconnection, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [
                profile._json.id,
                profile._json.name,
                'email@email.com', //profile._json.email,
                new Date(Date.now()),
                2,
              ]
            )
              .then((user) => {
                //console.log('usuario facebook creado');
                //console.log(user.user_email);
                return cb(null, user);
              })
              .catch((err) => {
                return cb(err, false);
              });
          }
        });
      }
    )
  );

  passport.use(
    new googleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://localhost:5000/session/google/callback',
      },
      function (accessToken, refreshToken, profile, cb) {
        //console.log('google midleware');
        //console.log('google profile: ' + JSON.stringify(profile));
        db.any('SELECT * FROM "User" WHERE user_email=$1', [
          profile._json.email,
        ]).then((user) => {
          //console.log('hay usuarios con ese correo: ' + user.length);
          if (user.length > 0) {
            db.any('SELECT * FROM "User" WHERE user_google_id=$1', [
              profile.id,
            ]).then((user) => {
              //console.log('usuarios con ese id: ' + user.length);
              if (user.length > 0) {
                db.one(
                  'UPDATE "User" SET user_lastconnection=$1 WHERE user_email=$2 RETURNING *',
                  [new Date(Date.now()), user[0].user_email]
                ).then((user) => cb(null, user));
              } else {
                db.one(
                  'UPDATE "User" SET user_google_id=$1, user_lastconnection WHERE user_email=$2 RETURNING *',
                  [profile.id, new Date(Date.now()), user[0].user_email]
                ).then((user) => cb(null, user));
              }
            });
          } else {
            db.one(
              'INSERT INTO "User" (user_google_id, user_fullname, user_email,user_lastconnection, user_type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [
                profile._json.sub,
                profile._json.name,
                profile._json.email,
                new Date(Date.now()),
                2,
              ]
            )
              .then((user) => {
                //console.log('usuario google creado');
                //console.log(user.user_email);
                return cb(null, user);
              })
              .catch((err) => {
                return cb(err, false);
              });
          }
        });
      }
    )
  );

  passport.serializeUser((user, cb) => {
    //console.log('serialize user: ' + user.user_id);
    cb(null, user.user_id);
  });

  passport.deserializeUser((id, cb) => {
    //console.log('deserialize user: ' + id);
    db.one('SELECT * FROM "User" WHERE user_id=$1', [id]).then((user) => {
      //console.log('user: ' + user.user_email);
      cb(null, user);
    });
  });
};
