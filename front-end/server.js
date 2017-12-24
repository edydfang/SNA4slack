'use strict'
const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()

app.use(serve(__dirname + '/dist'));

let port = process.env.PORT || 3000

app.listen(port)

console.log(`listening on port ${port}...`)