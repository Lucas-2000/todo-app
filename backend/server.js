require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const todoRoute = require('./routes/todo')
const cors = require('cors')
const corsOptions = {  
      origin:'*',
      credentials:true,
      optionSuccessStatus:200,
}


const app = express();  

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/todo', todoRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db and listening on port ' + process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })