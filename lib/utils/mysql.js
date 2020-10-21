
const mysql = require('mysql2/promise');

const connectionMaxAge = 100000;
const intervalMs = 300000;

let lastUsed = Date.now();
let connection = false;
let intervalHandle;

// var connection = mysql.createPool({
//   host     : 'localhost',
//   port: '3306',
//   user     : 'root',
//   password : '',
//   database : 'wice'
// });
//
// console.log('Connection', connection);
//
// // connection.connect();
//
// connection.query('SELECT * FROM address_company WHERE 1', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

async function dbConnect(config) {
  try {
    connection = await mysql.createPool({
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      host: config.databaseUrl,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.databaseName,
    });
  } catch (e) {
    console.error(e);
  }
}

async function connectionMayEnd() {
  if (connection === false) {
    return console.log('Connection already closed - nothing todo');
  }

  const threshold = Date.now() - connectionMaxAge;
  console.log(lastUsed, threshold);
  if (lastUsed < threshold) {
    console.log('Connection-Pool is idle for too long --> closing');
    try {
      clearInterval(intervalHandle);
      await connection.end();
      connection = false;
      return true;
    } catch (e) {
      console.error(e);
    }
  }
  return false;
}

intervalHandle = setInterval(connectionMayEnd, intervalMs);

async function mysqlFetch(config, query, callback, close) {
  if (connection === false) await dbConnect(config);

  try {
    // 0 -> rows
    // 1 -> fields
    const results = await connection.query(query);
    const resultsLength = results[0].length;
    for (let i = 0; i < resultsLength; i += 1) {
      const last = (i + 1 === resultsLength);
      callback(results[0][i], last);
    }

    lastUsed = Date.now();
    if (close) {
      clearInterval(intervalHandle);
      await connection.end();
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

module.exports = {
  mysqlFetch,
};