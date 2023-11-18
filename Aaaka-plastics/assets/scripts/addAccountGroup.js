document.addEventListener("DOMContentLoaded", function () {
    
    // Function to save the form data to the server
    function saveToServer(formData) {
        axios.post('http://localhost:5500/addAccountGroup', formData)
            .then(function (response) {
                console.log('Group form data sent successfully:', response.data);
                alert('Group added successfully!');
                resetForm();
            })
            .catch(function (error) {
                console.log('Error sending group form data:', error);
                alert('Error adding group. Please try again.');
            });
    }

    // Function to handle the save action
    window.saveForm = function() {
        const formData = {
            groupName: document.getElementById('groupName').value,
            alias: document.getElementById('alias').value,
            primaryGroup: document.getElementById('primaryDropdown').value,
            underGroup: document.getElementById('underGroupDropdown').value
        };

        saveToServer(formData);
    };
});

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
