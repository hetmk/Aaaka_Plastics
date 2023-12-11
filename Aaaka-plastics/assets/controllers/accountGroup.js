const { connect } = require('../scripts/db');

async function handleAddAccountGroup(req, res) {
    const { groupName, alias, primaryGroup, underGroup } = req.body;
    console.log(JSON.stringify(req.body, null, 2).trim());

    try {
        const sql = await connect;
        const request = sql.request();

        const maxCodeQuery = "SELECT MAX(Code) AS maxCode FROM Aaaka_plastics.dbo.Master1";
        const maxCodeResult = await request.query(maxCodeQuery);
        let newCode = 1500; // Default value in case the table is empty
        if (maxCodeResult.recordset[0].maxCode) {
            newCode = maxCodeResult.recordset[0].maxCode + 1;
        }

        request.input('groupName', groupName);
        request.input('alias', alias);
        request.input('primaryGroup', primaryGroup === 'Yes' ? 1 : 0); // Assuming primaryGroup is either 'Yes' or 'No'
        request.input('underGroup', underGroup); // Assuming underGroup is the name of the group
        request.input('newCode', newCode);

        const insertQuery = `
            INSERT INTO Aaaka_plastics.dbo.Master1  
            (Code, MasterType, Name, Alias, CM1, ParentGrp) 
            VALUES                  
            (@newCode, '1', @groupName, @alias, @primaryGroup, (SELECT Code FROM Aaaka_plastics.dbo.Master1 WHERE Name = @underGroup AND MasterType = '1'))
        `;

        await request.query(insertQuery);
        res.send('Group added successfully');
    } catch (error) {
        console.error('Error adding group:', error);
        res.status(500).send('Internal Server Error');
    }
}

// In your Node.js server code
// In your Node.js server code

async function GetAccountGroupDetails(req, res) {
    connect.then(async (sql) => {
        try {
            const request = sql.request();

            const query = `
            SELECT Code, Name, 
                   CASE WHEN CM1 = 1 THEN 'Yes' ELSE 'No' END as IsPrimary
            FROM Aaaka_plastics.dbo.Master1
            WHERE MasterType = '1';
        `;

            const result = await request.query(query);
            const groupData = result.recordset.map(record => ({ 
                code: record.Code, 
                name: record.Name,
                isPrimary: record.IsPrimary,
                // underGroup: record.UnderGroup || '-'
            }));

            res.json(groupData);

        } catch (error) {
            console.error('Error fetching account group details:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}

// Make sure to expose this function as a route
// Example: app.get('/getAccountGroupDetails', GetAccountGroupDetails);




module.exports = {
    handleAddAccountGroup,GetAccountGroupDetails,
};
