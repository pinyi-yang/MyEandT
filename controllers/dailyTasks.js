const express  = require('express');
const passport = require('../config/passportConfig');
const router   = express.Router();
const db       = require('../models');
const moment   = require('moment');




// GET /dailytasks/new  -   render a page with form to create a new tasks.
router.get('/new', function(req, res) {
  res.render('dailytasks/new')
})

// POST /dailytasks - add the new task to the database
router.post('/', function(req, res) {
  let pendingTask = {
    summary: req.body.summary,
    description: req.body.description,
    type: req.body.type,
    start: toDBDateTime(req.body.startdate, req.body.starttime),
    end: toDBDateTime(req.body.enddate, req.body.endtime),
    userId: req.user.id
  }
  db.dailytask.create(pendingTask).then(function(response) {
    res.send('new tasks created');
  }).catch(function(error) {
    res.send('get an error', error.message);
  })
})

//* date is in form of YYYY-MM-DD, time in hh:mm
function toDBDateTime(date, time) {
  return date + 'T' + time + ':00.000Z';
}



module.exports = router;