function handleAddItem(req, res) {
  console.log(JSON.stringify(req.body, null, 2).trim());

  // Extract item specific data
  const name = req.body.groupName || '';
  const alias = req.body.alias || '';
  const printName = req.body.printName || '';
  const itemDescription = req.body.itemDescription || '';
  // Additional fields specific to items, e.g., unit, prices, etc.
  // ...

  var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  connect.then(async (sql) => {
      try {
          const request = sql.request();
          const maxCodeQuery = "SELECT MAX(Code) AS maxCode FROM Aaaka_plastics.dbo.Master1";
          const maxCodeResult = await request.query(maxCodeQuery);
          let newCode = 1500;  // Default value in case the table is empty
          if (maxCodeResult.recordset[0].maxCode) {
              newCode = maxCodeResult.recordset[0].maxCode + 1;
          }

          request.input('name', name);
          request.input('alias', alias);
          request.input('printName', printName);
          // Additional request.input calls for new fields
          // ...
          request.input('date', date);
          request.input('newCode', newCode);

          // Insert data into the Master table with MasterType = 6
          const masterInsertQuery = `
              INSERT INTO Aaaka_plastics.dbo.Master1  
              (   Code, MasterType,
                  Name, Alias, PrintName, /* Other fields */, CreatedBy, ModifiedBy, CreationTime, ModificationTime
              ) 
              OUTPUT INSERTED.Code
              VALUES                  
              (   @newCode, '6', 
                  @name, @alias, @printName, /* Other values */, 'Superuser', 'Superuser', @date, @date
              )
          `;

          const masterResult = await request.query(masterInsertQuery);
          const insertedCode = masterResult.recordset[0].Code;

          // Additional logic to handle other item-specific data, if necessary
          // ...

          console.log('Item added successfully');
          res.send('true');
      } catch (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
      }
  });
}
