
const { Pool } = require('pg');

const connectionMaxAge = 100000;
const intervalMs = 300000;

let lastUsed = Date.now();
let connection = false;
let intervalHandle;

function dbConnect(config) {
  try {
    connection = new Pool({
      user: config.user,
      host: config.databaseUrl,
      database: config.databaseName,
      password: config.password,
      port: config.port,
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

async function postgreFetch(config, query, callback, close) {
  if (connection === false) dbConnect(config);

  try {
    const results = await connection.query(query);

    const resultsLength = results.rows.length;
    // console.log(resultsLength, 'Results');
    for (let i = 0; i < resultsLength; i += 1) {
      // console.log(results.rows[i]);
      const last = (i + 1 === resultsLength);
      callback(results.rows[i], last);
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
  postgreFetch,
};
