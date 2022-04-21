// Put your database code here
const database = require('better-sqlite3');
//Connect to databse
const logdb = new database('./data/db/log.db');

const stmt = logdb.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
let row = stmt.get();
if (row == undefined){
    console.log('Log database appears to be empty. Create log database...')
    const sq1Init = ` CREATE TABLE accesslog ( 
        id INTEGER PRIMARY KEY,
        remoteaddr VARCHAR,
        remoteuser VARCHAR,
        time VARCHAR,
        method VARCHAR,
        url VARCHAR,
        protocol VARCHAR,
        httpversion NUMERIC,
        secure VARCHAR,
        status INTEGER,
        referer VARCHAR,
        useragent VARCHAR 
        );`
    logdb.exec(sq1Init);
} else {
    console.log('Log Databse exists')
}

module.exports = logdb;