const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/route')
const fileUpload = require('express-fileupload');
const app = express()

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(fileUpload());

// app.post('/api/updateDatabase', (req, res) => {
//   console.log("***")
//   if(req.files == null) {
//     console.log("null")
//     return res.status(400).json({msg: 'No acion'})
//   }

//   console.log("+++", req.files)
// })

// app.post('/api/')

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))



app.use(router)

const port = 4000

app.listen(process.env.PORT || port , (err) => {
  if(err)
console.log('Unable to start the server!')
else
console.log('Server started running on : ' + port)
})