const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authMiddleware = require('./middleware/authMiddleware'); // Import your middleware
const cors = require('cors');  


const postRoutes = require('./routes/postRoutes'); 

const app = express();
app.use(express.json());
app.use(cors()); 

// Database connection
mongoose.connect(process.env.DB_URI, {  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

  app.use('/api',authMiddleware, postRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
