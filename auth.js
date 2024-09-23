// const express = require('express');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');
// const blogroutes = require('./blogroutes'); // Blog routes
// const categoryroutes = require('./categoryroutes'); // Category routes

// // Middleware function setup
// const setupAuth = (app) => {
//   app.use(express.urlencoded({ extended: false }));

//   // Session middleware
//   app.use(session({
//     secret: 'your_secret_key',
//     resave: false,
//     saveUninitialized: true
//   }));

//   // Initialize Passport
//   app.use(passport.initialize());
//   app.use(passport.session());

//   // Mock users (ideally replaced with database authentication)
//   const users = [
//     { id: 1, username: 'user1', password: 'password1' },
//     { id: 2, username: 'user2', password: 'password2' }
//   ];

//   // Passport Local Strategy
//   passport.use(new LocalStrategy((username, password, done) => {
//     const user = users.find(u => u.username === username);
//     if (!user) {
//       return done(null, false, { message: 'Incorrect username.' });
//     }
//     if (user.password !== password) {
//       return done(null, false, { message: 'Incorrect password.' });
//     }
//     return done(null, user);
//   }));

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     const user = users.find(u => u.id === id);
//     done(null, user);
//   });

//   // Authentication routes
//   app.post('/login', passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/login'
//   }));

//   function isAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.redirect('/login');
//   }

//   app.use('/blog', isAuthenticated, blogroutes);
//   app.use('/category', isAuthenticated, categoryroutes);

//   app.get('/dashboard', isAuthenticated, (req, res) => {
//     res.send(`Hello ${req.user.username}, welcome to your dashboard!`);
//   });

//   app.get('/logout', (req, res) => {
//     req.logout(err => {
//       if (err) { return next(err); }
//       res.redirect('/login');
//     });
//   });
// };

// // Export the setupAuth function
// module.exports = setupAuth;
