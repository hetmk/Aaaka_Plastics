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


function handleSignUp(req, res) {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Connect to the database
  connect.then(sql => {
    const request = sql.request();

    // Check if user already exists
    let checkUserQuery = `SELECT * FROM Aaaka_plastics.dbo.users WHERE username = '${username}'`;
    request.query(checkUserQuery, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error checking user existence' });
      }

      if (result.recordset.length > 0) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // Insert new user into the database
      let insertQuery = `INSERT INTO Aaaka_plastics.dbo.users (username, password) VALUES ('${username}', '${password}')`;
      request.query(insertQuery, (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: 'Error registering new user' });
        }
        console.log("accepted:");
        res.json({ message: 'true' });
      });
    });
  });
}


module.exports = {
  handleLogin,handleSignUp,
};
