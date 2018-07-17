const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

connection.query("create database if not exists billDB", function (err, results) {
    if (err) {
        console.log("err:" + err);
    } else {
        console.log('created billDB');
        createRegister();
    }
});

connection.query("use billDB", function (err, results) {
    if (err) {
        console.log(err);
    } else {
        console.log("using billDB");
    }
});

function createRegister() {
    const createRegisterQuery = `CREATE TABLE IF NOT EXISTS bill(
                                        id int not null auto_increment primary key,
                                        p_name VARCHAR(20) ,
                                        p_id VARCHAR(20) unique,
                                        quality varchar(10),
                                        price varchar(10),
                                    gst varchar(10),
                                    interest varchar(100),
                                    created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    Amount varchar(100))`
    connection.query(createRegisterQuery, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            console.log('table created');
        }
    });
}
module.exports = connection;