const cors = require('cors')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 8000

app.use(cors())
app.options('*', cors())

// const parseToken = (Authorization) => {
//   // console.log('Authorization', Authorization)
//   return Authorization.replace('Bearer ', '')
// }
//
// const checkValidToken = (token) => {
//   // console.log('token', token)
//   return true
// }
//
// app.use(function (req, res, next) {
//   const {headers} = req
//
//   const token = parseToken(headers['authorization'])
//
//   console.log(token)
//   if (checkValidToken(token)) {
//     next()
//   }else {
//     res.status(401).send({url: req.originalUrl + 'UnAuthenticate'})
//   }
// })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

app.listen(port)

console.log('RESTful API server started on: ' + port)
