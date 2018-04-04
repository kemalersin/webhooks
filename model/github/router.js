const controller = require('./controller')
const Router = require('express').Router
const router = new Router()

var githubMiddleware = require('github-webhook-middleware')({
  secret: process.env.GITHUB_SECRET
})

router.route('/')
  .post(githubMiddleware, (...args) => controller.run(...args))

module.exports = router
