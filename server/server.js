const express = require('express');
require('dotenv').config()

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is lowkey running')
});

const PORT = process.env.PORT || 3000; // fallback if not set

app.listen(PORT, (err) => {
  if (err) {
    console.error('Failed to start server', err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
