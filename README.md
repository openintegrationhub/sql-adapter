![alpha](https://img.shields.io/badge/Status-Alpha-yellow.svg)

# SQL-Adapter

This connector accesses a defined SQL/MySQL/PostgreSQL database and fetches data based on the provided query .

## Authorization
Each request to the database might require authorization. To do so, pass your imap settings through the config.

The following is an example for the minimal config for the SQL-Adapter step in the flow:

`{
  databaseType: 'MySQL',
  user: 'User1',
  password: 'abcdefg',
  databaseUrl: 'localhost',
  port: '3306',
  databaseName: 'DB1',
  query: 'SELECT * FROM sometable WHERE FROM_UNIXTIME(timestamp) > CURDATE() - INTERVAL 1 DAY'
}`


## Actions and triggers
The **adapter** supports the following **actions** and **triggers**:

#### Triggers:
  - Fetch data from SQL database - polling (```getDataPolling.js```)

  All triggers are of type '*polling'* which means that the **trigger** will be scheduled to execute periodically.

  It will send the provided SQL-QUERY to the connected database account and fetches the resulting data row by row. But will only send data that is new or changed since the previous execution. Then it will emit one message per object that is added or changed since the last polling interval.

  For this case at the very beginning we just create an empty `snapshot` object. Later on we attach ``lastUpdated`` to it. At the end the entire object should be emitted as the message body.

#### Actions:
  - This connector does not have any actions yet


## License

Apache-2.0 © [Wice GmbH](https://wice.de/)
