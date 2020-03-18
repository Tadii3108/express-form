require('dotenv').config();

const Pool = require("pg").Pool;
const pool = new Pool ({
    user: "user",
    host: "localhost",
    database: "db",
    password: "pass",
    port: 5432
 });

 const createTable = async(tableName) => {
    const table = await pool.connect();
    const res = await pool.query(`DROP TABLE IF EXISTS ${tableName};
    CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, visitor_name varchar(100), visitor_age int, date_of_visit text,time_of_visit time,assistant varchar(100),comments text);`);
    table.release()
    console.log(`${tableName} table has been created`);
    return res.rowCount;
}

const addNewVisitor = async(visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments) => {
    return new Promise(async(resolve, reject) => {
        await pool.query(
            `INSERT INTO visitors(
            visitor_name,
            visitor_age,
            date_of_visit,
            time_of_visit,
            assistant,
            comments)
        VALUES($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [visitor_name, visitor_age, date_of_visit, time_of_visit, assistant, comments],
        (error, results) => {
            if (error) {
                reject(error);
            }
            console.info("Visitor has been added!");
            resolve(results.rows);
        })
    });
}

//createTable('visitors')

module.exports = {
    createTable,
    addNewVisitor
}