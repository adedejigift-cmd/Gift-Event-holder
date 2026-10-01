const express = require('express');
require('dotenv').config();
const userRoutes = require('./src/routes/user.routes')
const connectDB = require('./src/configs/db');

const app = express();

app.use(express.json());
app.use('/api/user', userRoutes);

connectDB();

const PORT = process.env.PORT || 2000;

app.listen( PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
    
});