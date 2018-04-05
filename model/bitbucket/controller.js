const Controller = require('../../lib/controller')
const Helpers = require('../../helpers')
const bitbucketFacade = require('./facade')

class BitBucketController extends Controller {}

BitBucketController.prototype.run = function (req, res, next) {
  if (req.headers['x-event-key'] !== 'repo:push')
    return res.status(200).end()

  this.facade.create(req.body)
    .then(doc => {
      Helpers.update(
        req.body.repository.name,
        req.query,
        {
          url: req.body.repository.links.html.href,
          username: process.env.BITBUCKET_USER,
          password: process.env.BITBUCKET_PASS
        }
      )

      res.status(201).end()
    })
    .catch(err => next(err))
}

module.exports = new BitBucketController(bitbucketFacade)
