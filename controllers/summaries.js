const express  = require('express');
const passport = require('../config/passportConfig');
const router   = express.Router();
const db       = require('../models');
const moment   = require('moment');
const sequelize = require('sequelize');
const Op       = sequelize.Op;

// GET /summaries - render a page for pull a summaries by time
router.get('/', function(req, res) {
  res.redirect('/summaries/bytime');
});

// GET /summaries/bytime - render a form for submit info for summaries
router.get('/bytime', function(req, res) {
  res.render('summaries/bytime')
})

// GET /summaries/bytime/results?startdate=&enddate= show results for 
router.get('/bytime/results', function(req, res) {
  let startdate = moment(req.query.startdate, 'YYYY-MM-DD').startOf('day');
  let enddate = moment(req.query.enddate, 'YYYY-MM-DD').endOf('day');
  db.dailytask.findAll({
    where: {
      userId: req.user.id,
      [Op.and]: {
        start: {
          [Op.lt]: new Date(enddate),
          [Op.gt]: new Date(startdate)
        }
      }
    }
  }).then(function(tasks) {
    res.render('summaries/bytimeshow', {tasks, startdate, enddate});
  })
})


module.exports = router;