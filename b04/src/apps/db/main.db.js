
const mongoose = require('mongoose');

class MainDB {
    constructor () {
        this.connect()
    }

    async connect () {
        try {
            await mongoose.connect(`mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@cluster0.xlgdzv4.mongodb.net/shopping`);
            console.log("mongodb connect success")
        } catch (error) {
            console.log("mongodb connect error ", error)
        }
    }

}



module.exports = new MainDB()