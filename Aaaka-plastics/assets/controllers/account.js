    const { connect } = require('../scripts/db');

    function handleAddAccount(req, res) {
        console.log(JSON.stringify(req.body, null, 2));

        // Extract data for the Master table
        const name = req.body.name || '';
        const alias = req.body.alias || '';
        const printName = req.body.printName || '';
        const parentGrp = req.body.group || ''; // Assuming the group contains the parent group name

        // Extract data for the MasterAddressInfo table
        const address = req.body.address || '';
        const state = req.body.state || '';
        const country = req.body.country || ''; // Corrected the order of variables
        const email = req.body.email || '';
        const mobileNo = req.body.mobileNo || '';

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
                request.input('parentGrp', parentGrp);
                request.input('date', date);
                request.input('default', 0);
                request.input('country',country);
                request.input('newCode',newCode);

                // Insert data into the Master table
                // const masterInsertQuery = `
                //         INSERT INTO Aaaka_plastics.dbo.Master1  
                //         (   MasterType,
                //             Name, Alias, PrintName, ParentGrp, 
                //             Code, MasterType, Stamp, CM1, CM2, CM3, CM4, CM5, CM6, CM7, CM8, 
                //             CM9, CM10, CM11, D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, 
                //             D12, D13, D14, D15, D16, D17, D18, D19, D20, D21, D22, D23, D24, 
                //             D25, D26, I1, I2, I3, I4, I5, I6, I7, I8, I9, I10, I11, I12, I13, 
                //             I14, I15, I16, I17, I18, I19, I20, I21, I22, I23, I24, I25, I26, 
                //             I27, I28, Level, SrNo, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, 
                //             B11, B12, B13, B14, B15, B16, B17, B18, B19, B20, B21, B22, B23, 
                //             B24, B25, B26, B27, B28, B29, B30, B31, B32, B33, B34, B35, B36, 
                //             B37, B38, B39, B40, [External], L1, L2, Notes1, Notes2, MasterNotes, 
                //             CreatedBy, CreationTime, ModifiedBy, ModificationTime, AuthorisedBy, 
                //             AuthorisationTime, ApprovalStatus, SyncStatus, MasterSeriesGrp, Source, 
                //             BlockedMaster, BlockedNotes, DeactiveMaster, C1, C2, C3, C4, C5, 
                //             C6, HSNCode, SENO, M1, M2, BlockedVchType, TPF1, TPF2, RejectionStatus, 
                //             NameSL, AliasSL, PrintNameSL, SelfImageLink, SelfImageName, OldIdentity
                //         ) 
                //         OUTPUT INSERTED.Code
                //         VALUES                  
                //         (   '2',
                //             @name, @alias, @printName, (SELECT Code FROM Aaaka_plastics.dbo.Master WHERE Name = @parentGrp),
                //             ${Array(204).fill('0').join(', ')}, 
                //             '', @date, '', @date, '', @date,
                //             ${Array(14).fill('0').join(', ')} 
                //         )
                //     `;


                
                const masterInsertQuery = `
                        INSERT INTO Aaaka_plastics.dbo.Master1  
                        (   Code,MasterType,
                            Name, Alias, PrintName, ParentGrp
                        
                        ) 
                        OUTPUT INSERTED.Code
                        VALUES                  
                        (   @newCode,'2',
                            @name, @alias, @printName, (SELECT Code FROM Aaaka_plastics.dbo.Master WHERE Name = @parentGrp)
                            
                        )
                    `;

                const masterResult = await request.query(masterInsertQuery);
                const insertedCode = masterResult.recordset[0].Code;

                // Insert data into the MasterAddressInfo table
                const addressInsertQuery = `
                    INSERT INTO Aaaka_plastics.dbo.MasterAddressInfo1
                    (
                        MasterCode,
                        Address1,
                        Address2,
                        Address3,
                        Email,
                        Mobile
                    ) 
                    VALUES 
                    (
                        '${insertedCode}',
                        '${address}',
                        '${state}',
                        (SELECT Code FROM Aaaka_plastics.dbo.Master WHERE MasterType = 55 AND Name = @country),
                        '${email}',
                        '${mobileNo}'
                    )
                `;

                await request.query(addressInsertQuery);

                console.log('Account and Address added successfully');
                res.send('true');
            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }


    async function GetAccountNames(req, res) {
        connect.then(async (sql) => {
        try {
            const request = sql.request();

            // Adjusted query to retrieve both Code and Name from the Master1 table
            const query2 = `
                SELECT Code, Name FROM Aaaka_plastics.dbo.Master1
                WHERE MasterType = '2';
            `;

            const result = await request.query(query2);

            // Mapping the recordset to an array of objects with Code and Name properties
            const accountData = result.recordset.map(record => ({ 
                code: record.Code, 
                name: record.Name 
            }));

            res.json(accountData);

        } catch (error) {
            console.error('Error fetching account names and codes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        });
    }


    async function updateAccount(req, res) {
        const { id, name, alias, printName, parentGrp } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'Account ID is required for updating.' });
        }

        connect.then(async (sql) => {
            try {
                const request = sql.request();
                request.input('id', id);
                request.input('name', name);
                request.input('alias', alias);
                request.input('printName', printName);
                request.input('parentGrp', parentGrp);

                const updateQuery = `
                    UPDATE Aaaka_plastics.dbo.Master1
                    SET Name = @name, Alias = @alias, PrintName = @printName, ParentGrp = (SELECT Code FROM Aaaka_plastics.dbo.Master WHERE Name = @parentGrp)
                    WHERE Code = @id;
                `;

                await request.query(updateQuery);
                res.send('Account updated successfully');
            } catch (error) {
                console.error('Error updating account:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }





    module.exports = {
        handleAddAccount,GetAccountNames,updateAccount,
    };