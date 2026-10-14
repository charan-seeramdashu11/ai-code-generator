
require('dotenv').config();
const express = require('express'); 
const cors = require('cors'); 
const connectDB = require('./config/db');
const generateRoutes = require('./routes/generate');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'AI Code Generator API is running' });
});

app.use('/api/generate', generateRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
