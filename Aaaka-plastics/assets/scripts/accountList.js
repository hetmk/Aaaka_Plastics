// Dummy data for demonstration
const accounts = [
    { Name: "Account 1", Alias: "A1", ParentGroup: "Group A", OpBalDr: 100.00, OpBalCr: 0.00, TypeOfDealer: "Type A", GSTIN: "GST123" },
    { Name: "Account 2", Alias: "A2", ParentGroup: "Group B", OpBalDr: 0.00, OpBalCr: 50.00, TypeOfDealer: "Type B", GSTIN: "GST456" },
    // Add more accounts as needed
];

// Function to display accounts in the table
function displayAccounts(filteredAccounts = accounts) {
    const tableBody = document.querySelector('#accountTable tbody');
    tableBody.innerHTML = '';

    filteredAccounts.forEach(account => {
        const row = tableBody.insertRow();
        for (const key in account) {
            const cell = row.insertCell();
            cell.textContent = account[key];
        }
    });
}

// Function to calculate and display total values
function calculateTotal(filteredAccounts = accounts) {
    const totalDrCell = document.getElementById('totalDr');
    const totalCrCell = document.getElementById('totalCr');

    const totalDr = filteredAccounts.reduce((sum, account) => sum + account.OpBalDr, 0);
    const totalCr = filteredAccounts.reduce((sum, account) => sum + account.OpBalCr, 0);

    totalDrCell.textContent = totalDr.toFixed(2);
    totalCrCell.textContent = totalCr.toFixed(2);
}

// Function to filter accounts based on search input
function searchAccounts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredAccounts = accounts.filter(account =>
        account.Name.toLowerCase().includes(searchInput)
    );

    displayAccounts(filteredAccounts);
    calculateTotal(filteredAccounts);
}

// Initial display when the page loads
displayAccounts();
calculateTotal();
