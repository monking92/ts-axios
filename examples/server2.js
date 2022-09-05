const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

const crossOrigin = {
  'Access-Control-Allow-Origin': 'http://localhost:8081',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Headers': 'Content-Type'
}

const router = express.Router()

router.post('/more/credentials', (req, res) => {
  console.log('server2 req.cookies: ', req.cookies)
  res.set(crossOrigin)
  res.json(req.cookies)
})

router.options('/more/credentials', (req, res) => {
  res.set(crossOrigin)
  res.end()
})

app.use(router)

const port = 7001
module.exports = app.listen(port, () => {
  console.log(`server 2 listening on http://localhost:${port}`)
})
