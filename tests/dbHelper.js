const mongoose = require('mongoose');

exports.connect = async () => {
    if (mongoose.connection.readyState === 0) {
        try {
            // Siguraduhin na walang extra spaces sa paligid ng MONGO_URI
            const uri = process.env.MONGO_URI.trim();
            await mongoose.connect(uri);
            console.log("   ✅ Connected to Atlas for Testing");
        } catch (err) {
            console.error("   ❌ MongoDB Connection Error:", err.message);
        }
    }
};

exports.closeDatabase = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
};

exports.clearDatabase = async () => {
    if (mongoose.connection.readyState !== 0) {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            await collections[key].deleteMany();
        }
    }
};