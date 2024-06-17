const express = require('express');
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const app = express();

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
}

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {

        const randomName = faker.person.firstName();
        const sql = `INSERT INTO people(name) VALUES('${randomName}')`;

        connection.query(sql);

        const select = 'SELECT name FROM people';
        connection.query(select, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                const names = results.map(result => result.name);
                const list = names.map(name => `<li>${name}</li>`).join('');
                res.send(`<h1>Full Cycle Rocks!</h1><ul>${list}</ul>`);
            }
        });
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });