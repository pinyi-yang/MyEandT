# MyE&T
My E&T (My Effort and Time, [Live App](https://mysterious-ocean-78106.herokuapp.com/auth/login)) is designed to be an application integrated with personal planner, project tracker and effort and time summarizer. It will help users planning and tracking their short-term and long-term projects and goals, while tracking the outcome of users time usage and effort to provide statistic insides. The insides could further help users optmize their time and effort and boost performance.

### Table of Content
* [Design](#Design)
* [Developmnet](#Development)
* [Conclusion](#Conclusion)

**Tech:** Javascript, Node/Express, ejs, SQL/Postgres/Sequeize, Google API (OAuth), HTML, CSS.

**Release Notes**

* Alpha version: (this repo), released July., 2019.
* Beta version : scheduled Nov., 2019.
* Verision 1.0: scheduled Feb., 2020.
* Mobile version: scheduled late 2020.
For features in each version please check [Features](#Features) section.

**App Preivew**

| Login| Task Tracker |
|:---:|:---:|
|![Login](./ReadmeFiles/Login.gif) | ![Task Tracker](./ReadmeFiles/task_tracker.gif) |

| Task Statistis |
|:---:|
|![task_stat](./ReadmeFiles/task_stat.gif) |

## Design

My E&T shares the idea with hobonichi and spiraldex with which people hand write their plan and record their status (good and bad things) during their activities, and further optimize their plan, method and habit based on their self feedback. However, handing writing could be quite a work. Moreover, the most valueable feedback statistic need even more work to pull it out.

My E&T aims to provide a convenient way to track users' daily acitivity and add records. It is also automatic generate useful statistics to help users to spend their effort and time more effeciently:
* Statistics on users most efficient and interrupted time during a period
* Statistics on users' time useage on different activity (work, study, exercise, entertainning...)
* Time and progress statistics on different projects
* Most common interruption and low performance causes 
* and so on.....

According to the results, users could modify their schedule, habit and method to have better outcome form their effort and time so that speed up on their rail to the goal while having more time to enjoy the life.

### Features
**Alpha version Features**
* Authentication functions (login and signup)
* Weekly planner + Daily task tracker
  * show tasks for the whole week and tasks vs time at selected date
  * create daily task
  * got to a date by click weekday or select date
  * show task tracker by click task in either week tasks panel and day tasks panel
  * in task tracker:
    * record task effieciency
    * add and remove drag and boost events in the task
    * add notes for tasks
* Summaries page - statistic for tasks
  * time ratio and hours on different type of tasks
  * average efficiency, boosts and drags during different hours of day

**Coming Features**
* Beta version (expcted Nov. 2019)
  * optimize ERD.
  * add daily and week habit tracker
  * 1 month, 1 year, 10 years planning page 
  * adding and optimize interactive component with React.js

* Version 1.0 (expected Feb. 2020)
    * summaries by type, drag and boost summaries function
    * add dragging effect to dailytasks div
    * link and sync with google calendar
    * more customize options for calendar

* Mobile version (planned 2020)

To implement the featuers, besides login/signup pages, full app will include 5 pages (10 years, 1 year, 1 month, 1 week, summary).

After self and peer review on design, for the 1-week aphla version develpment, ERD and pages are decided as following. The ERD is not optimized yet. The project and subproject can possibly merged with dailytasks in to a tasks table. For alpha version focusing on week+daily tracker and summaries feathers, the ERD optimization is planned in beta version.

Login page | task eidt page
|:---:|:---:|
![login/signup](./ReadmeFiles/Login.png) | ![task edit](./ReadmeFiles/edit.png)
   
| week, daily tracker planner | summary | 
|:---:|:---:|
| ![week, tracker](./ReadmeFiles/week+daily_tracker.png) | ![summaries](./ReadmeFiles/summaries.png) |

Current entity relationship diagram (ERD)

![ERD](./ReadmeFiles/ERD2.png)




## Development

### Backend
The backend is constructed with a Node/Express server and SQL (postgres) database. Node modules:
* Sequelize: for database communication
* ejs: for page rendering
* express-session and bcrypt: for passwrod encrypt and authentication
* moment: for date and time

**Routes**

5 router files are created to better manage routes. 4 of them are protected by the middleware isLoggedIn which requires user to login before access the data in database and secure the user data.

*Router Files*
```javascript

//create and login user
app.use('/auth', require('./controllers/auth')); 
// CRUD routes for dailytasks
app.use('/dailyTasks', isLoggedIn, require('./controllers/dailyTasks.js')); 
// CRUD routes for boots (boost is an attribute of task tracker)
app.use('/boosts', isLoggedIn, require('./controllers/boosts.js'));
// CRUD routes for boots (boost is an attribute of task tracker)
app.use('/drags', isLoggedIn, require('./controllers/drags.js'));
// get info for summary page (show statistics for tasks)
app.use('/summaries', isLoggedIn, require('./controllers/summaries.js'));

```

*IsLoggedIn middleware*
```javascript

//*make sure user is logged in to access certain page
module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'You must be logged in to access that page');
    res.redirect('/auth/login');
  } else {
    next();
  }
};

```

**Restful Routes for Dailytasks**
| Routes | Methods | Notes |
|:------:|:-------:|:-----:|
| /dailyTasks | POST | add a new task to user |
| /dailyTasks/:taskId | GET | get a task and all tasks at the same week for user |
| /dailyTasks/:taskId | PUT | update the task for user |
| /dailyTasks/:taskId | DELETE | remove the task from user |

**Other Routes for Dailytasks**
In order to imporve data flexibility.


### Frontend
ejs, javscript generated page, google chart API

**Weekly Tasks View**
add tasks to right day with right order

**Daily Tasks View**
*Task Positioning*
position the task in the daily view at right time and with right length

*Task Tracking Features*
add efficiency, drag, boost and notes

**Generate Statistics**
OAuth
how to transform data to get statistic by google chart API

## Conclusion
improvement


## References
* W3School: for CSS, HTML and Javascript documents. ([link](https://www.w3schools.com/))
* Stack Overflow: for quesionts and errors. ([link](https://stackoverflow.com/))




