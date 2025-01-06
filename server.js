const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.DB_URI, {  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
