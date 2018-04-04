const Facade = require('../../lib/facade')
const githubSchema = require('./schema')

class GithubFacade extends Facade {}

module.exports = new GithubFacade('Github', githubSchema)
