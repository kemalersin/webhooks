const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/webhooks'
  },
  whitelist: [
    // GitHub
    '127.0.0.1',
    '192.30.252.0/22',
    '185.199.108.0/22',

    // BitBucket
    '104.192.136.0/21',
    '34.198.203.127',
    '34.198.178.64',
    '34.198.32.85'
  ]
 }

module.exports = config
