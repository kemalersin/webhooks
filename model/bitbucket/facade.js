const Facade = require('../../lib/facade')
const bitbucketSchema = require('./schema')

class BitBucketFacade extends Facade {}

module.exports = new BitBucketFacade('BitBucket', bitbucketSchema)
