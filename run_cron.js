var fusta = require('./fusiontables.config.json');
var cronWL = require('./prepare_wl.js');
var crons = require('node-schedule');

/**
    Call the prepare_wl Function with Cron Behaviour.

    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)

Execute a cron job when the hour is 00:00 (e.g. 19:05, 20:05, etc.). */
//crons.scheduleJob('* * 0 0 * *',function(){ cronWL.cron(); });
    cronWL.cron(fusta.inspiratest_table);
