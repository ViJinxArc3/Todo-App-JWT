const express = require('express');
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
// const cors = require('cors');



//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/Posts')
const todoRoute = require('./routes/todoRoute')

//route middlewares
// app.use(cors());
app.use(bodyParser.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api', todoRoute)


//middlewares
app.use(express.json())


//connect to mongoDB
const uri = 'mongodb+srv://kayleighb:KBotha1998@stage-aws-kay.chov9a4.mongodb.net/?retryWrites=true&w=majority'

async function connect() {
    try {
        await mongoose.connect(uri)
        console.log("Connected to MongoDB")
    } catch (err){
        console.error(err)
    }
}

connect()


app.listen(8000, () => {
    console.log('Server is running on port 8000')
})