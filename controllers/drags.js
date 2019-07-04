const express  = require('express');
const passport = require('../config/passportConfig');
const router   = express.Router();
const db       = require('../models');
const moment   = require('moment');
const sequelize = require('sequelize');
const async    = require('async');
const Op       = sequelize.Op;
const DELAY    = 300;  

// GET /drags/remove?dragid=&taskid= query - remove a drag from select project
router.get('/remove', function(req, res) {
  let dragid = parseInt(req.query.dragid);
  let taskid = req.query.taskid;
  db.drag.destroy({
    where: {id: dragid}
  }).then(function(response) {
    setTimeout(function() {res.redirect('/dailytasks/' + taskid)}, DELAY);
  })
})

// POST /drags - add a new drag
router.post('/', function(req, res) {
  let taskId = parseInt(req.body.taskid);
  let dragnames = req.body.drag.split(/,\s*/);
  db.dailytask.findOne({
    where: {id : taskId}
  }).then(function(dailytask) {
    let inputs = genAddDragFns(dragnames, dailytask);
    async.parallel(inputs, function(error, results) {
      setTimeout(function() {res.redirect('/dailytasks/' + taskId)}, DELAY);
    })
  })
})


function genAddDragFns(names, dailytask) {
  let result = names.map(function(name) {
    return function fn(done) {
      db.drag.findOrCreate({
      where: {'name': name.toLowerCase()}
    }).spread(function(drag, created) {
      dailytask.addDrag(drag);
      done(null, name)
    })
    }
  })
  return result;
};

module.exports = router;