document.addEventListener('DOMContentLoaded', function() {
    fetchAccountGroups();
});

function fetchAccountGroups() {
    axios.get('http://localhost:5500/getAccountGroupDetails')
        .then(response => {
            const groups = response.data;
            const tableBody = document.querySelector('#groupTable tbody');
            tableBody.innerHTML = '';
            groups.forEach(group => {
                const row = tableBody.insertRow();
                row.insertCell(0).textContent = group.name;
                row.insertCell(1).textContent = group.isPrimary;
            });
        })
        .catch(error => console.error('Error:', error));
}

function filterTable() {
    var input = document.getElementById("searchBar");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("groupTable");
    var tr = table.getElementsByTagName("tr");

    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}
