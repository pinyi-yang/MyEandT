const express  = require('express');
const passport = require('../config/passportConfig');
const router   = express.Router();
const db       = require('../models');
const moment   = require('moment');
const sequelize = require('sequelize');
const Op       = sequelize.Op;


// GET /dailytasks - render a page for today's tasks
router.get('/', function(req, res) {
  res.redirect('/dailytasks/'+ moment().format('YYYY-MM-DD'));
})

// GET /dailytasks/new  -   render a page with form to create a new tasks.
router.get('/new', function(req, res) {
  res.render('dailytasks/new')
})

// GET /dailytasks/:date, (YYYY-MM-DD) - render a page for at the date
router.get('/:date', function(req, res) {
  let date = req.params.date;
  let id = req.user.id;
  let startDate = moment(date, 'YYYY-MM-DD').startOf('day');
  let endDate = moment(date, 'YYYY-MM-DD').endOf('day');
  console.log(`${date}T23:59:999Z` + '🍅🍅🍅'+ startDate + ', ' + endDate);
  
  // res.send(new Date(startDate));
  db.dailytask.findAll({
    where: {
      userId: id,
      [Op.and]: {
        start:{
          [Op.lt]: new Date(endDate),
          [Op.gt]: new Date(startDate)
        }
      }
    }
  }).then(function(tasks) {
    res.send(tasks);
  })
})

// POST /dailytasks - add the new task to the database
router.post('/', function(req, res) {
  let pendingTask = {
    summary: req.body.summary,
    description: req.body.description,
    type: req.body.type,
    start: toDBDateTime(req.body.startdate, req.body.starttime),
    "end": toDBDateTime(req.body.enddate, req.body.endtime),
    userId: req.user.id
  }
  db.dailytask.create(pendingTask).then(function(response) {
    res.send('new tasks created', pendingTask.start, pendingTask.end);
  }).catch(function(error) {
    res.send('get an error', error.message);
  })
})

//* date is in form of YYYY-MM-DD, time in HH:MM
function toDBDateTime(date, time) {
  return date + 'T' + time + ':00.000' + moment().format('Z');
}



module.exports = router;