const Router = require('express').Router
const router = new Router()

const github = require('./model/github/router')

router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to webhooks API!' })
})

router.use('/github', github)

module.exports = router
