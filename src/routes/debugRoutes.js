
// require express
const express = require('express');

//  router object that is an instance used  express.
const debugRouter = express.Router();
// Import database
const database = require('../services/database');
// endpoint for /app/log/access to return any records that exist in the current log.db databse.
debugRouter.get('/log/access', (req, res) => {
    try {
        const statement = database.prepare('SELECT * FROM accesslog').all();
        res.status(200).json(statement);
    } catch (e) {
        console.error(e);
    }
})
// endpoint any errors
debugRouter.get('/error', (req, res) => {
    throw new Error('There is an error.');
})

module.exports = debugRouter;