const mongoose = require("mongoose")

if (!process.env.MONGO_DB_CONNECTION_URL) {
    throw new Error("Connection url not found")
}

// ============================ DATABASE CONNECTION ============================
const connect_database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
        console.log('Database Connected')
    } catch (error) {
        console.log("Database connection error", error)
    }
}

module.exports = connect_database