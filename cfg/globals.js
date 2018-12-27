var fs = require('fs');

//var db = fs.readFileSync("./cfg/db.json");
var db  = JSON.parse(fs.readFileSync('../data/db.json', 'utf8'));
module.exports.db = db;
var tcp  = JSON.parse(fs.readFileSync('../data/tcp.json', 'utf8'));
module.exports.tcp = tcp;