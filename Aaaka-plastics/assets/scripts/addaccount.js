document.addEventListener("DOMContentLoaded", function () {
  // Find the form element with id 'data-form'
  const form = document.getElementById('data-form');
  
  // Add an event listener to handle the form submission
  form.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Gather form data
    const formData = {
      name: document.getElementById('name').value,
      printName: document.getElementById('printName').value,
      prtGroup:document.getElementById('prtGroup').value,
      openingBalance: document.getElementById('openingBalance').value,
      prevYearBalance: document.getElementById('prevYearBalance').value,
      address: document.getElementById('Address').value,
      country: document.getElementById('slct').value,
      email: document.getElementById('Email').value,
      alias: document.getElementById('Alias').value,
      group: document.getElementById('groupCountry').value,
      drCrOne: document.getElementById('drCrOne').value,
      drCrTwo: document.getElementById('drCrTwo').value,
      mobileNo: document.getElementById('mobileNo').value,
      state: document.getElementById('state').value,
    };
    
    // Send form data to the server using axios
    axios.post('http://localhost:5500/addAccount', formData)
      .then(function (response) {
        console.log('Form data sent successfully:', response.data);
        // Add any additional code here to handle the successful form submission, such as displaying a success message to the user.
      })
      .catch(function (error) {
        console.log('Error sending form data:', error);
        // Add any additional code here to handle the failed form submission, such as displaying an error message to the user.
      });
  });
});
