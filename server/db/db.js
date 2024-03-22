const mongoose = require('mongoose');

const URL = process.env.DB_URL;
const Connection = async () => {
    try {
       
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected To Database Successfully");
    }
    catch (error) {
        console.log("Error While Connecting to Database", error.message);
    }
};

module.exports = Connection;
