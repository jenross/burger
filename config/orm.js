const connection = require("../config/connection");

function printQMarks(num) {
    let arr = []; 
    for(let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(object) {
    let arr = [];
    for (let key in object) {
        let value = object[key];
        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

const orm = {
    selectAll: function(table, cb) {
        let queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, result) {
            if(err) {
                throw err; 
            }
            cb(result);
        });
    }, 

    insertOne: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table; 
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err; 
            }
            cb(result);
        });
    },

    updateOne: function(table, objColVals, devoured, cb) {
        let queryString = "UPDATE " + table; 

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString+= devoured; 

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err; 
            }
            cb(result);
        });
    }
}


module.exports = orm; 