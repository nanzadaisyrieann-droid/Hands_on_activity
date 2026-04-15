const dns = require('node:dns').promises;
dns.setServers(['1.1.1.1','8.8.8.8']);
const mongoose = require('mongoose');

const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
      return; 
  }
  
  try {
    // This tries to connect using the Key in your .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If successful, it prints the host name
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If it fails, it shows the error and stops the server
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
