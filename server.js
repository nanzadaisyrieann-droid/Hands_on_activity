require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const app = express();

// Connect to the database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

// Import routes
const apiRoutes = require('./src/routes/apiRoutes');
app.use(process.env.BASE_URI, apiRoutes);
const chefRoutes = require('./src/routes/chefRoutes');
app.use(process.env.BASE_URI, chefRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);
    console.log(`API ready at: http://localhost:${PORT}${BASE_URI}/dishes`);
    console.log(`API ready at: http://localhost:${PORT}${BASE_URI}/chefs`);
});
