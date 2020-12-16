const mongoose = require('mongoose')
const config = require('config');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            config.get('mongoURI'),
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            }
        )
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectToDatabase;
