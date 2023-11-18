const addItem = async (req, res) => {
    try {
      const itemData = req.body;
      console.log(itemData);
      // Here, you can use whatever database logic you have
      // For example, with mongoose: await Item.create(itemData);
      res.send('true');
    } catch (error) {
      console.error('Error adding item:', error);
      res.send('false');
    }
  }
  
  module.exports = {
    addItem
  };
  