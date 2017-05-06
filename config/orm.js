//orm.js


var connection = require('../config/connection.js');

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var orm = {
	selectAll: function(cb){
		connection.query("SELECT * FROM burgers;", function(err,result){
			if(err) throw err;
			cb(result);
		});
	},

	insertOne: function(cols,vals,cb){
		connection.query("INSERT INTO burgers ("+cols.toString()+") VALUES (???)", vals, function(err,result){
			if(err) throw err;

			cb(result);
		});
	},

	updateOne: function(objColVals, condition, cb){
		connection.query("UPDATE burgers SET "+objToSql(objColVals)+" WHERE"+ condition, function(err,result){
			if(err) throw err;

			cb(result);
		});
	}
};


module.exports = orm;