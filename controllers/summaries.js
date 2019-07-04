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



module.exports = router;