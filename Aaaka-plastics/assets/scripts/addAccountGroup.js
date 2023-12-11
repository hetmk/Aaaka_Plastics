document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('addGroupForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        saveGroup();
    });
});

function saveGroup() {
    const groupName = document.getElementById('grpName').value;
    const alias = document.getElementById('Alias').value;
    const primaryGroup = document.getElementById('primaryDropdown').value;
    const underGroup = document.getElementById('drCrTwo').value; // Update with correct ID

    const formData = {
        groupName,
        alias,
        primaryGroup,
        underGroup
    };

    axios.post('http://localhost:5500/addAccountGroup', formData)
        .then(response => {
            console.log('Group added successfully:', response.data);
            resetForm();
        })
        .catch(error => {
            console.error('Error adding group:', error);
        });
}


function toggleUnderGroupDropdown() {
    const primaryDropdown = document.getElementById('primaryDropdown');
    const underGroupContainer = document.getElementById('underGroupContainer');
    const underGroupDropdown = document.getElementById('underGroupDropdown');

    if (primaryDropdown.value === 'No') {
        underGroupContainer.classList.remove('hidden');
        underGroupDropdown.disabled = false;
    } else {
        underGroupContainer.classList.add('hidden');
        underGroupDropdown.disabled = true;
    }
}

function resetForm() {
    document.getElementById('primaryDropdown').value = 'Yes';
    toggleUnderGroupDropdown();
    document.getElementById('groupName').value = '';
    document.getElementById('alias').value = '';
}
