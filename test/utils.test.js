/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');

const { mysqlFetch } = require('./../lib/utils/mysql');
const { mssqlFetch } = require('./../lib/utils/mssql');
const { postgreFetch } = require('./../lib/utils/postgreSQL');


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

  it('should connect to PostgreSQL', async () => {
    const databaseConfig = {
      databaseType: 'PostgreSQL',
      user: 'postgres',
      password: 'myPassword',
      databaseUrl: 'localhost',
      port: '5432',
      databaseName: 'testdb',
    };
    const query = 'SELECT * FROM testtable';

    const results = [];
    function handlePostgreSQL(data, last) {
      // console.log('Data:', data);
      results.push(data);
      if (last) console.log('All done');
    }

    const result = await postgreFetch(databaseConfig, query, handlePostgreSQL, true);
    // console.log('Result:', result);
    expect(result).to.equal(true);
  });

  it('should connect to SQL', async () => {
    const databaseConfig = {
      databaseType: 'SQL',
      user: 'sa',
      password: 'P@55w0rd',
      databaseUrl: 'localhost',
      port: '1433',
      databaseName: 'testdb',
    };
    const query = 'SELECT * FROM testtable';

    const results = [];
    function handlePostgreSQL(data, last) {
      console.log('Data:', data);
      results.push(data);
      if (last) console.log('All done');
    }

    const result = await mssqlFetch(databaseConfig, query, handlePostgreSQL, true);
    // console.log('Result:', result);
    expect(result).to.equal(true);
  });
});
