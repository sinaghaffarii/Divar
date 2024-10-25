const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB Connected successfully.');
}).catch((err) => {
    console.log(err?.message ?? "Failed to connect to the database.");
})