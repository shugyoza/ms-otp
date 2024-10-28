const { Client } = require('pg');

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const client = new Client({
  host: DB_HOST,
  user: DB_USER,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
});

client.connect();

/* Use example
client.query('SELECT user_id FROM accounts;', (error, result) => {
  if (!error) {
    console.log(result.rows);
  } else {
    console.log(error.message);
  }

  client.end();
})
*/

module.exports = {
  client
}