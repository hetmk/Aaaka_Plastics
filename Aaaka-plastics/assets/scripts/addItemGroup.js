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

    // Clear input fields
    const groupNameInput = document.getElementById('groupName');
    const aliasInput = document.getElementById('alias');

    groupNameInput.value = '';
    aliasInput.value = '';
}

function saveForm() {
    // Perform save logic here
    alert('Form saved!');
}
