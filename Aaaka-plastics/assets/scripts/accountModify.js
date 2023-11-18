// // Dummy data for demonstration
// const accounts = [
//     { Name: "Account 1" },
//     { Name: "Account 2" },
//     { Name: "Account 3" },
//     // Add more accounts as needed
// ];

// Function to display accounts in the table
// function displayAccounts(filteredAccounts = accounts) {
//     const tableBody = document.querySelector('#accountTable tbody');
//     tableBody.innerHTML = '';

//     filteredAccounts.forEach(account => {
//         const row = tableBody.insertRow();
//         const cell = row.insertCell();
//         cell.textContent = account.Name;
//         cell.addEventListener('click', () => onAccountClick(account.Name));
//     });
// }

// Function to filter accounts based on search input
function searchAccounts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredAccounts = accounts.filter(account =>
        account.Name.toLowerCase().includes(searchInput)
    );

    displayAccounts(filteredAccounts);
}

// Dummy function for demonstration
function onAccountClick(accountName) {
    console.log(`Clicked on account: ${accountName}`);
}

// Initial display when the page loads
// displayAccounts();


function fetchAccountNames() {
    axios.get('http://localhost:5500/getAccountNames') // API endpoint on the same domain
        .then(function (response) {
            const accountData = response.data; // This will now be an array of objects with code and name properties
            displayAccounts(accountData);
        })
        .catch(function (error) {
            console.error('Error fetching account names:', error);
        });
}

// Function to display accounts in the table
function displayAccounts(accountData) {
    const tableBody = document.querySelector('#accountTable tbody');
    tableBody.innerHTML = '';

    accountData.forEach(account => {
        const row = tableBody.insertRow();

        // Display the account code
        const codeCell = row.insertCell();
        codeCell.textContent = account.code;

        // Display the account name
        const nameCell = row.insertCell();
        nameCell.textContent = account.name;

        // Create a new cell for the edit button
        const buttonCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        // Adding the account name as data attribute to the button for easy access
        editButton.dataset.accountName = account.name;
        editButton.addEventListener('click', (event) => onEditButtonClick(event.target.dataset.accountName));
        buttonCell.appendChild(editButton);
    });
}

// Function to handle edit button click
function onEditButtonClick(accountName) {
    console.log(`Editing account: ${accountName}`);
    alert('Editing account');
}

// Initial display when the page loads
fetchAccountNames();
