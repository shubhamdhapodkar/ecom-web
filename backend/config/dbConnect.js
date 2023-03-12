const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("database connection successfully")
    } catch (error) {
        console.log("database error");
    }
}
module.exports = dbConnect;