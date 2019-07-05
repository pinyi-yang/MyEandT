const express  = require('express');
const passport = require('../config/passportConfig');
const router   = express.Router();
const db       = require('../models');
const moment   = require('moment');
const sequelize = require('sequelize');
const Op       = sequelize.Op;


// GET /dailytasks - render a page for today's tasks
router.get('/', function(req, res) {
  res.redirect('/dailytasks/date?date='+ moment().format('YYYY-MM-DD'));
})

// GET /dailytasks/new  -   render a page with form to create a new tasks.
router.get('/new', function(req, res) {
  let date = req.query.date
  res.render('dailytasks/new', {date})
})

// GET /dailytasks/date, (YYYY-MM-DD) - render a page for at the date
router.get('/date', function(req, res) {
  let date = req.query.date;
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
    },
    order: [
      ['start', 'ASC']
    ]
  }).then(function(tasks) {
    res.render('dailytasks/index', {tasks, date});
  })
});

// GET /dailytasks/:id
router.get('/:id', function(req,  res) {
  let taskId = parseInt(req.params.id);
  db.dailytask.findOne({
    where: {id : taskId},
    include: [db.boost, db.drag]
  }).then(function(selectTask) {
    // console.log('😓😓😓',taskId);
    // res.send(selectTask);
    let date = moment(selectTask.start).format('YYYY-MM-DD');
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
      },
      order: [
        ['start', 'ASC']
      ]
    }).then(function(tasks) {
      res.render('dailytasks/show', {tasks, date, selectTask});
    })
  });

});

// GET /dailytasks/addnotes?notes= update notes for tasks
router.get('/:taskid/addnotes', function(req, res) {
  db.dailytask.update({
    notes: req.query.notes
  },
  {
    where: {id:parseInt(req.params.taskid)}
  }).then(function(reseponse) {
    res.redirect('/dailytasks/' + req.params.taskid)
  })
});

// DELETE /dailytasks/:taskid - delete a task
router.delete('/:taskid', function(req, res) {
  db.dailytask.destroy({
    where: { id: parseInt(req.params.taskid) }
  }).then(function(reseponse) {
    res.redirect('/dailytasks/date?date=' + req.body.date);
  })
})


// GET /dailytasks/:taskid/efficiency?value="
router.get('/:taskid/efficiency', function(req, res) {
  let taskid = parseInt(req.params.taskid);
  let effValue = parseInt(req.query.value);
  db.dailytask.update({
    efficiency: effValue
  },
  {
    where: {id: taskid}
  }).then(function(response){
    res.redirect('/dailytasks/' + taskid);
  })
})



// GET /dailytasks/:taskid/edit - page allow all info of a task
router.get('/:taskid/edit', function(req, res) {
  let id = parseInt(req.params.taskid);
  db.dailytask.findOne({
    where: {'id': id },
    include: [db.drag, db.boost]
    
  }).then(function(task) {
    res.render('dailytasks/edit', {task})
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
    res.redirect('/dailytasks/date?date=' + req.body.startdate);
  }).catch(function(error) {
    res.send('get an error', error.message);
  })
});

// PUT /dailytasks/:taskid - update the task info and boosts and tags
router.put('/:taskid', function(req, res) {
  db.dailytask.update(
    { 
      summary: req.body.summary,
      description: req.body.description,
      type: req.body.type,
      start: toDBDateTime(req.body.startdate, req.body.starttime),
      "end": toDBDateTime(req.body.enddate, req.body.endtime),
      efficiency: parseInt(req.body.efficiency),
      notes: req.body.notes

    },
    {  where: {id: parseInt(req.params.taskid)}}
  ).then(function(reseponse){
    res.redirect('/dailytasks/date?date=' + moment(req.body.startdate).format('YYYY-MM-DD'));
  });
})




//* date is in form of YYYY-MM-DD, time in HH:MM
function toDBDateTime(date, time) {
  return date + 'T' + time + ':00.000' + moment().format('Z');
}



module.exports = router;