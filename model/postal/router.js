const controller = require('./controller')
const Router = require('express').Router
const router = new Router()

router.route('/')
  .get((...args) => controller.test(...args))

router.route('/')
  .post((...args) => controller.run(...args))

module.exports = router
