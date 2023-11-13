// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Dummy data for costs
const itemCosts = {
  'grapes': 10,
  'apple': 20,
  'milk': 15,
  'eggs': 25,
};

app.get('/api/cost', (req, res) => {
  const selectedItems = req.query.items;

  if (!selectedItems) {
    return res.status(400).json({ error: 'Items parameter is required.' });
  }

  const totalCost = selectedItems.reduce((acc, item) => {
    return acc + (itemCosts[item] || 0);
  }, 0);

  res.json({ totalCost });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
