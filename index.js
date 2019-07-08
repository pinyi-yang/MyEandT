require('dotenv').config();
const express       = require('express');
const ejsLayouts    = require('express-ejs-layouts');
const session       = require('express-session');
const passport      = require('./config/passportConfig');
const flash         = require('connect-flash');
const isLoggedIn    = require('./middleware/isloggedIn');
const helmet        = require('helmet');
const db            = require('./models');
const moment        = require('moment');
const override      = require('method-override');
const sequelize     = require('sequelize');
const Op            = sequelize.Op;


const app = express();

//* this line makes the session use sequelize to write session data to a postgre table
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1800000 //? in ms
});

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(override("_method"));
app.use(function(req, res, next) {
  res.locals.moment = moment;
  next();
})
app.use(helmet());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,    //
  saveUninitialized: true,
  store: sessionStore
}));

//todo use this line once to set up the store talbe
sessionStore.sync();

//todo link passport to the express session
//! passport, flash must below session
app.use(flash()); //! flash must above passport
app.use(passport.initialize());
app.use(passport.session());

//* customized middleware
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
})

app.get('/', function(req, res) {
  res.redirect('auth/login');
  // if (req.user) {
  //   res.redirect('/home');
  // } else {
  // }
});

app.get('/home', isLoggedIn, function(req, res) {
  let today = moment();
  let yesterday = moment(today).subtract(1, 'day');
  console.log('📆📆📆', today, );
  db.dailytask.findAll({
    where: {
      userId: req.user.id,
      [Op.and]: {
        start: {
          [Op.gt]: new Date(moment(today).startOf('day')),
          [Op.lt]: new Date(moment(today).endOf('day'))
        }
      }
    },
    order: [['start', 'ASC']]
  }).then(function(taskstoday) {
    db.dailytask.findAll({
      where: {
        userId: req.user.id,
        [Op.and]: {
          start: {
            [Op.gt]: new Date(moment(yesterday).startOf('day')),
            [Op.lt]: new Date(moment(yesterday).endOf('day'))
          }
        }
      },
      order: [['start', 'ASC']]
    }).then(function(tasksyesterday) {
      // res.send(taskstoday)
      res.render('home', {taskstoday, tasksyesterday});
    })
  })
})


app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.get('/test', function(req, res){
  db.user.findByPk(1).then(function(user) {
    res.send(user);

  })
});

app.use('/auth', require('./controllers/auth'));
app.use('/dailyTasks', isLoggedIn, require('./controllers/dailyTasks.js'));
app.use('/boosts', isLoggedIn, require('./controllers/boosts.js'));
app.use('/drags', isLoggedIn, require('./controllers/drags.js'));
app.use('/summaries', isLoggedIn, require('./controllers/summaries.js'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
