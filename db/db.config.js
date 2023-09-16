const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'incommers',
    password: 'root',
    port: 3306
}).promise()


module.exports = pool

