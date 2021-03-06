const shell = require('shelljs')

class Helpers {
  static update(repository, query) {
    shell.cd(process.env.PROJECT_DIR + '/' + repository)
        
    shell.exec('git fetch --all')
    shell.exec('git reset --hard origin/master')
    shell.exec('git pull origin master')

    switch (query.type) {
      case 'node':
        shell.exec('npm install')
    
        if (query.toolkit === 'gulp')
          shell.exec('gulp build')

        if (+query.dockerized === 1) {
          shell.cd(process.env.DOCKER_DIR)
          shell.exec('sh remove.sh ' + repository)
          shell.exec('sh up.sh')
        }  

        break
    }
  }
}

module.exports = Helpers
