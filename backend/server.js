const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/connectToDatabase')
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));

app.use(cors())
app.use(express.json({extended:false}))
connectToDatabase();




//Routes
//Routes
// app.use("/api/posts", require("./routes/posts.js"));


const Users = require('./routes/users');
app.use('/api/users', Users)

const Posts = require('./routes/posts')
app.use('/api/posts', Posts)


let PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('uruchomiono na porcie '+ PORT)
 });
