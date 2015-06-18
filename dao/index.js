

var db = require("./db");

exports = module.exports =  {developers : require("./developer")(db.developer)};

