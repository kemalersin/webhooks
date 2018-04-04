const Controller = require('../../lib/controller')
const githubFacade = require('./facade')

class GithubController extends Controller {}

module.exports = new GithubController(githubFacade)
