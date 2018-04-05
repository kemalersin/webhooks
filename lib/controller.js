var shell = require('shelljs')

class Controller {
  constructor (facade) {
    this.facade = facade
  }

  run (req, res, next) {
    if (req.headers['x-github-event'] !== 'push')
      return res.status(200).end()

    var payload = JSON.parse(req.body.payload)

    this.facade.create(payload)
      .then(doc => {
        shell.cd(process.env.PROJECT_DIR + '/' + payload.repository.name)
        
        shell.exec('git fetch --all')
        shell.exec('git reset --hard origin/master')
        shell.exec('git pull origin master')

        switch (req.query.type) {
          case 'node':
            shell.exec(process.env.NPM_INSTALL_CMD)
	    
            if (req.query.toolkit === 'gulp') {
              shell.exec('gulp build')
	      shell.cd('dist')
              shell.exec(process.env.NPM_INSTALL_CMD)
              shell.exec('cp -rf * /var/www/html/' + payload.repository.name)
            }

            if (+req.query.dockerized === 1) {
              shell.cd(process.env.DOCKER_DIR)
              shell.exec('docker-compose rm -s -f ' + payload.repository.name)
	      shell.exec('sh up.sh')
            }

            break
        }

        res.status(201).end()
      })
      .catch(err => next(err))
  }

  create (req, res, next) {
    this.facade.create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err))
  }

  find (req, res, next) {
    return this.facade.find(req.query)
      .then(collection => res.status(200).json(collection))
      .catch(err => next(err))
  }

  findOne (req, res, next) {
    return this.facade.findOne(req.query)
      .then(doc => res.status(200).json(doc))
      .catch(err => next(err))
  }

  findById (req, res, next) {
    return this.facade.findById(req.params.id)
      .then((doc) => {
        if (!doc) { return res.sendStatus(404) }
        return res.status(200).json(doc)
      })
      .catch(err => next(err))
  }

  update (req, res, next) {
    this.facade.update({ _id: req.params.id }, req.body)
      .then((results) => {
        if (results.n < 1) { return res.sendStatus(404) }
        if (results.nModified < 1) { return res.sendStatus(304) }
        res.sendStatus(204)
      })
      .catch(err => next(err))
  }

  remove (req, res, next) {
    this.facade.remove({ _id: req.params.id })
      .then((doc) => {
        if (!doc) { return res.sendStatus(404) }
        return res.sendStatus(204)
      })
      .catch(err => next(err))
  }
}

module.exports = Controller
