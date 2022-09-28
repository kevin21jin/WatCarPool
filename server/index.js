const express = require('express');
var mysql = require('mysql')
const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "carPool",
})

app.listen(4000, () => {
    console.log("running on port 4000")
})