const mongoose = require("mongoose")

const dbConnection = async () =>{
    try {
        const dbLink = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected: ${dbLink.connection.host}`)
    } catch (error) {
       console.error("Database Connection Failed", error.message);
        process.exit(1)
    }
}

module.exports = dbConnection