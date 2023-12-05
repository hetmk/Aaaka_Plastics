function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("accountTable"); // Change to "accountTable"
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function modifyAccount(row) {
    var accountName = row.cells[0].innerText;
    var isPrimary = row.cells[1].innerText;
    var underAccount = row.cells[2].innerText;

    // Perform modification logic for the selected account (accountName, isPrimary, underAccount)
    alert('Modify account: ' + accountName + ', Primary: ' + isPrimary + ', Under Account: ' + underAccount);
    // Redirect or perform additional actions as needed
}
