'use strict'
const express = require('express')
const app = express()

app.get('/', (req, res, err) => {
  res.send('Hello World')
})

app.listen(3000, function () {
  console.log('app running on port 3000!')
})
