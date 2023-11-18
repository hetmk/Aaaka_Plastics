const { connect } = require('../scripts/db');

function handleLogin(req, res) {
  const username = req.body.username || req.query.username;
  const password = req.body.password || req.query.password;
  console.log("\n"+username, password);

  if (!username || !password) {
    return res.status(400).json({ error: 'Both username and password are required' });
  }

  connect.then((sql) => {
    const request = sql.request();
    const query = `SELECT * FROM Aaaka_plastics.dbo.users WHERE username = '${username}' AND password = '${password}'`;

    request.query(query, (err, recordSet) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (recordSet.recordset.length === 0) {
        return res.status(401).json({ message: 'false' });
      }

      // Valid username and password
      console.log("accepted:");
      console.log(recordSet.recordset[0]);
      res.send("true");
      // return res.json({ message: 'true' });
    
    });
  });
}

module.exports = {
  handleLogin,
};
