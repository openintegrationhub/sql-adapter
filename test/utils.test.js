/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');

const { mysqlFetch, mysqlExecute } = require('./../lib/utils/mysql');
const { mssqlFetch, mssqlExecute } = require('./../lib/utils/mssql');
const { postgreFetch, postgreExecute } = require('./../lib/utils/postgreSQL');

describe('DB read', () => {
  before(async () => {
  });

  it('should only test on local', async () => {
    expect(true).to.equal(true);
  });


  it.skip('should connect to mysql', async () => {
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

  it.skip('should connect to PostgreSQL', async () => {
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

  it.skip('should connect to SQL', async () => {
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
    function handleMSSQL(data, last) {
      // console.log('Data:', data);
      results.push(data);
      if (last) console.log('All done');
    }

    const result = await mssqlFetch(databaseConfig, query, handleMSSQL, true);
    // console.log('Result:', result);
    expect(result).to.equal(true);
  });
});

describe('DB write', () => {
  before(async () => {
  });

  it('should only test on local', async () => {
    expect(true).to.equal(true);
  });

  it.skip('should write to mysql DB', async () => {
    const databaseConfig = {
      databaseType: 'MySQL',
      user: 'root',
      password: '',
      databaseUrl: 'localhost',
      port: '3306',
      databaseName: 'wice',
    };
    const query = 'INSERT INTO address_company (email) VALUES ("testmail@testmail.test")';

    const results = [];
    function handleMySQL(data, last) {
      // console.log('Data:', data);
      results.push(data);
      if (last) console.log('All done');
    }

    const result = await mysqlExecute(databaseConfig, query, handleMySQL, true);
    // console.log('Result:', result);
    expect(result).to.equal(true);
  });

  it.skip('should write to PostgreSQL DB', async () => {
    const databaseConfig = {
      databaseType: 'PostgreSQL',
      user: 'postgres',
      password: 'myPassword',
      databaseUrl: 'localhost',
      port: '5432',
      databaseName: 'testdb',
    };
    const query = 'INSERT INTO testtable ("type", "color", "location", "install_date") VALUES ("slideX", "red", "south", "2020-10-28")';

    const results = [];
    function handlePostgreSQL(data, last) {
      // console.log('Data:', data);
      results.push(data);
      if (last) console.log('All done');
    }

    const result = await postgreExecute(databaseConfig, query, handlePostgreSQL, true);
    // console.log('Result:', result);
    expect(result).to.equal(true);
  });


  it.skip('should insert into MS SQL database', async () => {
    const databaseConfig = {
      databaseType: 'SQL',
      user: 'sa',
      password: 'P@55w0rd',
      databaseUrl: 'localhost',
      port: '1433',
      databaseName: 'testdb',
    };
    const query = 'INSERT INTO testtable (userId, title) VALUES (77, "Sometitle")';

    const results = [];
    function handleMSSQL(data, last) {
      // console.log('Data:', data);
      results.push(data);
      if (last) console.log('All done');
    }

    const result = await mssqlExecute(databaseConfig, query, handleMSSQL, true);
    // console.log('Result:', result);
    expect(result).to.equal(true);
  });
});
