// Place your server entry point code here
const express = require('express')
// allow the entire backend to use express
const app = express();
// Require morgan component 
const morgan = require('morgan');
// Require fs to write to files 
const fs = require('fs');
//Middleware for module
const modules = require("./src/config/index.config.js")
const db = require(modules.db)
//Module for data
const data = require(modules.data)
//Module for routes 
const routes = require(modules.routes)
// Require minimist module to take in command line inputs
const args = require('minimist')(process.argv.slice(2));
// Port will be set to port or 5000
const port = args.port || process.env.port || 5000
