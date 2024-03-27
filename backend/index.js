//Install Libraries and database, initialize
const express = require('express');
const bodyParser = require('body-parser');
const {Pool} = require('pg');
const cors = require('cors');


const PORT = 3001;

const app = express()

app.listen(PORT, ()=>{
    console.log(`Server is working on - ${PORT}`)
})

app.use(cors());

app.get('/api', (req, res)=>{
    res.json({
        message: 'Hello there!'
    })
})

const pool = new Pool({
    user: 'your_user',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 'your_port usual is 5432',
})

const createTableQuery = `CREATE TABLE UserData (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), 
    age INT,
    color VARCHAR(50)
)`;

const checkTableQuery = `
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'UserData'
  )`;

async function createTable(){ //function for check and create SQL Table
    try{
        const client = await pool.connect();
        const result = await client.query(checkTableQuery);
        const tableExists = result.rows[0].exists;
        if(!tableExists){
            await client.query(createTableQuery);
            console.log('Table is created');
        } else {
            console.log('Table already exists')
        }
        client.release();
    } catch(error){
        console.log('Error, table is not created', error);
    }
}

createTable();

app.use(bodyParser.json());

app.post('/api', (req, res)=>{ //Post function, put data in table
    const {name,age, color} = req.body;
    pool.query('INSERT INTO UserData (name, age, color) VALUES ($1, $2, $3)', [name, age, color], (err, result)=>{
        if(err){
            console.log('Error executing query', err);
            res.send('Error saving data!');
            return;
        }
        console.log('Data inserted successfully');
        res.send('Data recived and saved successfully!');
    })
})
