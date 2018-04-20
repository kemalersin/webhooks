const Controller = require('../../lib/controller')
const Helpers = require('../../helpers')
const postalFacade = require('./facade')

const Postal = require('@atech/postal')
const client = new Postal.Client('postal.kemalersin.com', process.env.POSTAL_API_KEY)

class PostalController extends Controller {}

PostalController.prototype.test = function (req, res, next) {
  let message = new Postal.SendMessage(client)

  message.from('postal@kemalersin.com')
  
  message.to('mail@kemalersin.com')
  message.to('kemalersinyilmaz@gmail.com')
  message.to('kemal@olimpus.com.tr')
  
  message.cc('kemalersin@outlook.com')
  message.bcc('kemalersin@icloud.com')

  message.subject('Postal Test')

  message.htmlBody(
    '<!DOCTYPE html>' +
    '<html xmlns="http://www.w3.org/1999/xhtml">' +
    '<head>' +
    '<title>Postal Test</title>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
    '</head>' +
    '<body>' +
    '<p>Postal Test</p>' +
    '<p><a href="https://www.google.com">Google</a></p>' +
    '<p><img src="http://via.placeholder.com/350x150" width="350" height="150" /></p>' +
    '</body>' +
    '</html>' 
  )

  message.send().
    then(result => res.status(200).send())
    .catch(error => {
      console.log(error)
      res.status(500).send()
    })
}

PostalController.prototype.run = function (req, res, next) {
  console.log(req.body)
  res.status(200).end()
}

module.exports = new PostalController(postalFacade)
