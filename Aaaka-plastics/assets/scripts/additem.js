async function addItem(e) {
    e.preventDefault();
    
    const formData = {
      groupName: document.getElementById('groupName').value,
      alias: document.getElementById('alias').value,
      printName: document.getElementById('group').value,
      group: document.getElementById('group').value,
      itemDescription: document.getElementById('itemDescription').value,
      unit: document.getElementById('unit').value,
      salesPrice: document.getElementById('salesPrice').value,
      openingQuantity: document.getElementById('openingQuantity').value,
      purchasePrice: document.getElementById('purchasePrice').value,
      openingValue: document.getElementById('openingValue').value,
      mrp: document.getElementById('mrp').value
    };
    
    const response = await axios.post('http://localhost:5500/addItem', formData);
    
    if (response.data == 'true') {
      console.log('Item added successfully.');
    } else {
      console.log('Error adding item:', response.data);
    }
  }
  