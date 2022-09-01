const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

const router = express.Router()

router.post('/more/credentials/post', (req, res) => {
  console.log('server2 req.cookies: ', req.cookies)
  res.json(req.cookies)
})

app.use(router)

const port = 7001
module.exports = app.listen(port, () => {
  console.log(`server 2 listening on http://localhost:${port}`)
})
