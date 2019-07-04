const express  = require('express');
const passport = require('../config/passportConfig');
const router   = express.Router();
const db       = require('../models');
const moment   = require('moment');
const sequelize = require('sequelize');
const async = require('async');
const Op       = sequelize.Op;
const DELAY    = 300;

// GET /boosts/remove?boostid=&taskid= query - remove a boost from select project
router.get('/remove', function(req, res) {
  let boostid = parseInt(req.query.boostid);
  let taskid = req.query.taskid;
  db.boost.destroy({
    where: {id: boostid}
  }).then(function(response) {
    setTimeout(function(){res.redirect('/dailytasks/' + taskid)}, DELAY);
  })
});

// POST /boosts - add a new boost
router.post('/', function(req, res) {
  console.log('❓❓❓❓❓add a boost');
  let taskId = parseInt(req.body.taskid);
  let boostnames = req.body.boost.split(/,\s*/);
  db.dailytask.findOne({
    where: {id : taskId}
  }).then(function(dailytask) {
    let inputs = genAddBoostFns(boostnames, dailytask);
    async.parallel(inputs, function(error, results) {
      setTimeout(function() {res.redirect('/dailytasks/' + taskId)}, DELAY);
    })
  })
})


function genAddBoostFns(names, dailytask) {
  let result = names.map(function(name) {
    return function fn(done) {
      db.boost.findOrCreate({
      where: {'name': name.toLowerCase()}
    }).spread(function(boost, created) {
      dailytask.addBoost(boost);
      done(null, name)
    })
    }
  })
  return result;
};


module.exports = router;