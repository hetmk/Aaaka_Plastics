function filterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("itemGroupTable");
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

function modifyItemGroup(row) {
    var groupName = row.cells[0].innerText;
    var isPrimary = row.cells[1].innerText;
    var underGroup = row.cells[2].innerText;

    // Perform modification logic for the selected item group (groupName, isPrimary, underGroup)
    alert('Modify item group: ' + groupName + ', Primary: ' + isPrimary + ', Under Group: ' + underGroup);
    // Redirect or perform additional actions as needed
}
