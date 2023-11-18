document.addEventListener('DOMContentLoaded', function () {
    // Define your navigation data
    const navData = [
        { text: 'Accounts', id: 'accounts', subgroups: ['Add', 'Modify', 'List'] },
        { text: 'Account Group', id: 'account-group', subgroups: ['Add', 'Modify', 'List'] },
        { text: 'Item', id: 'item', subgroups: ['Add', 'Modify', 'List'] },
        { text: 'Item Group', id: 'item-group', subgroups: ['Add', 'Modify', 'List'] },
        { text: 'Users', id: 'users', subgroups: ['User1', 'User2', 'User3'] }
    ];

    // Create the main navigation
    const mainNav = document.getElementById('main-nav');
    navData.forEach(item => {
        const mainLink = createNavLink(item.text, item.id, 'main-link');
        mainNav.appendChild(mainLink);

        if (item.subgroups) {
            item.subgroups.forEach(subgroup => {
                const subLink = createNavLink(subgroup, subgroup.toLowerCase(), 'subgroup');
                mainNav.appendChild(subLink);
            });
        }
    });

    // Function to create a navigation link
    function createNavLink(text, id, className) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = text;
        link.id = id;
        link.classList.add(className);
        return link;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Sample data for the dropdown and table
    const items = [
        { id: 1, name: 'Item 1', description: 'Description 1' },
        { id: 2, name: 'Item 2', description: 'Description 2' },
        { id: 3, name: 'Item 3', description: 'Description 3' }
        // Add more items as needed
    ];

    // Populate the dropdown
    const selectItem = document.getElementById('selectItem');
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        selectItem.appendChild(option);
    });

    // Populate the table
    const itemTable = document.getElementById('itemTable');
    const tbody = itemTable.getElementsByTagName('tbody')[0];

    items.forEach(item => {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = item.id;
        cell2.textContent = item.name;
        cell3.textContent = item.description;
    });

    // Search functionality
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();

        items.forEach(item => {
            const row = tbody.rows[items.indexOf(item)];
            const rowText = `${item.id} ${item.name} ${item.description}`.toLowerCase();

            if (rowText.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});



//script for item group modify

document.addEventListener('DOMContentLoaded', function () {
    // Sample data for the dropdown and table
    const itemGroups = [
        { id: 1, name: 'Group 1', description: 'Group Description 1' },
        { id: 2, name: 'Group 2', description: 'Group Description 2' },
        { id: 3, name: 'Group 3', description: 'Group Description 3' }
        // Add more item groups as needed
    ];

    // Populate the dropdown
    const selectItemGroup = document.getElementById('selectItemGroup');
    itemGroups.forEach(group => {
        const option = document.createElement('option');
        option.value = group.id;
        option.textContent = group.name;
        selectItemGroup.appendChild(option);
    });

    // Populate the table
    const itemGroupTable = document.getElementById('itemGroupTable');
    const tbody = itemGroupTable.getElementsByTagName('tbody')[0];

    itemGroups.forEach(group => {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = group.id;
        cell2.textContent = group.name;
        cell3.textContent = group.description;
    });

    // Search functionality
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();

        itemGroups.forEach(group => {
            const row = tbody.rows[itemGroups.indexOf(group)];
            const rowText = `${group.id} ${group.name} ${group.description}`.toLowerCase();

            if (rowText.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
//script for account group search

document.addEventListener('DOMContentLoaded', function () {
    // Sample data for the dropdown and table
    const accounts = [
        { id: 1, name: 'Account 1', description: 'Account Description 1' },
        { id: 2, name: 'Account 2', description: 'Account Description 2' },
        { id: 3, name: 'Account 3', description: 'Account Description 3' }
        // Add more accounts as needed
    ];

    // Populate the dropdown
    const selectAccount = document.getElementById('selectAccount');
    accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = account.name;
        selectAccount.appendChild(option);
    });

    // Populate the table
    const accountTable = document.getElementById('accountTable');
    const tbody = accountTable.getElementsByTagName('tbody')[0];

    accounts.forEach(account => {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = account.id;
        cell2.textContent = account.name;
        cell3.textContent = account.description;
    });

    // Search functionality
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', function () {
        const searchTerm = searchBar.value.toLowerCase();

        accounts.forEach(account => {
            const row = tbody.rows[accounts.indexOf(account)];
            const rowText = `${account.id} ${account.name} ${account.description}`.toLowerCase();

            if (rowText.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});




//account group list page

document.addEventListener('DOMContentLoaded', function () {
    const selectGroup = document.getElementById('selectGroup');
    const groupTable = document.getElementById('groupTable');
    const tbody = groupTable.getElementsByTagName('tbody')[0];

    // Sample data for the table
    const groupsData = {
        group1: [
            { name: 'Name 1', primary: 'Y', underGroup: '' },
            { name: 'Name 2', primary: 'N', underGroup: 'Group 1' },
            { name: 'Name 3', primary: 'Y', underGroup: '' }
        ],
        group2: [
            { name: 'Name 4', primary: 'Y', underGroup: '' },
            { name: 'Name 5', primary: 'N', underGroup: 'Group 2' },
            { name: 'Name 6', primary: 'Y', underGroup: '' }
        ],
        group3: [
            { name: 'Name 7', primary: 'N', underGroup: 'Group 3' },
            { name: 'Name 8', primary: 'N', underGroup: 'Group 3' },
            { name: 'Name 9', primary: 'Y', underGroup: '' }
        ]
        // Add more groups and names as needed
    };

    // Initial table population based on the selected group
    populateTable(selectGroup.value);

    // Event listener for group selection change
    selectGroup.addEventListener('change', function () {
        const selectedGroup = selectGroup.value;
        // Clear existing rows
        tbody.innerHTML = '';
        // Populate the table with the data for the selected group
        populateTable(selectedGroup);
    });

    // Function to populate the table based on the selected group
    function populateTable(selectedGroup) {
        const groupData = groupsData[selectedGroup];

        groupData.forEach(item => {
            const row = tbody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);

            cell1.textContent = item.name;
            cell2.innerHTML = `<select class="primaryDropdown"><option value="Y" ${item.primary === 'Y' ? 'selected' : ''}>Y</option><option value="N" ${item.primary === 'N' ? 'selected' : ''}>N</option></select>`;
            cell3.innerHTML = item.primary === 'N' ? `<select class="underGroupDropdown"><option value="${item.underGroup}">${item.underGroup}</option></select>` : '';
        });

        // Add event listener for dropdown changes
        const primaryDropdowns = document.querySelectorAll('.primaryDropdown');
        primaryDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', function () {
                const row = dropdown.closest('tr');
                const underGroupDropdown = row.querySelector('.underGroupDropdown');
                if (dropdown.value === 'N') {
                    underGroupDropdown.innerHTML = '<option value="">Select Under Group</option>';
                    // Populate underGroupDropdown with available groups
                    const otherGroups = Object.keys(groupsData).filter(group => group !== selectedGroup);
                    otherGroups.forEach(group => {
                        const option = document.createElement('option');
                        option.value = group;
                        option.textContent = group;
                        underGroupDropdown.appendChild(option);
                    });
                } else {
                    underGroupDropdown.innerHTML = '';
                }
            });
        });
    }
});
