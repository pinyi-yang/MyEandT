// pass in ejs obj to javascript
var tasks =JSON.parse(document.getElementById('daytasksJSON').textContent);
var weekTasks =JSON.parse(document.getElementById('tasksJSON').textContent);

//* Variables ==========================================
var currentDate = moment(document.getElementById('selectdate').value, 'YYYY-MM-DD');
var weekStart = moment(currentDate).startOf('week');

//* DOM elements =======================================
var weektasksEl = document.getElementById('weektasks');
var weekdaytasksElArr = [];
var dayTasksListEl = document.getElementById('daytaskslist');

//* create week tasks div========================================
// ** create div for each day
for (let i=0; i <=6; i++) {
  weekdaytasksElArr[i] =document.createElement('div');
  let link = document.createElement('a');
  let temp = moment(weekStart);
  link.classList.add('tablink');
  link.href = "/dailytasks/date?date=" + temp.add(i, 'day').format('YYYY-MM-DD');
  console.log(weekStart.format('YYYY-MM-DD'));
  link.textContent = moment(i, 'd').format('ddd').toUpperCase();
  weekdaytasksElArr[i].appendChild(link);
  if (i == currentDate.format('d')) weekdaytasksElArr[i].id = 'currentdate';
}

// ** append all tasks on corresponding day
weekTasks.forEach(function(task) {
  let taskEl = document.createElement('a');
  taskEl.href = '/dailytasks/' + task.id;
  taskEl.textContent = "• " + task.summary;
  taskEl.classList.add(task.type);
  taskEl.classList.add('tabtask')
  weekdaytasksElArr[moment(task.start).format('d')].appendChild(taskEl);
})

// ** add element into page
for (let element of weekdaytasksElArr) {
  weektasksEl.appendChild(element);
}

//* create day tasks div========================================
tasks.forEach(function(task) {
  let taskEl = document.createElement('div');
  let linkEl = document.createElement('a');
  if (typeof selectId != 'undefined' && task.id == selectId) {
      console.log('select taskid' + selectId + ' is ', task.id);
      taskEl.id = 'selectTask';
      let contentEl = document.createElement('div');
      contentEl.textContent = task.summary + ' ' +`(${task.type})`
      taskEl.appendChild(contentEl);
  } else {
    taskEl.textContent = task.summary + ' ' +`(${task.type})`;
  }
  linkEl.classList.add('daytask');
  linkEl.href = '/dailytasks/' + task.id;
  taskEl.classList.add(task.type);
  linkEl.appendChild(taskEl);
  
  //** position the div
  let start = moment(task.start);
  let end = moment(task.end);
  let startpos = moment(start.format('H:mm'), 'H:mm').diff(moment('7:30', 'H:mm;'), 'minutes');
  let width = moment(end).diff(start, 'minutes');
  // console.log(start.format('H:mm') + "'s start pos is " + startpos);
  startpos = startpos/6 + '%';
  width = width/6 + '%';
  // console.log(startpos, width);

  linkEl.style.left = startpos;
  linkEl.style.width = width;

  dayTasksListEl.appendChild(linkEl);
})