const mongoose = require('mongoose');
const URL = `mongodb+srv://hitesh:VVIhY2asrfwdj8fz@project.zbm0u7r.mongodb.net/?retryWrites=true&w=majority`;

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
