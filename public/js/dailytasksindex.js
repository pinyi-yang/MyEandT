// pass in ejs obj to javascript
var weekTasks =JSON.parse(document.getElementById('tasksJSON').textContent);

//* create week tasks div
//** Variables ==========================================
var currentDate = moment(document.getElementById('selectdate').value, 'YYYY-MM-DD');
var weekStart = moment(currentDate).startOf('week');

//** DOM elements =======================================
var weektasksEl = document.getElementById('weektasks');
var weekdaytasksElArr = [];

// *** create div for each day
for (let i=0; i <=6; i++) {
  weekdaytasksElArr[i] =document.createElement('div');
  let link = document.createElement('a');
  let temp = moment(weekStart);
  link.href = "/dailytasks/date?date=" + temp.add(i, 'day').format('YYYY-MM-DD');
  console.log(weekStart.format('YYYY-MM-DD'));
  link.textContent = moment(i, 'd').format('ddd').toUpperCase();
  weekdaytasksElArr[i].appendChild(link);
  if (i == currentDate.format('d')) weekdaytasksElArr[i].id = 'currentdate';
}

// *** append all tasks on corresponding day
weekTasks.forEach(function(task) {
  let taskEl = document.createElement('a');
  taskEl.href = '/dailytasks/' + task.id;
  taskEl.textContent = "• " + task.summary;
  taskEl.class = task.type;
  weekdaytasksElArr[moment(task.start).format('d')].appendChild(taskEl);
})

// *** add element into page
for (let element of weekdaytasksElArr) {
  weektasksEl.appendChild(element);
}
