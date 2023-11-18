// db.js
const sql = require("mssql");

const config = {
  user: 'sa',
  password: '123456',
  database: 'Aaaka_plastics',
  server: 'ESPERANCE',
  driver: 'tedious',
  options: {
    encrypt: true,
    trustedConnection: true,
    trustServerCertificate: true
  }
};

const connect = sql.connect(config);

module.exports = {
  connect
}
