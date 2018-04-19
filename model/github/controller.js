const Controller = require('../../lib/controller')
const Helpers = require('../../helpers')
const githubFacade = require('./facade')

class GitHubController extends Controller {}

GitHubController.prototype.run = function (req, res, next) {
  if (req.headers['x-github-event'] !== 'push')
    return res.status(200).end()

  let payload = JSON.parse(req.body.payload)

  this.facade.create(payload)
    .then(doc => {
      Helpers.update(
        payload.repository.name,
        req.query
      )

      res.status(201).end()
    })
    .catch(err => next(err))
}

module.exports = new GitHubController(githubFacade)
