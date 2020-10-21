
const mssql = require('mssql');

const connectionMaxAge = 100000;
const intervalMs = 300000;

let lastUsed = Date.now();
let connection = false;
let intervalHandle;

async function dbConnect(config) {
  try {
    connection = new mssql.ConnectionPool(
      {
        user: config.user,
        password: config.password,
        server: config.databaseUrl,
        port: parseInt(config.port, 10),
        database: config.databaseName,
      },
    );

    await connection.connect();
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
    console.log('Connection is idle for too long --> closing');
    try {
      clearInterval(intervalHandle);
      await connection.close();
      connection = false;
      return true;
    } catch (e) {
      console.error(e);
    }
  }

  return false;
}

intervalHandle = setInterval(connectionMayEnd, intervalMs);

async function mssqlFetch(config, query, callback, close) {
  if (connection === false) await dbConnect(config);

  try {
    const results = await connection.query(query);
    // console.log('Results:', results);

    const resultsLength = results.recordsets.length;
    // console.log(resultsLength, 'Results');
    for (let i = 0; i < resultsLength; i += 1) {
      // console.log(results.recordsets[i]);
      const last = (i + 1 === resultsLength);
      callback(results.recordsets[i], last);
    }

    lastUsed = Date.now();
    if (close) {
      clearInterval(intervalHandle);
      await connection.close();
    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}


module.exports = {
  mssqlFetch,
};
