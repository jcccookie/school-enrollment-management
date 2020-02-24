var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_kimkyeon',
  password        : '9773',
  database        : 'cs340_kimkyeon'
});

module.exports.pool = pool;