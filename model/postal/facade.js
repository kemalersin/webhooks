const Facade = require('../../lib/facade')
const postalSchema = require('./schema')

class PostalFacade extends Facade {}

module.exports = new PostalFacade('Postal', postalSchema)
