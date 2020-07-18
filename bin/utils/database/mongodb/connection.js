require('dotenv').config()
const Mongo = require('mongodb').MongoClient;

class Connection{

    constructor() {
        this.init = this.initConnection();
    }

    async initConnection(){
        const options = { poolSize: 50,
            keepAlive: 15000,
            socketTimeoutMS: 15000,
            connectTimeoutMS: 15000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        try{
            const connection = await Mongo.connect(process.env.MONGODB_PAYMENT_URL, options);
            return connection.db('PaymentDB');
        } catch (error) {
            console.log("Error connected to DB, \n Err : ", error);
        }
    }

    async getConnection(collection){
        let db = await this.init;
        return db.collection(collection);
    }

}

module.exports = Connection;