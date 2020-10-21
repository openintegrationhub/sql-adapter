/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');

const { mysqlFetch } = require('./../lib/utils/mysql');
// const { mssqlFetch } = require('./../lib/utils/mssql');
// const { postgreFetch } = require('./../lib/utils/postgreSQL');


describe('Utils', () => {
  before(async () => {
  });

  it('should connect to mysql', async () => {
    const databaseConfig = {
      databaseType: 'MySQL',
      user: 'root',
      password: '',
      databaseUrl: 'localhost',
      port: '3306',
      databaseName: 'wice',
    };
    const query = 'SELECT * FROM address_company WHERE 1';

    const results = [];
    function handleMySQL(data, last) {
      // console.log('Data:', data);
      results.push(data);
      if (last) console.log('All done');
    }

    const result = await mysqlFetch(databaseConfig, query, handleMySQL, true);
    // console.log('Result:', result);
    expect(result).to.equal(true);
  });

  // postgreFetch(cfg, query, handlePostgreSQL);
  //
  // mssqlFetch(cfg, query, handleMSSQL);
});
