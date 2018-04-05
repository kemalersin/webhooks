const Facade = require('../../lib/facade')
const githubSchema = require('./schema')

class GitHubFacade extends Facade {}

module.exports = new GitHubFacade('GitHub', githubSchema)
