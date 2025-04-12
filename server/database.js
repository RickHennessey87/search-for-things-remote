const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Rick',      // update with your MySQL username
    password: '528Selva',  // update with your MySQL password
    database: 'my_blog'
});

connection.connect(error => {
    if(error) {
        console.error('Error connecting to database:', error.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + connection.threadId);
});

module.exports = connection;